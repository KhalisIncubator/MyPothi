/* eslint-disable default-case */
/* eslint-disable import/extensions */
import {
  action,
  actionOn,
  computed,
  createStore,
  persist,
  thunk,
  thunkOn,
} from 'easy-peasy'

import {
  loadBani,
  loadShabad,
} from '../database/BanidbApi'
import {
  addToPothi,
  createModification,
  createNewPothi,
  deleteGukta,
  deleteModification,
  editModification,
  existsModification,
  fetchAllPothis,
  getCurrentItems,
  removeFromPothi,
  undoCreation,
  updatePothi,
} from '../database/LocalDatabase'
import {
  AddedModel,
  CurrentModel,
  ModalModel,
  PothiModel,
  StoreModel,
  ThemeModel,
  ViewerModel,
} from './Interfaces'
import AsyncStore from './PersistStore'


const modalModel: ModalModel = {
  showModal: false,
  text: '',

  toggleModal: action( ( state, [ bool, type ] ) => {
    state.showModal = bool
    state.text = `Downloading ${type}...`
  } ),
  onEntryAdded: thunkOn(
    ( actions, storeActions ) => [
      storeActions.currentModel.addEntry.startType,
      storeActions.currentModel.addEntry.successType,
    ],
    async ( actions, target ) => {
      const [ , , type ] = target.payload
      if ( target.type === '@thunk.currentModel.addEntry(start)' ) {
        actions.toggleModal( [ true, type ] )
      } else if ( target.type === '@thunk.currentModel.addEntry(success)' ) {
        actions.toggleModal( [ false, '' ] )
      }
    },
  ),
}
const themeModel: ThemeModel = {
  theme: {
    choseSystem: false,
    isDarkMode: false,
    trueDarkMode: false,
  },
  updateTheme: action( ( state, payload ) => {
    if ( payload === 'isDarkMode' && !state.theme.isDarkMode ) state.theme.trueDarkMode = false
    if ( payload === 'trueDarkMode' && !state.theme.trueDarkMode ) state.theme.isDarkMode = false
    if ( payload === 'choseSystem' && state.theme.choseSystem ) {
      state.theme.isDarkMode = false
      state.theme.trueDarkMode = false
    }


    state.theme[ payload ] = !state.theme[ payload ]
  } ),
}
const currentModel: CurrentModel = {
  currentName: fetchAllPothis()[ 0 ],
  currentItems: computed( ( state ) => {
    const [ name, id ] = state.currentName
    return getCurrentItems( name, id )
  } ),
  updateCurrentName: action( ( state, payload ) => {
    const [ name, id ] = payload
    state.currentName = [ name, id ]
  } ),
  addedEntry: action( ( state, [ id, mainLine, lines, type, info ] ) => {
    addToPothi(
      state.currentName[ 0 ],
      state.currentName[ 1 ],
      id,
      mainLine,
      lines,
      type,
      info,
    )
  } ),
  undoCreation: action( () => {
    undoCreation()
  } ),
  removeEntry: action( ( state, [ entryID, shabadID ] ) => {
    removeFromPothi( state.currentName[ 0 ], entryID, state.currentName[ 1 ] )
  } ),
  createMod: action( ( state, {
    lineid, element, type, value, parentID,
  } ) => {
    if ( lineid && element && parentID ) {
      if ( existsModification( lineid, element, parentID ) ) {
        editModification( lineid, element, parentID, type, value )
      } else {
        createModification( state.currentName[ 0 ], parentID )( lineid, element, type, value )
      }
    }
  } ),
  deleteMod: action( ( state, { lineid, element, parentID } ) => {
    if ( lineid && element && parentID ) {
      if ( existsModification( lineid, element, parentID ) ) {
        deleteModification( lineid, element, parentID )
      }
    }
  } ),

  addEntry: thunk( async ( actions, [ id, mainLine, type ], { injections, getStoreState } ) => {
    // eslint-disable-next-line no-shadow
    const { loadShabad, loadBani } = injections
    const length = getStoreState().viewerModel.searchPreferences.baniLength
    const [ info, lines ] = type === 'Bani' ? await loadBani( id, length ) : await loadShabad( id )
    actions.addedEntry( [ id, mainLine, lines, type, info ] )
  } ),

  onNameChange: actionOn(
    ( actions, storeActions ) => storeActions.pothiModel.renamePothi,
    ( state ) => {
      const [ newName ] = fetchAllPothis().filter( ( name ) => name[ 1 ] === state.currentName[ 1 ] )
      state.currentName = newName
    },
  ),
  onAction: actionOn(
    ( actions ) => [
      actions.addEntry,
      actions.undoCreation,
      actions.createMod,
      actions.deleteMod,
      actions.removeEntry,
    ],
    ( state ) => {
      state.currentItems = getCurrentItems( state.currentName[ 0 ],
        state.currentName[ 1 ] )
    },
  ),
}

const pothiModel: PothiModel = {
  pothiNames: fetchAllPothis(),

  renamePothi: action( ( state, [ name, id, newName ] ) => {
    updatePothi( name, id )( 'name', newName )
    state.pothiNames = fetchAllPothis()
  } ),
  updatePothis: action( ( state ) => {
    state.pothiNames = fetchAllPothis()
  } ),
  createPothi: action( ( state, payload ) => {
    createNewPothi( payload )
    state.pothiNames = fetchAllPothis()
  } ),
  deletePothi: action( ( state, [ name, id ] ) => {
    deleteGukta( name, id )
    state.pothiNames = fetchAllPothis()
  } ),
}

const viewerModel: ViewerModel = {
  fontSizes: {
    gurmukhi: 30,
    eng: 16,
    teeka: 16,
    translit: 16,
  },
  displayElements: {
    displayEng: true,
    displayTeeka: true,
    displayTranslit: true,
    displayVishraams: true,
  },
  searchPreferences: {
    baniLength: 'long',
  },
  sources: {
    vishraamSource: 'sttm',
    teekaSource: 'SS',
    translationLang: 'English',
    translitLang: 'English',
  },
  updateFontSize: action( ( state, payload ) => {
    const [ element, val ] = payload
    state.fontSizes[ element ] = val
  } ),
  updateDisplayElement: action( ( state, payload ) => {
    state.displayElements[ payload ] = !state.displayElements[ payload ]
  } ),
  updateSource: action( ( state, [ type, value ] ) => {
    state.sources[ type ] = value
  } ),
  updateSearch: action( ( state, [ type, value ] ) => {
    state.searchPreferences[ type ] = value
  } ),
}

const addedModel: AddedModel = {
  addedItems: [],
  updateAddedItems: action( ( state, payload ) => {
    state.addedItems.push( payload )
  } ),
  onUndo: actionOn(
    ( actions, storeActions ) => storeActions.currentModel.undoCreation,
    ( store ) => {
      store.addedItems.pop()
    },
  ),
  onChangeGutka: actionOn(
    ( actions, storeActions ) => storeActions.currentModel.updateCurrentName,
    ( store ) => {
      store.addedItems = []
    },
  ),
  onDelete: actionOn(
    ( actions, storeActions ) => storeActions.currentModel.removeEntry,
    ( state, target ) => {
      const latestIndex = state.addedItems.lastIndexOf( { ...target.payload } )
      state.addedItems.slice( latestIndex, 1 )
    },
  ),
}

const storeModel: StoreModel = {
  modalModel,
  addedModel,
  themeModel: persist( themeModel, {
    storage: AsyncStore,
    mergeStrategy: 'overwrite',
  } ),
  currentModel: persist( currentModel, {
    storage: AsyncStore,
    mergeStrategy: 'merge',
  } ),
  pothiModel: persist( pothiModel, {
    storage: AsyncStore,
    mergeStrategy: 'overwrite',
  } ),
  viewerModel: persist( viewerModel, {
    storage: AsyncStore,
    mergeStrategy: 'mergeDeep',
  } ),
}

export { storeModel }
export default createStore(
  storeModel,
  {
    injections: {
      loadShabad,
      loadBani,
    },
  },
)

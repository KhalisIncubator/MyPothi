/* eslint-disable import/extensions */
import {
  createStore, action, persist, thunk, computed,
} from 'easy-peasy';
import {
  StoreModel,
  CurrentModel,
  PothiModel,
  ViewerModel,
  ThemeModel,
} from './Interfaces';

import {
  createNewPothi,
  fetchAllPothis,
  getCurrentItems,
  deleteGukta,
  addToPothi,
  removeFromPothi,
  editModification,
  createModification,
  existsModification,
  deleteModification,
} from '../database/LocalDatabase';
import AsyncStore from './PersistStore';
import { loadBani, loadShabad } from '../database/BanidbApi';

const themeModel: ThemeModel = {
  isDarkMode: false,
  updateDarkMode: action( ( state ) => { state.isDarkMode = !state.isDarkMode; } ),
};
const currentModel: CurrentModel = {
  currentName: fetchAllPothis()[0],
  currentItems: computed( ( state ) => {
    const [ name, id ] = state.currentName;
    return getCurrentItems( name, id );
  } ),
  updateCurrentName: action( ( state, payload ) => {
    const [ name, id ] = payload;
    state.currentName = [ name, id ];
  } ),
  addedEntry: action( ( state, payload ) => {
    const [ id, mainLine, lines, type ] = payload;
    addToPothi(
      state.currentName[0],
      state.currentName[1],
      id,
      mainLine,
      lines,
      type,
    );
    state.currentItems = getCurrentItems(
      state.currentName[0],
      state.currentName[1],
    );
  } ),
  removeEntry: action( ( state, payload ) => {
    removeFromPothi( state.currentName[0], payload );

    state.currentItems = getCurrentItems(
      state.currentName[0],
      state.currentName[1],
    );
  } ),
  createMod: action( ( state, {
    lineid, element, type, value, parentID,
  } ) => {
    if ( lineid && element && parentID ) {
      if ( existsModification( lineid, element, parentID ) ) {
        editModification( lineid, element, parentID, type, value );
      } else {
        createModification( state.currentName[0], parentID )( lineid, element, type, value );
      }
      state.currentItems = getCurrentItems(
        state.currentName[0],
        state.currentName[1],
      );
    }
  } ),
  deleteMod: action( ( state, { lineid, element, parentID } ) => {
    if ( lineid && element && parentID ) {
      if ( existsModification( lineid, element, parentID ) ) {
        deleteModification( lineid, element, parentID );
        state.currentItems = getCurrentItems(
          state.currentName[0],
          state.currentName[1],
        );
      }
    }
  } ),

  addEntry: thunk( async ( actions, [ id, mainLine, type ], { injections, getStoreState } ) => {
    // eslint-disable-next-line no-shadow
    const { loadShabad, loadBani } = injections;
    const length = getStoreState().viewerModel.baniLength;
    const lines = type === 'Bani' ? await loadBani( id, length ) : await loadShabad( id );

    actions.addedEntry( [ id, mainLine, lines, type ] );
  } ),
};

const pothiModel: PothiModel = {
  pothiNames: fetchAllPothis(),
  isDataReady: false,

  updatePothis: action( ( state ) => {
    state.pothiNames = fetchAllPothis();
  } ),
  updateIsReady: action( ( state, payload ) => {
    state.isDataReady = payload;
  } ),
  createPothi: action( ( state, payload ) => {
    createNewPothi( payload );
    state.pothiNames = fetchAllPothis();
  } ),
  deletePothi: action( ( state, [ name, id ] ) => {
    deleteGukta( name, id );
    state.pothiNames = fetchAllPothis();
  } ),
};

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
  },
  baniLength: 'long',
  sources: {
    vishraamSource: 'sttm',
    // teeakSource: 'SS',
    // translationLang: 'English',
    // translitLang: 'English',
  },
  updateFontSize: action( ( state, payload ) => {
    const [ element, val ] = payload;
    state.fontSizes[element] = val;
  } ),
  updateDisplayElement: action( ( state, payload ) => {
    state.displayElements[payload] = !state.displayElements[payload];
  } ),
  updateSource: action( ( state, [ type, value ] ) => {
    state.sources[type] = value;
  } ),
  updateLength: action( ( state, payload ) => {
    state.baniLength = payload;
  } ),
};

const storeModel: StoreModel = {
  themeModel: persist( themeModel, { storage: AsyncStore, mergeStrategy: 'overwrite' } ),
  currentModel: persist( currentModel, { storage: AsyncStore, mergeStrategy: 'merge' } ),
  pothiModel: persist( pothiModel, { storage: AsyncStore, mergeStrategy: 'overwrite' } ),
  viewerModel: persist( viewerModel, { storage: AsyncStore, mergeStrategy: 'mergeDeep' } ),
};

export { storeModel };
export default createStore(
  storeModel,
  { injections: { loadShabad, loadBani } },
);

/* eslint-disable import/extensions */
import {
  createStore, action, createContextStore, persist,
} from 'easy-peasy';
import {
  SearchModel,
  StoreModel,
  CurrentModel,
  GutkaModel,
  ViewerModel,
  EditModel,
  ThemeModel,
} from './interfaces';

import {
  createNewGukta,
  fetchAllGutkas,
  getCurrentItems,
  deleteGukta,
  addToGutka,
  removeFromGutka,
  editModification,
  createModification,
  existsModification,
} from '../../database/local_database';
import AsyncStore from './storage';

const searchModel: SearchModel = {
  searchType: 0,
  queryType: 'Shabad',

  updateSeachType: action( ( state, payload ) => {
    state.searchType = payload;
  } ),
  updateQueryType: action( ( state, payload ) => {
    state.queryType = payload;
  } ),
};

const SearchCtx = createContextStore( searchModel );

export { SearchCtx };

const editModel: EditModel = {
  isEditMode: false,
  selectedInfo: [ null, null, null ],

  updateEditMode: action( ( state ) => {
    if ( state.isEditMode ) {
      state.selectedInfo = [ null, null, null ];
    }
    state.isEditMode = !state.isEditMode;
  } ),
  updatedSelectedInfo: action( ( state, payload ) => {
    const [ lineID, element, entryID ] = payload;
    state.selectedInfo = [ lineID, element, entryID ];
  } ),
};

const EditCtx = createContextStore( editModel );

export { EditCtx };

const themeModel: ThemeModel = {
  isDarkMode: false,
  updateDarkMode: action( ( state ) => { state.isDarkMode = !state.isDarkMode; } ),
};
const currentModel: CurrentModel = {
  currentName: [],
  currentItems: [],
  updateItems: action( ( state, payload ) => {
    if ( payload ) {
      state.currentName = payload;
      state.currentItems = getCurrentItems( payload[0], payload[1] );
    } else {
      state.currentItems = getCurrentItems(
        state.currentName[0],
        state.currentName[1],
      );
    }
  } ),
  updateCurrentName: action( ( state, payload ) => {
    const [ name, id ] = payload;
    state.currentName = [ name, id ];
    state.currentItems = getCurrentItems( name, id );
  } ),
  addEntry: action( ( state, payload ) => {
    const [ id, mainLine, type ] = payload;
    addToGutka(
      state.currentName[0],
      state.currentName[1],
      id,
      mainLine,
      type,
    );
    state.currentItems = getCurrentItems(
      state.currentName[0],
      state.currentName[1],
    );
  } ),
  removeEntry: action( ( state, payload ) => {
    removeFromGutka( state.currentName[0], payload );

    state.currentItems = getCurrentItems(
      state.currentName[0],
      state.currentName[1],
    );
  } ),
  createMod: action( ( state, {
    lineid, element, type, value, parentID,
  } ) => {
    if ( existsModification( lineid, element, parentID ) ) {
      editModification( lineid, element, parentID, type, value );
    } else {
      createModification( state.currentName[0], parentID )( lineid, element, type, value );
    }
    state.currentItems = getCurrentItems(
      state.currentName[0],
      state.currentName[1],
    );
  } ),
  deleteMod: action( ( state, payload ) => {
    // console.log( payload );
  } ),
  initialUpdate: action( ( state, [ name, items ] ) => {
    state.currentName = name;
    state.currentItems = items;
  } ),
};

const gutkaModel: GutkaModel = {
  gutkaNames: [],
  isDataReady: false,

  updateGutkas: action( ( state ) => {
    state.gutkaNames = fetchAllGutkas();
  } ),
  updateIsReady: action( ( state, payload ) => {
    state.isDataReady = payload;
  } ),
  createGutka: action( ( state, payload ) => {
    createNewGukta( payload );
    state.gutkaNames = fetchAllGutkas();
  } ),
  deleteAGutka: action( ( state, [ name, id ] ) => {
    deleteGukta( name, id );
    state.gutkaNames = fetchAllGutkas();
  } ),
  initialUpdate: action( ( state, [ names, bool ] ) => {
    state.gutkaNames = names;
    state.isDataReady = bool;
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
  updateFontSize: action( ( state, payload ) => {
    const [ element, val ] = payload;
    state.fontSizes[element] = val;
  } ),
  updateDisplayElement: action( ( state, payload ) => {
    state.displayElements[payload] = !state.displayElements[payload];
  } ),
};

const storeModel: StoreModel = {
  themeModel, currentModel, gutkaModel, viewerModel,
};

export { storeModel };
export default createStore( persist( storeModel, { storage: AsyncStore, mergeStrategy: 'mergeDeep' } ) );

/* eslint-disable import/extensions */
import { createStore, action, createContextStore } from 'easy-peasy';

import {
  SearchModel,
  StoreModel,
  CurrentModel,
  GutkaModel,
  ViewerModel,
  EditModel,
} from './interfaces';

import {
  createNewGukta,
  fetchAllGutkas,
  getCurrentItems,
  deleteGukta,
  addToGutka,
  removeFromGutka,
} from '../../database/local_database';

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
  selectedInfo: [ null, null ],

  updateEditMode: action( ( state ) => {
    if ( state.isEditMode ) {
      state.selectedInfo = [ null, null ];
    }
    state.isEditMode = !state.isEditMode;
  } ),
  updatedSelectedInfo: action( ( state, payload ) => {
    const [ lineID, element ] = payload;
    state.selectedInfo = [ lineID, element ];
  } ),
};

const EditCtx = createContextStore( editModel );

export { EditCtx };

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
  initialUpdate: action( ( state, payload ) => {
    const [ name, items ] = payload;
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
  deleteAGutka: action( ( state, payload ) => {
    deleteGukta( [ ...payload ] );
    state.gutkaNames = fetchAllGutkas();
  } ),
  initialUpdate: action( ( state, payload ) => {
    const [ names, bool ] = payload;
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
  updateFontSize: action( ( state, payload ) => {} ),
  updateDisplayElement: action( ( state, payload ) => {} ),
};

const storeModel: StoreModel = { currentModel, gutkaModel, viewerModel };

export { storeModel };
export default createStore( storeModel );

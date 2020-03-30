import { action, createContextStore, persist } from 'easy-peasy';
import { SearchModel, EditModel, AddedModel } from '../Interfaces';
import AsyncStore from '../PersistStore';

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

const SearchCtx = createContextStore( persist( searchModel, { storage: AsyncStore, mergeStrategy: 'overwrite' } ) );

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

const addedModel: AddedModel = {
  addedItems: [],
  updateAddedItems: action( ( state, payload ) => {
    state.addedItems.push( payload );
  } ),
};

const AddedCtx = createContextStore( addedModel );
export { AddedCtx };

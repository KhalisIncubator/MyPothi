import {
  action,
  createContextStore,
  persist,
} from 'easy-peasy'

const searchModel = {
  searchType: 0,
  queryType: 'Shabad',

  updateSeachType: action( ( state, payload ) => {
    state.searchType = payload
  } ),
  updateQueryType: action( ( state, payload ) => {
    state.queryType = payload
  } ),
}

const SearchCtx = createContextStore( searchModel )

export { SearchCtx }

const editModel = {
  isEditMode: false,
  selectedInfo: [ null, null, null ],

  updateEditMode: action( ( state ) => {
    if ( state.isEditMode ) {
      state.selectedInfo = [ null, null, null ]
    }
    state.isEditMode = !state.isEditMode
  } ),
  updatedSelectedInfo: action( ( state, payload ) => {
    const [ lineID, element, entryID ] = payload
    state.selectedInfo = [ lineID, element, entryID ]
  } ),
}

const EditCtx = createContextStore( editModel )

export { EditCtx }


const fullScreenModel = {
  isFullScreen: false,
  toggleMode: action( ( state ) => {
    state.isFullScreen = !state.isFullScreen
  } ),
}

const FullScreenCtx = createContextStore( fullScreenModel )
export { FullScreenCtx }

import React from 'react';
import { IGutkaCtx, IGlobalCtx, IViewerCtx, ISearchCtx } from '../config/interfaces';

export const GutkaContext = React.createContext<IGutkaCtx>({
  gutkas: [],
  createGutka: () => { },
  currentItems: [],
  removeFromGutka: () => { },
  addToGutka: () => { },
  isDataReady: false,
})
export const GlobalContext = React.createContext<IGlobalCtx>({
  currentName: 'Loading...',
  updateCurrentGutka: () => { },
  isEditMode: false,
  toggleEditMode: () => { },
});
export const SearchContext = React.createContext<ISearchCtx>({
  searchType: 0,
  updateSearchType: () => { },
  queryType: 'Shabad',
  updateQueryType: () => { },
});
export const ViewerContext = React.createContext<IViewerCtx>({
  gurmukhiSize: 12,
  translSize: 12,
  translitSize: 12,
  updateFontSize: () => { },
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,
  updateDisplay: () => { },
})
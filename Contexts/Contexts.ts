import React from 'react';
import { IGutkaCtx, IViewerCtx, ISearchCtx, IEditCtx } from '../config/dev_env/interfaces';

export const GutkaContext = React.createContext<IGutkaCtx>({
  gutkaNames: [],
  currentName: ["", ""],
  currentItems: [],
  isDataReady: false,

  createGutka: () => { },
  updateGutkas: () => { },
  updateItems: () => { },
  updateIsReady: () => { },
  updateCurrentName: () => { },
  deleteAGutka: () => { },
  addEntry: () => { },
  removeEntry: () => { }
})
export const SearchContext = React.createContext<ISearchCtx>({
  searchType: 0,
  queryType: 'Shabad',
  updateSearchType: () => { },
  updateQueryType: () => { },
});
export const EditContext = React.createContext<IEditCtx>({
  isEditMode: false,
  selectedLineID: 40935,
  selectedElement: "Pangtee",

  updateEditMode: () => { },
  updateLineID: () => { },
  updateSelectedE: () => { },
  removeSelection: () => { }
});
export const ViewerContext = React.createContext<IViewerCtx>({
  gurmukhiSize: 30,
  translSize: 12,
  translitSize: 12,
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,

  updateFontSize: () => { },
  updateDisplay: () => { },
})
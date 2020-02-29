import { storedGutka, entryObj, gutkaEntry, SearchType, QueryType } from "./types";
export interface IGutkaCtx {
  gutkaNames: string[],
  currentName: '',
  currentItems: entryObj[],
  isDataReady: boolean,

  createGutka: (newName: string) => void,
  updateItems: (altName?: string) => void,
  updateGutkas: () => void,
  updateIsReady: (newVal: boolean) => void,
  updateCurrentName: (newName: string) => void,
  deleteAGutka: (name: string) => void,
  addEntry: (id: number, mainLine: string, parentGutka: string, type: gutkaEntry) => void,
  removeEntry: (id: number) => void
}
export interface ISearchCtx {
  searchType: 0,
  queryType: QueryType,

  updateSearchType: (newType: SearchType) => void,
  updateQueryType: () => void,
}
export interface IViewerCtx {
  gurmukhiSize: number,
  translSize: number,
  translitSize: number,
  displayEngTransl: boolean,
  displayPunTansl: boolean,
  displayTranslit: boolean,

  updateFontSize: (newSize: number, element: number) => void,
  updateDisplay: (newVal: number, element: string) => void,
}
export interface setttingsFetched {
  $displayEngTransl: boolean,
  $displayPunTansl: boolean,
  $displayTranslit: boolean,
  $gurmukhiSize: number,
  $translSize: number,
  $translitSize: number,
}


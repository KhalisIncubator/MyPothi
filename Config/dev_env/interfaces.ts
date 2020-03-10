import { entryObj, gutkaEntry, SearchType, QueryType, Element } from "./types";
export interface IGutkaCtx {
  gutkaNames: string[],
  currentName: string[],
  currentItems: entryObj[],
  isDataReady: boolean,

  createGutka: (newName: string) => void,
  updateItems: (gutkaID?: string, altName?: string) => void,
  updateGutkas: () => void,
  updateIsReady: (newVal: boolean) => void,
  updateCurrentName: (newName: string, gutkaID: string) => void,
  deleteAGutka: (name: string, gutkaID: string) => void,
  addEntry: (id: number, mainLine: string, parentGutka: string, type: gutkaEntry) => void,
  removeEntry: (id: number) => void
}
export interface ISearchCtx {
  searchType: 0,
  queryType: QueryType,

  updateSearchType: (newType: SearchType) => void,
  updateQueryType: (newType: QueryType) => void,
}

export interface IEditCtx {
  isEditMode: boolean,
  selectedLineID: number | null,
  selectedElement: Element,

  updateEditMode: () => void,
  updateLineID: (id: number) => void,
  updateSelectedE: (newE: Element) => void,
  removeSelection: () => void,
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

export interface Line {
  id: number,
  sID: number,
  Gurbani: {
    ascii: string,
    unicode: string
  };
  Translations: {
    English: string | null,
    Punjabi: {
      SS: string | null,
      FT: string | null
    },
    Spanish: string | null,
  };
  Transliteration: {
    English: string,
    Hindi: string,
  };
  Vishraams: {
    sttm: string[],
    ig: string[],
    sttm2: string[],
  };
}
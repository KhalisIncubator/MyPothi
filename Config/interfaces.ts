import { storedGutka, entryObj, gutkaEntry } from "./types";
export interface IGutkaCtx {
  gutkas: storedGutka[],
  createGutka: (newGutka: string) => void,
  currentItems: entryObj[],
  removeFromGutka: (id: any) => void,
  addToGutka: (entryId: any, entryType: gutkaEntry) => void,
  isDataReady: boolean,
}
export interface IGlobalCtx {
  currentName: string,
  updateCurrentGutka: (name: string) => void,
  isEditMode: boolean,
  toggleEditMode: () => void,
  currShabadID: number,
  updateCurrShabadID: (id: number) => void,
}

export interface IViewerCtx {
  gurmukhiSize: number,
  translSize: number,
  translitSize: number,
  updateFontSize: (element: string, size: number) => void,
  displayEngTransl: boolean,
  displayPunTansl: boolean,
  displayTranslit: boolean,
  updateDisplay: (element: string, value: boolean) => void,
}

export interface gutkaFetched {
  $isDataReady: boolean,
  $stored: storedGutka[],
  $currentName: string,
  $currentItems: entryObj[]
}

export interface setttingsFetched {
  $displayEngTransl: boolean,
  $displayPunTansl: boolean,
  $displayTranslit: boolean,
  $gurmukhiSize: number,
  $translSize: number,
  $translitSize: number,
}


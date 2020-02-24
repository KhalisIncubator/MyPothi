import { storedGutka, entryObj, GutkaApi, GlobalApi, SearchApi, ViewerApi } from "./types";
export interface IGutkaCtx {
  gutkaApi: GutkaApi
}
export interface IGlobalCtx {
  globalApi: GlobalApi
}
export interface ISearchCtx {
  searchApi: SearchApi
}
export interface IViewerCtx {
  viewerApi: ViewerApi
}
export interface setttingsFetched {
  $displayEngTransl: boolean,
  $displayPunTansl: boolean,
  $displayTranslit: boolean,
  $gurmukhiSize: number,
  $translSize: number,
  $translitSize: number,
}


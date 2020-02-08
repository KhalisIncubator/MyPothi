import { storedGutka, itemsObj } from "./types";

export interface gutkaFetched {
  $isDataReady: boolean,
  $stored: storedGutka[],
  $currentName: string,
  $currentItems: itemsObj[]
}

export interface setttingsFetched {
  $displayEngTransl: boolean,
  $displayPunTrasl: boolean,
  $displayTranslit: boolean,
  $gurmukhiSize: number,
  $translSize: number,
  $translitSize: number,
}

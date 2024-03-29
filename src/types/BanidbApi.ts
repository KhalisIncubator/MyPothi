// generated by PasteJSON as code
// Generated by https://quicktype.io

export interface ShabadResponse {
  shabadInfo: ShabadInfo;
  count: number;
  navigation: Navigation;
  verses: Verse[];
}

export interface Navigation {
  previous: null;
  next: number;
}

export interface ShabadInfo {
  shabadId: number;
  shabadName: number;
  pageNo: number;
  source: Source;
  raag: Raag;
  writer: Writer;
}

export interface Raag {
  raagId: number;
  gurmukhi: string;
  unicode: string;
  english: string;
  raagWithPage: string;
}

export interface Source {
  sourceId: string;
  gurmukhi: string;
  unicode: string;
  english: string;
  pageNo: number;
}

export interface Writer {
  writerId: number;
  gurmukhi: string;
  unicode: null;
  english: string;
}

export interface Verse {
  verseId: number;
  shabadId: number;
  verse: Larivaar;
  larivaar: Larivaar;
  translation: Translation;
  transliteration: Transliteration;
  pageNo: number;
  lineNo: number;
  updated: string;
  visraam: Visraam;
}

export interface Larivaar {
  gurmukhi: string;
  unicode: string;
}

export interface Translation {
  en: {[key: string]: string};
  pu: Pu;
  es: Es;
}

export interface Es {
  sn: string;
}

export interface Pu {
  ss: Larivaar;
  ft: Larivaar;
  bdb: Larivaar;
  ms: Larivaar;
}

export interface Transliteration {
  english: string;
  hindi: string;
  en: string;
  hi: string;
  ipa: string;
  ur: string;
}

export interface Visraam {
  sttm2: Igurbani[];
  sttm: Sttm[];
  igurbani: Igurbani[];
}

export interface Igurbani {
  p: number;
  t: T;
}

export enum T {
  V = "v",
  Y = "y",
}

export interface Sttm {
  p: number | string;
  t: T;
}

export interface BaniResponse {
  baniInfo: BaniInfo;
  verses: VerseElement[];
}

export interface BaniInfo {
  baniID: number;
  gurmukhi: string;
  unicode: string;
  english: string;
  hindi: string;
  en: string;
  hi: string;
  ipa: string;
  ur: string;
  source: Source;
  raag: Raag;
  writer: Writer;
}


export interface VerseElement {
  header: number;
  mangalPosition: null;
  existsSGPC: number;
  existsMedium: number;
  existsTaksal: number;
  existsBuddhaDal: number;
  paragraph: number;
  verse: BaniVerse;
}

export interface BaniVerse {
  verseId: number;
  verse: Larivaar;
  larivaar: Larivaar;
  translation: Translation;
  transliteration: Transliteration;
  pageNo: number | null;
  lineNo: number | null;
  updated: string;
  visraam: Visraam;
}



export interface Transliteration {
  english: string;
  hindi: string;
  en: string;
  hi: string;
  ipa: string;
  ur: string;
}

export interface QueryResponse {
  resultsInfo: ResultsInfo;
  verses: QueryVerse[];
}

export interface ResultsInfo {
  totalResults: number;
  pageResults: number;
  pages: Pages;
}

export interface Pages {
  page: number;
  resultsPerPage: number;
  totalPages: number;
  nextPage: string;
}

export interface QueryVerse {
  verseId: number;
  shabadId: number;
  verse: Larivaar;
  larivaar: Larivaar;
  translation: Translation;
  transliteration: Transliteration;
  pageNo: number;
  lineNo: number;
  updated: string;
  visraam: Visraam;
  writer: Writer;
  source: Source;
  raag: Raag;
}

// Remapped: Things that are changed in shape to work better in app

export type RemappedQueryInfo = {
  source: string | null,
  writer: string | null,
  raag: string | null
}
export type RemappedQueryVerse = {
  gurmukhi: string,
  translation: string | null,
  id: number,
  verseId: number
}
export type RemappedQuery = {
  info: RemappedQueryInfo
  verse: RemappedQueryVerse
}
export type RemappedVerse = {
  verseID: number,
  gurmukhi: string,
  translation: {
    en: {
      bdb?: string,
      ms?: string,
      ssk?: string
    },
    pu: {
      ss?: string,
      ft?: string,
      bdb?: string,
      ms?: string
    }
  },
  transliteration: {
    en: string,
    hi: string,
    ur: string,
    english: null,
    hindi: null,
    ipa: null
  },
  visraam: Visraam,
}

export type RemappedInfo = {
  shabadID?: number,
  shabadName?: string,
  baniID?: number,
  baniName?: string,
  ang: number,
  raag: {
    id: number,
    name: string
  },
  writer: {
    id: number,
    name: string
  },
  source: {
    id: string,
    name: string
  }
}


// database types
export type entryObj = {
  shabadId: number;
  mainLine: string;
  type: pothiEntry;
  parentPothi: string;
  lines: Line[],
  mods: Modification[];
  entryID: string;
};
export type storedPothi = {
  items: entryObj[];
  name: string;
  pothiID: string;
};
export type Modification = {
  lineID: number,
  element: Element,
  modID: string,
  parentID: string,
  backgroundColor? : string,
  bold? : boolean,
  italics? : boolean,
  fontSize? : boolean,
};
export type Line ={
data: string,
lineId: string
}
export interface RemappedLine {
  id?: number,
  sID: number,
  Gurbani: {
    ascii: string,
    unicode: string,
  },
  Translations: {
    English?: string
    Punjabi: {
      SS?: string, // prof sahib singh ji
      FT?: string, // faridkot teeka
    },
    Spanish?: string
  },
  Transliteration: {
    English: string,
    Hindi?: string
  },
  Vishraams: {
    sttm?: object,
    ig?: object,
    sttm2?: object
  }
}

// state types
export type pothiEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
export type Element = 'Pangtee' | 'Eng' | 'Teeka' | 'Translit' | null;
export type lengthType = 'short' | 'medium' | 'long' | 'extraLong';
export type ModType = 'backgroundColor' | 'bold' | 'italics' | 'fontSize';
export type VishraamType = 'sttm' | 'sttm2' | 'ig';

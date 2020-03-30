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
export type pothiEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
export type Element = 'Pangtee' | 'Eng' | 'Teeka' | 'Translit' | null;
export type lengthType = 'short' | 'medium' | 'long' | 'extraLong';
export type ModType = 'backgroundColor' | 'bold' | 'italics' | 'fontSize';

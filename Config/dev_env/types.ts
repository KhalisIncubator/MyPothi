export type entryObj = {
    shabadId: number;
    mainLine: string;
    type: gutkaEntry;
    parentGutka: string;
    mods: Modification[];
    entryID: string;
};
export type storedGutka = {
    items: entryObj[];
    name: string;
    gutkaID: string;
};
export type Modification = {
    lineID: number,
    parentEntryID: string,
    element: string,
    modID: string,
    backgroundColor? : string,
    bold? : boolean,
    italics? : boolean,
    fontSize? : boolean,
};
export type gutkaEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
export type Element = 'Pangtee' | 'EngTransl' | 'Teeka' | 'Translit' | null;

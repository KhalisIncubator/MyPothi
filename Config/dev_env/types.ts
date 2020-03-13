export type entryObj = {
    shabadId: number;
    mainLine: string;
    type: gutkaEntry;
    parentGutka: string;
    mods: Modification[];
    entryID: string;
    isValid: () => boolean;
};
export type storedGutka = {
    items: entryObj[];
    name: string;
    gutkaID: string;
    isValid: () => boolean;
};
export type Modification = {
    lineID: number;
    backgroundColor?: string;
    bold?: boolean;
    italics?: boolean;
    fontSize?: number;
    element: string;
    modID: string;
};
export type gutkaEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
export type Element = 'Pangtee' | 'EngTransl' | 'Teeka' | 'Translit' | null;

export type entryObj =
  {
    shabadId: number,
    mainLine: string,
    type: gutkaEntry,
    parentGutka: string,
    entryID: string,
  };
export type storedGutka = {
  items: entryObj[],
  name: string,
  gutkaID: string,
}
export type gutkaEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
export type Element = 'Pangtee' | 'EngTransl' | 'Teeka' | 'Translit' | null;
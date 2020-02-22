export type entryObj =
  {
    id: number,
    mainLine: string,
    type: gutkaEntry,
    parentGutka: string,
  };
export type storedGutka = {
  name: string,
  items: entryObj[],
}
export type gutkaEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';
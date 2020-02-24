export type entryObj =
  {
    id: number,
    mainLine: string,
    type: gutkaEntry,
    parentGutka: string,
  };
export type storedGutka = {
  items: entryObj[],
  name: string,
}
export type gutkaEntry = 'Shabad' | 'Bani';
export type SearchType = 0 | 1 | 2 | 3 | 4;
export type QueryType = 'Shabad' | 'Bani';

export type GutkaApi = {
  gutkaNames: string[],
  currentName: string,
  currentItems: entryObj[],
  isDataReady: boolean,

  createGutka: (newName: string) => void,
  updateCurrentName: (newName: string) => void,
  deleteAGutka: (name: string) => void,
  addEntry: (id: number, mainLine: string, parentGutka: string, type: gutkaEntry) => void,
  removeEntry: (id: number) => void
}
export type GlobalApi = {

}
export type ViewerApi = {

}
export type SearchApi = {

}
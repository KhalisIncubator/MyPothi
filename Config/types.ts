export type entryObj =
  {
    id: number,
    mainLine: string,
    type: gutkaEntry,
  };
export type storedGutka = {
  name: string,
  items: entryObj[],
}
export type gutkaEntry = 'Shabad' | 'Bani';
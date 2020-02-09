export type entryObj =
  {
    id: string,
    type: string
  };
export type storedGutka = {
  name: string,
  items: entryObj[],
}
export type gutkaEntry = 'Shabad' | 'Bani';
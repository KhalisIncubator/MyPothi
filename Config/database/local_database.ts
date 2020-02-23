// saved gutkas database
import { Gutkas } from '../defaults';
import { entryObj, gutkaEntry, storedGutka } from '../dev_env/types';
import localRealm from '../realm_schema';

const findGutka = (currentGutka: string) => {
  const gutka = localRealm
    .objects<storedGutka>('Gutka')
    .filtered('name == $0', currentGutka)[0];
  return gutka;
}
const populateData = () => {
  if (localRealm.empty) {
    Gutkas.forEach(gutka => {
      localRealm.write(() => {
        const newGutka = localRealm.create<storedGutka>('Gutka', {
          name: gutka.name,
          items: []
        })
        gutka.items.forEach((item: entryObj) => {
          newGutka.items.push(item);
        })
      })
    })
  }
}
const addToGutka = (currentGutka: string, id: number, mainLine: string, type: gutkaEntry) => {
  const gutka = findGutka(currentGutka);
  localRealm.write(() => {
    const entry = localRealm.create<entryObj>('Entry', {
      id: id,
      mainLine: mainLine,
      type: type,
      parentGutka: currentGutka
    })
    gutka.items.push(entry);
  })
}

const removeFromGutka = (currentGutka: string, itemId: number) => {
  const gutka = findGutka(currentGutka);
  const filter = `id == ${itemId} AND parentGutka == "${currentGutka}"`;
  const item = localRealm
    .objects('Entry')
    .filtered(filter)[0];
  const itemIndex = gutka.items.findIndex((entry: entryObj) => entry.id === itemId)
  localRealm.write(() => {
    gutka.items.splice(itemIndex, 1);
    localRealm.delete(item);
  });
}

const createNewGukta = (name: string) => {
  localRealm.write(() => {
    const newGutka = localRealm.create<storedGutka>('Gukta', {
      name: name,
      items: []
    })
  })
}
const deleteGukta = (name: string) => {
  const gutka = findGutka(name);
  localRealm.write(() => {
    localRealm.delete(gutka);
  })
}
export {
  findGutka,
  populateData,
  addToGutka,
  removeFromGutka,
  createNewGukta,
  deleteGukta
}
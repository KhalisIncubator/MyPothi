// saved gutkas database
import { Gutkas } from '../defaults';
import { entryObj, gutkaEntry } from '../dev_env/types';

const findGutka = (currentGutka: string, realm) => {
  const gutka = realm
    .objects('Gutka')
    .filtered('name == $0', currentGutka)[0];
  return gutka;
}
const populateData = (realm) => {
  if (realm.empty) {
    Gutkas.forEach(gutka => {
      console.log('populating...' + gutka.name);
      realm.write(() => {
        const newGutka = realm.create('Gutka', {
          name: gutka.name,
          items: []
        })
        gutka.items.forEach(item => {
          newGutka.items.push(item);
        })
      })
    })
  }
}
const addToGutka = (currentGutka: string, id: number, mainLine: string, type: gutkaEntry, realm) => {
  const gutka = findGutka(currentGutka, realm);
  realm.write(() => {
    const entry = realm.create('Entry', {
      id: id,
      mainLine: mainLine,
      type: type
    })
    gutka.items.push(entry);
  })
}

const removeFromGutka = (currentGutka: string, itemId: number, realm) => {
  const gutka = findGutka(currentGutka, realm);
  const filter = `id == ${itemId} AND parentGutka == "${currentGutka}"`;
  const item = realm
    .objects('Entry')
    .filtered(filter)[0];
  const itemIndex = gutka.items.findIndex((entry: entryObj) => entry.id === itemId)
  realm.write(() => {
    gutka.items.splice(itemIndex, 1);
    realm.delete(item);
  });
}

const createGukta = (name: string, realm) => {
  realm.write(() => {
    const newGutka = realm.create('Gukta', {
      name: name,
      items: []
    })
  })
}
const deleteGukta = (name: string, realm) => {
  const gutka = findGutka(name, realm);
  realm.write(() => {
    realm.delete(gutka);
  })
}
export {
  populateData,
  addToGutka,
  removeFromGutka,
  createGukta,
  deleteGukta
}
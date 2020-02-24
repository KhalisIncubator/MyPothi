// saved gutkas database
import _ from 'lodash';
import { Gutkas } from '../defaults';
import { entryObj, gutkaEntry, storedGutka } from '../dev_env/types';
import localRealm from '../realm_schema';

/**
 * fetches an array of all the gutkas' names (so that top level app state is not managing large amounts of data)
 */
const fetchAllGutkas = () => {
  const names = [];
  const gutkas = localRealm
    .objects<storedGutka>('Gutka');
  gutkas.forEach(gutka => {
    names.push(gutka.name);
  });
  return names;
}

/**
 * 
 * @param {string} currentGutka the name of the current gutka
 * @returns {storedGutka} the stored gutka object with the name property provided
 */
const findGutka = (currentGutka: string) => {
  const gutka = localRealm
    .objects<storedGutka>('Gutka')
    .filtered('name == $0', currentGutka)[0];
  return gutka;
}
/**
 * 
 * @param {string} currentGutka the name of the current gutka
 * @returns {entryObj[]} an array of items stored within the gutka 
 */
const getCurrentItems = (currentGutka: string): entryObj[] => {
  const gutka = findGutka(currentGutka);
  return _.values(gutka.items);
}
/**
 * if the realm is empty, then it is populated with the items in {@link ../defaults}
 */
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
/**
 * 
 * @param {string} currentGutka the name of the current gutka
 * @param {number} id shabadID/baniID of the new entry
 * @param {string} mainLine the main line identifier of the shabad
 * @param {gutkaEntry} type shabad or bani
 */
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
  fetchAllGutkas,
  findGutka,
  getCurrentItems,
  populateData,
  addToGutka,
  removeFromGutka,
  createNewGukta,
  deleteGukta
}
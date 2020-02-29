// saved gutkas database
import _ from 'lodash';
import { Gutkas } from '../defaults';
import localRealm from '../realm_schema';



const isDataEmpty = () => localRealm.empty;
/**
 * fetches an array of all the gutkas' names (so that top level app state is not managing large amounts of data)
 */
const fetchAllGutkas = () => {
  const names = [];
  const gutkas = localRealm
    .objects('Gutka');
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
const findGutka = (currentGutka) => {
  const filter = `name == "${currentGutka}"`;
  const gutka = localRealm
    .objects('Gutka')
    .filtered(filter)[0];
  return gutka;
}
/**
 * 
 * @param {string} currentGutka the name of the current gutka
*/
////  * @returns {Promise<entryObj[]>} an array of items stored within the gutka 
// : Promise<entryObj[]>
const getCurrentItems = (currentGutka) => {
  let gutka;
  if (currentGutka) {
    gutka = findGutka(currentGutka);
  } else {
    gutka = localRealm
      .objects('Gutka')[0];
  }


  const items = [];
  for (let i = 0; i < gutka.items.length; i++) {
    if (gutka.items[i].isValid()) {
      items.push(gutka.items[i]);
    }
  }
  return items;
}
/**
 * if the realm is empty, then it is populated with the items in {@link ../defaults}
 */
const populateData = () => {
  if (localRealm.empty) {
    Gutkas.forEach(gutka => {
      localRealm.write(() => {
        const newGutka = localRealm.create('Gutka', {
          name: gutka.name,
          items: []
        })
        gutka.items.forEach((item) => {
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
const addToGutka = (currentGutka, id, mainLine, type) => {
  const gutka = findGutka(currentGutka);
  localRealm.write(() => {
    const entry = localRealm.create('Entry', {
      id: id,
      mainLine: mainLine,
      type: type,
      parentGutka: currentGutka
    })
    gutka.items.push(entry);
  })
}

const removeFromGutka = (currentGutka, itemId) => {
  const gutka = findGutka(currentGutka);
  const filter = `id == ${itemId} AND parentGutka == "${currentGutka}"`;
  const item = localRealm
    .objects('Entry')
    .filtered(filter)[0];
  const itemIndex = gutka.items.findIndex((entry) => entry.id === itemId)
  localRealm.write(() => {
    gutka.items.splice(itemIndex, 1);
    localRealm.delete(item);
  });
}

const createNewGukta = (name) => {
  localRealm.write(() => {
    const newGutka = localRealm.create('Gutka', {
      name: name,
      items: []
    })
  })
}
const deleteGukta = (name) => {
  const gutka = findGutka(name);
  localRealm.write(() => {
    localRealm.delete(gutka);
  })
}

export {
  isDataEmpty,
  fetchAllGutkas,
  findGutka,
  getCurrentItems,
  populateData,
  addToGutka,
  removeFromGutka,
  createNewGukta,
  deleteGukta
}
// saved gutkas database
import _ from 'lodash';
import { Gutkas } from '../defaults';
import localRealm from '../realm_schema';

import generateID from './functions';


const isDataEmpty = () => localRealm.empty;


const realmPath = () => localRealm.path;

const emptyDB = () => {
  localRealm.deleteAll();
}
/**
 * fetches an array of all the gutkas' names (so that top level app state is not managing large amounts of data)
 */
const fetchAllGutkas = () => {
  const names = [];
  const gutkas = localRealm
    .objects('Gutka');
  gutkas.forEach(gutka => {
    names.push([gutka.name, gutka.gutkaID]);
  });
  return names;
}

/**
 * 
 * @param {string} currentGutka the name of the current gutka
 * @returns {storedGutka} the stored gutka object with the name property provided
 */
const findGutka = (currentGutka, gutkaID) => {
  const filter = `name == "${currentGutka}" AND gutkaID == "${gutkaID}"`;
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
const getCurrentItems = (currentGutka, gutkaID) => {
  let gutka;
  if (currentGutka !== undefined && gutkaID !== undefined) {
    gutka = findGutka(currentGutka, gutkaID);
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
          items: [],
          gutkaID: gutka.gutkaID
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
const addToGutka = (currentGutka, gutkaID, id, mainLine, type) => {
  const gutka = findGutka(currentGutka, gutkaID);
  const newID = generateID();
  localRealm.write(() => {
    const entry = localRealm.create('Entry', {
      shabadId: id,
      mainLine: mainLine,
      type: type,
      parentGutka: currentGutka,
      mods: [],
      entryID: newID
    })
    gutka.items.push(entry);
  })
}

const removeFromGutka = (currentGutka, itemId) => {
  const filter = `entryID == "${itemId}" AND parentGutka == "${currentGutka}"`;
  const item = localRealm
    .objects('Entry')
    .filtered(filter)[0];
  localRealm.write(() => {
    localRealm.delete(item);
  });
}

const createNewGukta = (name) => {
  const newID = generateID();
  localRealm.write(() => {
    const newGutka = localRealm.create('Gutka', {
      name: name,
      items: [],
      gutkaID: newID,
    })
  })
}

const deleteGukta = (name, gutkaID) => {
  const gutka = findGutka(name, gutkaID);
  localRealm.write(() => {
    localRealm.delete(gutka);
  })
}

export {
  isDataEmpty,
  realmPath,
  emptyDB,
  fetchAllGutkas,
  findGutka,
  getCurrentItems,
  populateData,
  addToGutka,
  removeFromGutka,
  createNewGukta,
  deleteGukta
}
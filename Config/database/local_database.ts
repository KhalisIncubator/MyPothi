/* eslint-disable no-restricted-syntax */
// saved gutkas database
import { Gutkas } from '../defaults';
import localRealm from '../realm_schema';

import generateID from './functions';
import {
  storedGutka, entryObj, Modification, ModType, Element,
} from '../dev_env/types';


// global db functions
/**
 * looks to see if db has any objects in
 * @returns {boolean} isEmpty
 */
const isDataEmpty = () => localRealm.empty;

/**
 * path of the realm
 * @returns {string} path
 */
const realmPath = () => localRealm.path;

/**
 * delete all objects in database
 */
const emptyDB = () => {
  localRealm.deleteAll();
};

/**
 * if the realm is empty, then it is populated with the items in {@link ../defaults}
 */
const populateData = () => {
  if ( localRealm.empty ) {
    Gutkas.forEach( ( gutka ) => {
      localRealm.write( () => {
        const newGutka = localRealm.create( 'Gutka', {
          name: gutka.name,
          items: [],
          gutkaID: gutka.gutkaID,
        } );
        gutka.items.forEach( ( item ) => {
          newGutka.items.push( item );
        } );
      } );
    } );
  }
};

export {
  isDataEmpty, realmPath, emptyDB, populateData,
};

// gutka functions
/**
 * fetches an array of all the gutkas' names (so that top level app state is not managing large amounts of data)
 */
const fetchAllGutkas = (): string[][] => {
  const names = [];
  const gutkas = localRealm.objects<storedGutka>( 'Gutka' );
  gutkas.forEach( ( gutka ) => {
    names.push( [ gutka.name, gutka.gutkaID ] );
  } );
  return names;
};

/**
 *
 * @param {string} currentGutka the name of the current gutka
 * @returns {storedGutka} the stored gutka object with the name property provided
 */
const findGutka = ( currentGutka, gutkaID ) => {
  const filter = `name == "${currentGutka}" AND gutkaID == "${gutkaID}"`;
  const [ gutka ] = localRealm.objects<storedGutka>( 'Gutka' ).filtered( filter );
  return gutka;
};
const createNewGukta = ( name ) => {
  const newID = generateID();
  localRealm.write( () => {
    localRealm.create( 'Gutka', {
      name,
      items: [],
      gutkaID: newID,
    } );
  } );
};

/**
 *
 * @param name string of name
 * @param gutkaID string of id, generated by nanoid
 */
const deleteGukta = ( name, gutkaID ) => {
  const gutka = findGutka( name, gutkaID );
  localRealm.write( async () => {
    for await ( const item of gutka.items ) {
      localRealm.delete( item );
    }
    localRealm.delete( gutka );
  } );
};

export {
  fetchAllGutkas, findGutka, createNewGukta, deleteGukta,
};

// entry/item related functions

/**
 * @param { string } parentG name of the parent gutka
 * @param { string } entryID id of the entry, generated by nanoid
 * @returns { entryObj } item
 */
const findItem = ( parentG, entryID ) => {
  const filter = `parentGutka == "${parentG}" AND entryID == "${entryID}"`;
  const [ item ] = localRealm.objects<entryObj>( 'Entry' ).filtered( filter );
  return item;
};
/**
 *
 * @param {string} currentGutka the name of the current gutka
 * @param {string} gutkaID id string of the gutka, generated by nanoid
 * @returns {entryObj[]} array of the items
 */
const getCurrentItems = ( currentGutka, gutkaID ) => {
  let gutka;
  if ( currentGutka !== undefined && gutkaID !== undefined ) {
    gutka = findGutka( currentGutka, gutkaID );
  } else {
    [ gutka ] = localRealm.objects( 'Gutka' );
  }

  const items: entryObj[] = [];
  for ( let i = 0; i < gutka.items.length; i++ ) {
    if ( gutka.items[i].isValid() ) {
      items.push( gutka.items[i] );
    }
  }
  return items;
};

/**
 *
 * @param {string} currentGutka the name of the current gutka
 * @param {number} id shabadID/baniID of the new entry
 * @param {string} mainLine the main line identifier of the shabad
 * @param {gutkaEntry} type shabad or bani
 */
const addToGutka = ( currentGutka, gutkaID, id, mainLine, type ) => {
  const gutka: storedGutka = findGutka( currentGutka, gutkaID );
  const newID = generateID();
  localRealm.write( () => {
    const entry = localRealm.create( 'Entry', {
      shabadId: id,
      mainLine,
      type,
      parentGutka: currentGutka,
      mods: [],
      entryID: newID,
    } );
    gutka.items.push( entry );
  } );
};

/**
 *
 * @param currentGutka string name of current gutka
 * @param itemId string id of the item, generated by nanoid
 */
const removeFromGutka = ( currentGutka, itemId ) => {
  const item = findItem( currentGutka, itemId );
  localRealm.write( () => {
    localRealm.delete( item );
  } );
};


export { getCurrentItems, addToGutka, removeFromGutka };

// modification related functions

const getModification = ( lineid: number, element: string, modID: string ) => {
  const filter = `lineID == "${lineid}" AND element == "${element}" AND modID == "${modID}"`;
  const [ mod ] = localRealm.objects<Modification>( 'Modification' ).filtered( filter );
  return mod;
};
const existsModification = ( lineid: number, element: string, modID: string ) => getModification( lineid, element, modID ) !== undefined;
const createModification = ( currentName: string, parentID: string ) => {
  const item = findItem( currentName, parentID );
  return ( lineid: number, element: Element, modID: string, type: ModType, value:any ) => {
    const newMod = {
      lineID: lineid,
      element,
      modID,
      [type]: value,
    };
    localRealm.write( () => {
      const mod = localRealm.create( 'Modification', { ...newMod } );
      item.mods.push( mod );
    } );
  };
};
const editModification = ( lineid: number, element: Element, modID: string, newMod: ModType ) => 0;
const deleteModification = ( lineid: number, element: Element, modID: string ) => {
  const mod = getModification( lineid, element, modID );
  localRealm.write( () => {
    localRealm.delete( mod );
  } );
};

export {
  getModification, existsModification, createModification, editModification, deleteModification,
};

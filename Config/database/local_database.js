/* eslint-disable no-restricted-syntax */
// saved gutkas database
import _ from 'lodash';
import { Gutkas } from '../defaults';
import localRealm from '../realm_schema';

import generateID from './functions';

const isDataEmpty = () => localRealm.empty;

const realmPath = () => localRealm.path;

const emptyDB = () => {
  localRealm.deleteAll();
};
/**
 * fetches an array of all the gutkas' names (so that top level app state is not managing large amounts of data)
 */
const fetchAllGutkas = () => {
  const names = [];
  const gutkas = localRealm.objects( 'Gutka' );
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
  const [ gutka ] = localRealm.objects( 'Gutka' ).filtered( filter );
  return gutka;
};
const findItem = ( parentG, entryID ) => {
  const filter = `parentGutka == "${parentG}" AND entryID == "${entryID}"`;
  const [ item ] = localRealm.objects( 'Entry' ).filtered( filter );
  return item;
};
/**
 *
 * @param {string} currentGutka the name of the current gutka
 */
// : Promise<entryObj[]>
const getCurrentItems = ( currentGutka, gutkaID ) => {
  let gutka;
  if ( currentGutka !== undefined && gutkaID !== undefined ) {
    gutka = findGutka( currentGutka, gutkaID );
  } else {
    [ gutka ] = localRealm.objects( 'Gutka' );
  }

  const items = [];
  for ( let i = 0; i < gutka.items.length; i++ ) {
    if ( gutka.items[i].isValid() ) {
      items.push( gutka.items[i] );
    }
  }
  return items;
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
/**
 *
 * @param {string} currentGutka the name of the current gutka
 * @param {number} id shabadID/baniID of the new entry
 * @param {string} mainLine the main line identifier of the shabad
 * @param {gutkaEntry} type shabad or bani
 */
const addToGutka = ( currentGutka, gutkaID, id, mainLine, type ) => {
  const gutka = findGutka( currentGutka, gutkaID );
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

const removeFromGutka = ( currentGutka, itemId ) => {
  const filter = `entryID == "${itemId}" AND parentGutka == "${currentGutka}"`;
  const [ item ] = localRealm.objects( 'Entry' ).filtered( filter );
  localRealm.write( () => {
    localRealm.delete( item );
  } );
};

const createNewGukta = ( name ) => {
  const newID = generateID();
  localRealm.write( () => {
    const newGutka = localRealm.create( 'Gutka', {
      name,
      items: [],
      gutkaID: newID,
    } );
  } );
};

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
  deleteGukta,
};

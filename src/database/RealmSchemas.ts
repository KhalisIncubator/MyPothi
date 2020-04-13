/* eslint-disable no-restricted-syntax */
import Realm, { Configuration } from 'realm';
import { storedPothi, entryObj } from '../../types/types';
// import { loadBani, loadShabad } from './BanidbApi';
// import { entryObj } from '../../types/types';

const PothiSchema = {
  name: 'Pothi',
  primaryKey: 'pothiID',
  properties: {
    name: 'string',
    index: 'int',
    items: 'Entry[]',
    pothiID: 'string',
  },
};
const EntrySchema = {
  name: 'Entry',
  primaryKey: 'entryID',
  properties: {
    shabadId: 'int',
    index: 'int',
    mainLine: 'string',
    type: 'string',
    parentPothi: 'string',
    mods: 'Modification[]',
    lines: 'Line[]',
    entryID: 'string',
    source: 'string?',
    writer: 'string?',
    raag: 'string?',
  },
};
const ModificationSchema = {
  name: 'Modification',
  primaryKey: 'modID',
  properties: {
    lineID: 'int',
    element: 'string',
    modID: 'string',
    parentID: 'string',
    backgroundColor: 'string?',
    bold: 'bool?',
    italics: 'bool?',
    fontSize: 'int?',
  },
};
const LineSchema = {
  name: 'Line',
  properties: {
    // JSON.stringify the data for storage space
    data: 'string',
    lineId: 'int',
  },
};
const localRealmConfig: Configuration = {
  schema: [ PothiSchema, EntrySchema, ModificationSchema, LineSchema ],
  schemaVersion: 4,
  migration: ( oldRealm, newRealm ) => {
    if ( oldRealm.schemaVersion < 4 ) {
      const newGutkas = newRealm.objects<storedPothi>( 'Pothi' );
      newGutkas.forEach( ( pothi, index ) => {
        pothi.index = index;
        pothi.items.forEach((entry, index) => {
          entry.index = index;
          entry.source = null;
          entry.writer = null;
          entry.raag = null;
        })
      } );
    }
  },
};

export default new Realm( localRealmConfig );
export { PothiSchema, EntrySchema };

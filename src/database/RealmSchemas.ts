/* eslint-disable no-restricted-syntax */
import Realm, { Configuration } from 'realm';
// import { loadBani, loadShabad } from './BanidbApi';
// import { entryObj } from '../../types/types';

const PothiSchema = {
  name: 'Pothi',
  primaryKey: 'pothiID',
  properties: {
    name: 'string',
    items: 'Entry[]',
    pothiID: 'string',
  },
};
const EntrySchema = {
  name: 'Entry',
  primaryKey: 'entryID',
  properties: {
    shabadId: 'int',
    mainLine: 'string',
    type: 'string',
    parentPothi: 'string',
    mods: 'Modification[]',
    lines: 'Line[]',
    entryID: 'string',
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
  schemaVersion: 2,
  // migration: async ( oldRealm, newRealm ) => {
  //   if ( oldRealm.schemaVersion < 2 ) {
  //     const newItems = newRealm.objects<entryObj>( 'Entry' );
  //     for await ( const item of newItems ) {
  //       if ( !item.lines ) item.lines = item.type === 'Bani' ? await loadBani( item.shabadId, 'long' ) : await loadShabad( item.shabadId );
  //     }
  //   }
  // },
  // deleteRealmIfMigrationNeeded: true,
};

export default new Realm( localRealmConfig );
export { PothiSchema, EntrySchema };

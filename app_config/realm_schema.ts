/* eslint-disable no-restricted-syntax */
import Realm, { Configuration } from 'realm';
import { loadBani, loadShabad } from './database/banidb_api';
import { entryObj } from './dev_env/types';

const GuktaSchema = {
  name: 'Gutka',
  primaryKey: 'gutkaID',
  properties: {
    name: 'string',
    items: 'Entry[]',
    gutkaID: 'string',
  },
};
const EntrySchema = {
  name: 'Entry',
  primaryKey: 'entryID',
  properties: {
    shabadId: 'int',
    mainLine: 'string',
    type: 'string',
    parentGutka: 'string',
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
  schema: [ GuktaSchema, EntrySchema, ModificationSchema, LineSchema ],
  schemaVersion: 2,
  migration: async ( oldRealm, newRealm ) => {
    if ( oldRealm.schemaVersion < 2 ) {
      const newItems = newRealm.objects<entryObj>( 'Entry' );
      for await ( const item of newItems ) {
        item.lines = item.type === 'Bani' ? await loadBani( item.shabadId, 'long' ) : await loadShabad( item.shabadId );
      }
    }
  },
  // deleteRealmIfMigrationNeeded: true,
};

export default new Realm( localRealmConfig );
export { GuktaSchema, EntrySchema };

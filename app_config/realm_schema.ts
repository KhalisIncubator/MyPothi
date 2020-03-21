import Realm, { Configuration } from 'realm';

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
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
};

export default new Realm( localRealmConfig );
export { GuktaSchema, EntrySchema };

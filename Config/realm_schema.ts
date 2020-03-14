import Realm from 'realm';

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
    entryID: 'string',
  },
};
const ModificationSchema = {
  name: 'Modification',
  primaryKey: 'modID',
  properties: {
    lineID: 'int',
    element: 'string',
    // only needed to asign mod to correct entry
    parentID: 'string',
    modID: 'string',
    backgroundColor: 'string?',
    bold: 'bool?',
    italics: 'bool?',
    fontSize: 'int?',
  },
};
const localRealmConfig = {
  schema: [ GuktaSchema, EntrySchema, ModificationSchema ],
  schemaVersion: 12,
};

export default new Realm( localRealmConfig );
export { GuktaSchema, EntrySchema };

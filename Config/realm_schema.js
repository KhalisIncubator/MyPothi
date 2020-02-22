// does not include db schema (it is parsed from download in ./database/database.ts)

const GuktaSchema = {
  name: 'Gutka',
  properties: {
    name: 'string',
    items: 'Entry[]'
  }
}
const EntrySchema = {
  name: 'Entry',
  properties: {
    id: 'int',
    mainLine: 'string',
    type: 'string',
    parentGutka: 'string'
  }
}

const localRealmConfig = {
  schema: [GuktaSchema, EntrySchema],
  schemaVersion: 3,
}
export default localRealmConfig;
export {
  GuktaSchema,
  EntrySchema
}
import RNFetchBlob from 'rn-fetch-blob';
let dirs = RNFetchBlob.fs.dirs;
const $dbPath = dirs.DocumentDir + '/sttmdesktop-evergreen';

const dbSchemas = [
  {
    "name": "Banis",
    "primaryKey": "ID",
    "properties": {
      "ID": "int",
      "Token": {
        "type": "string",
        "indexed": true
      },
      "Gurmukhi": "string",
      "Updated": "date?"
    }
  },
  {
    "name": "Banis_Custom",
    "primaryKey": "ID",
    "properties": {
      "ID": "int",
      "English": "string?",
      "Gurmukhi": "string?",
      "Updated": "date?"
    }
  },
  {
    "name": "Banis_Shabad",
    "primaryKey": "ID",
    "properties": {
      "ID": "int",
      "Bani": "Banis",
      "Shabad": "Shabad?",
      "Verse": "Verse?",
      "Custom": "Banis_Custom?",
      "Seq": "int",
      "header": "int",
      "MangalPosition": "string?",
      "existsSGPC": "bool",
      "existsMedium": "bool",
      "existsTaksal": "bool",
      "existsBuddhaDal": "bool",
      "Updated": "date?",
      "Paragraph": "int"
    }
  },
  {
    "name": "Shabad",
    "primaryKey": "ShabadID",
    "properties": {
      "ShabadID": "int"
    }
  },
  {
    "name": "Source",
    "primaryKey": "SourceID",
    "properties": {
      "SourceID": "string",
      "SourceGurmukhi": "string?",
      "SourceEnglish": "string?"
    }
  },
  {
    "name": "Verse",
    "primaryKey": "ID",
    "properties": {
      "ID": "int",
      "Gurmukhi": "string?",
      "Translations": "string?",
      "Writer": "Writer?",
      "Raag": "Raag?",
      "PageNo": {
        "type": "int?",
        "indexed": true
      },
      "LineNo": "int?",
      "Source": "Source",
      "FirstLetterStr": {
        "type": "string?",
        "indexed": true
      },
      "MainLetters": "string?",
      "Visraam": "string?",
      "FirstLetterEng": {
        "type": "string?",
        "indexed": true
      },
      "Updated": "date?",
      "FirstLetterLen": {
        "type": "int?",
        "indexed": true
      },
      "Shabads": "Shabad[]"
    }
  },
  {
    "name": "Writer",
    "primaryKey": "WriterID",
    "properties": {
      "WriterID": "int",
      "WriterEnglish": "string?",
      "WriterGurmukhi": "string?"
    }
  }
];
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
const baniDBRealm = {
  path: $dbPath,
  schema: dbSchemas,
  schemaVersion: 2
}

export default new Realm(localRealmConfig);
// export const BaniDB = new Realm(baniDBRealm);
export {
  GuktaSchema,
  EntrySchema
}
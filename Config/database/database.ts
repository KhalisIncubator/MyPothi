import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'
import { ISchemaJSON, IConifg } from '../database/database-interfaces';
import localRealmConfig, { GuktaSchema, EntrySchema } from '../realm_schema';
import { populateData, addToGutka, removeFromGutka } from './local_database';

const consts = require('./database_conts');
const Realm = require('realm');
let dirs = RNFetchBlob.fs.dirs
const $dbPath = dirs.DocumentDir + '/sttmdesktop-evergreen';
const $dbSchema = `${$dbPath}/realm-schema-evergreen.json`;

const anvaad = require('anvaad-js');
let downloadProg: number;
let hasDownloadFinished: boolean;

// export db variables separate from functions
export {
  $dbPath,
  $dbSchema,
  downloadProg
}

// initialization functions

const downloadDB = async () => {
  RNFetchBlob
    .config({
      fileCache: true,
    })
    .fetch('GET', 'https://banidb.com/databases/sttmdesktop-evergreen.zip', {
      //some headers ..
    })
    // listen to download progress event
    .progress((received, total) => {
      downloadProg = received / total;
      console.log('progress', downloadProg);
    })
    .then((res) => {
      unzip(res.path(), $dbPath)
        .then((path) => { })
        .catch(e => {
        })
    })
}

const checkIfDbExists = (): Promise<boolean> => RNFetchBlob.fs.exists($dbPath);


// return parsed version of schema JSON
const readSchema = (): Promise<ISchemaJSON> => {
  return RNFetchBlob.fs.readFile(`${dirs.DocumentDir}/sttmdesktop-evergreen/realm-schema-evergreen.json`, 'utf8')
    .then((data) => {
      return JSON.parse(data);
    })
}
// configuration object to use in opening realm. 
// TODO: remove config variable and just await readSchema in load functions
const config: IConifg = {};
const initSchema = async () => {
  const { schemas, schemaVersion } = await readSchema();
  config.path = `${RNFetchBlob.fs.dirs.DocumentDir}/sttmdesktop-evergreen/sttmdesktop-evergreen.realm`;
  config.schema = schemas;
  config.schemaVersion = schemaVersion;
}

const loadShabad = async (ShabadID: number) => {
  await initSchema();
  return new Promise((resolve, reject) => {
    Realm.open(config)
      .then((realm: any) => {
        const rows = realm
          .objects('Verse')
          .filtered('ANY Shabads.ShabadID == $0', ShabadID)
          .sorted('ID');
        if (rows.length > 0) {
          resolve(rows);
        }
      })
      .catch(reject);
  });
}
const remapLine = (rawLine: any) => {
  const Line = Object.assign(rawLine, {});
  if (Line.Translations) {
    const lineTranslations = JSON.parse(Line.Translations);
    Line.English = lineTranslations.en.bdb;
    Line.Punjabi = lineTranslations.pu.ss;
    Line.Spanish = lineTranslations.es.sn;
  }
  Line.Transliteration = {
    English: anvaad.translit(Line.Gurmukhi || ''),
    Shahmukhi: anvaad.translit(Line.Gurmukhi || '', 'shahmukhi'),
    Devanagari: anvaad.translit(Line.Gurmukhi || '', 'devnagri'),
  };
  return Line;
}

const query = async (searchQuery: string, searchType: number) => {
  await initSchema();

  return new Promise((resolve, reject) => {
    let dbQuery = '';
    let searchColumn = '';
    let condition = '';

    // Sanitize query
    const saniQuery = searchQuery.trim().replace("'", "\\'");
    const MAX_RESULTS = 20;
    const resultsOrder = [];
    switch (searchType) {
      case consts.SEARCH_TYPES.FIRST_LETTERS: // First letter start
      case consts.SEARCH_TYPES.FIRST_LETTERS_ANYWHERE: {
        searchColumn = 'FirstLetterStr';
        let operator = searchType === consts.SEARCH_TYPES.FIRST_LETTERS ? 'BEGINSWITH' : 'CONTAINS';
        for (let x = 0, len = saniQuery.length; x < len; x += 1) {
          let charCode = `${saniQuery.charCodeAt(x)}`;
          if (charCode.length < 3) {
            charCode = `0${charCode}`;
          }
          else {
            dbQuery += `,${charCode}`;
          }
        }
        condition = `${searchColumn} ${operator} '${dbQuery}'`;
        if (saniQuery.length < 3) {
          resultsOrder.push('FirstLetterLen');
        }
        break;
      }
      default:
        break;
    }
    resultsOrder.push('Shabads');
    condition = `${condition} SORT(${resultsOrder.join(' ASC, ')} ASC)`;
    Realm.open(config)
      .then(realm => {
        const rows = realm.objects('Verse').filtered(condition);
        resolve(rows.slice(0, MAX_RESULTS));
      })
      .catch(reject);
  });
}
export {
  downloadDB,
  checkIfDbExists,
  readSchema,
  initSchema,
  loadShabad,
  remapLine,
  query,
}
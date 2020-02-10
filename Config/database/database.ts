import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'
import { ISchemaJSON, Schema, IConifg } from '../database/database-interfaces';
const Realm = require('realm');

let dirs = RNFetchBlob.fs.dirs
const $dbPath = dirs.DocumentDir + '/sttmdesktop-evergreen';
const $dbSchema = `${$dbPath}/realm-schema-evergreen.json`;
const $md5 = `${$dbPath}/sttmdesktop.md5`;

// export db variables separate from functions
export {
  $dbPath,
  $dbSchema
}

// initialization functions

const downloadDB = async () => {
  console.log('execution started')
  RNFetchBlob
    .config({
      fileCache: true,
    })
    .fetch('GET', 'https://banidb.com/databases/sttmdesktop-evergreen.zip', {
      //some headers ..
    })
    // listen to download progress event
    .progress((received, total) => {
      console.log('progress', received / total)
    })
    .then((res) => {
      unzip(res.path(), $dbPath)
        .then((path) => { })
        .catch(e => {
          console.log(e);
        })
    })
}

const checkIfDbExists = (): Promise<boolean> => {
  return RNFetchBlob.fs.exists($dbPath)
    .then((exists) => {
      return exists;
    })
    .catch((e) => { return Promise.reject() })
}
const readSchema = async (): Promise<ISchemaJSON> => {
  try {
    return RNFetchBlob.fs.readFile(`${RNFetchBlob.fs.dirs.DocumentDir}/sttmdesktop-evergreen/realm-schema-evergreen.json`, 'utf8')
      .then((data) => {
        // handle the data ..
        return data;
      })
      .catch(e => {
        return Promise.reject();
      })
  } catch (e) {
    throw new Error();
  }
}

const config: IConifg = {};
const initSchema = async () => {
  const jsonParse = await readSchema();
  config.path = `${$dbPath}/sttmdesktop-evergreen.realm`;
  config.schemas = jsonParse.schemas;
  config.schemaVersion = jsonParse.schemaVersion;
}

const loadShabad = (ShabadID: number) =>
  new Promise((resolve, reject) => {
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
export {
  downloadDB,
  checkIfDbExists,
  readSchema,
  initSchema,
  loadShabad
}
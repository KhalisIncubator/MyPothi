import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'
import { ISchemaJSON, IConifg } from '../database/database-interfaces';

const Realm = require('realm');
let dirs = RNFetchBlob.fs.dirs
const $dbPath = dirs.DocumentDir + '/sttmdesktop-evergreen';
const $dbSchema = `${$dbPath}/realm-schema-evergreen.json`;

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

const readSchema = (): Promise<ISchemaJSON> => {
  return RNFetchBlob.fs.readFile(`${dirs.DocumentDir}/sttmdesktop-evergreen/realm-schema-evergreen.json`, 'utf8')
    .then((data) => {
      // handle the data ..
      return JSON.parse(data);
    })
}

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

export {
  downloadDB,
  checkIfDbExists,
  readSchema,
  initSchema,
  loadShabad
}
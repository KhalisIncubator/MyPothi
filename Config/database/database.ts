import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'
import { ISchemaJSON } from '../database/database-interfaces';
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

const checkIfDbExists = () => {
  RNFetchBlob.fs.exists($dbSchema)
    .then((files) => {
      console.log(`files: ${files}`)
    })
    .catch((e) => { console.log(e) })
}
export {
  downloadDB,
  checkIfDbExists,
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
// readSchema();

// const config =  {
//   path: `${$dbPath}/sttmdesktop-evergreen.realm`,
//   schema: 
//   schemaVersion: realmSchema.schemaVersion,
// }
// const initSchema = async() => {
//   const schema = await readSchema();

//   config.schema = sce
// }
// const loadShabad = (ShabadID: number) =>
//   new Promise((resolve, reject) => {
//     Realm.open(config)
//       .then((realm: any) => {
//         const rows = realm
//           .objects('Verse')
//           .filtered('ANY Shabads.ShabadID == $0', ShabadID)
//           .sorted('ID');
//         if (rows.length > 0) {
//           resolve(rows);
//         }
//       })
//       .catch(reject);
//   });
export {
  readSchema,
}
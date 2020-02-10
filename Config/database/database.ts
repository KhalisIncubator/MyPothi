import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'
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
// const realmSchema = require($dbSchema);

const config = {
  path: `${$dbPath}/sttmdesktop-evergreen.realm`,
  // schema: realmSchema.schemas,
  // schemaVersion: realmSchema.schemaVersion,
}

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
// export {
//   loadShabad
// }
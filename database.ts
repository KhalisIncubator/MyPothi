import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive'


let dirs = RNFetchBlob.fs.dirs
const $dbPath = dirs.DocumentDir + '/sttmdesktop-evergreen';
const $dbSchema = $dbPath + '/realm-schema-evergreen.json';
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
        .then((path) => {
          console.log(`unzip completed at ${path}`);
        })
        .catch(e => {
          console.log(e);
        })
    })
}

const checkIfDbExists = () => {
  RNFetchBlob.fs.ls($dbPath)
    .then((exist) => {
      console.log(`file ${exist ? '' : 'not'} exists`)
    })
    .catch((e) => { console.log(e) })
}

export {
  downloadDB,
  checkIfDbExists
}
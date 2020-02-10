import RNFetchBlob from 'rn-fetch-blob';
// 
const downloadDB = async () => {
  console.log('execution started')
  RNFetchBlob
    .config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
    })
    .fetch('GET', 'https://banidb.com/databases/sttmdesktop-evergreen.zip', {
      //some headers ..
    })
    .then((res) => {
      // the temp file path
      console.log('The file saved to ', res.path());
      console.log('here');
    })
}


export {
  downloadDB
}
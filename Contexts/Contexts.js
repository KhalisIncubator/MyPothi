import React, { useState } from 'react';
// import Gutka from '../Screens/Gutka';


// this is perfectly valid syntax but the newer syntax works better for this use case
// const GutkaProvider = (props) => {

//   // anything to do with fetching on startup
//   const [currGutka, setCurrGutka] = useState('Loading...');
//   const [isFetchingFinished, updateFetchingStatus] = useState(false);
//   const [gutkas, addToGutkas] = useState([]);

//   const [currShabadID, setCurrShabadID] = useState(null);
//   const [isEditMode, setMode] = useState(false);
//   return (
//     <GutkaContext.Provider
//       value={{
//         currGutka,
//         setCurrGutka,
//         gutkas,
//         addToGutkas,
//         isFetchingFinished,
//         updateFetchingStatus,
//         currShabadID,
//         setCurrShabadID,
//         isEditMode,
//         setMode
//       }}
//     >
//       {props.children}
//     </GutkaContext.Provider>
//   );
// }


export const GutkaContext = React.createContext({
  gutkas: [],
  createGutka: () => { },
  currentGutka: [],
  removeFromGutka: () => { },
  addToGutka: () => { },
  isDataReady: null,
})
export const GlobalContext = React.createContext({
  currentGutkaName: null,
  updateCurrentGutka: () => { },
  isEditMode: null,
  toggleEditMode: () => { },
  currShabadID: null,
  updateCurrShabadID: () => { }
});
export const ViewerContext = React.createContext({
  gurmukhiSize: null,
  translationSize: null,
  translitSize: null,
  updateFontSize: () => { },
  displayEngTransl: null,
  displayPunTansl: null,
  displayTranslit: null,
  updateDisplay: () => { },
})
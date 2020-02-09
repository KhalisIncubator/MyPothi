import React, { useState } from 'react';
import { storedGutka, entryObj, gutkaEntry } from '../Config/types';
import { IGutkaCtx, IGlobalCtx, IViewerCtx } from '../Config/interfaces';
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


export const GutkaContext = React.createContext<IGutkaCtx>({
  gutkas: [],
  createGutka: () => { },
  currentItems: [],
  removeFromGutka: () => { },
  addToGutka: () => { },
  isDataReady: false,
})
export const GlobalContext = React.createContext<IGlobalCtx>({
  currentName: 'Loading...',
  updateCurrentGutka: () => { },
  isEditMode: false,
  toggleEditMode: () => { },
  currShabadID: 0,
  updateCurrShabadID: () => { }
});
export const ViewerContext = React.createContext<IViewerCtx>({
  gurmukhiSize: 12,
  translSize: 12,
  translitSize: 12,
  updateFontSize: () => { },
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,
  updateDisplay: () => { },
})
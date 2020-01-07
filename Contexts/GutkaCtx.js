import React, { useState } from 'react';

const GutkaContext = React.createContext();

const GutkaProvider = (props) => {

  // anything to do with fetching on startup
  const [currGutka, setCurrGutka] = useState('Loading...');
  const [isFetchingFinished, updateFetchingStatus] = useState(false);
  const [gutkas, addToGutkas] = useState([]);

  const [currShabadID, setCurrShabadID] = useState(null);
  const [isEditMode, setMode] = useState(false);
  return (
    <GutkaContext.Provider
      value={{
        currGutka,
        setCurrGutka,
        gutkas,
        addToGutkas,
        isFetchingFinished,
        updateFetchingStatus,
        currShabadID,
        setCurrShabadID,
        isEditMode,
        setMode
      }}
    >
      {props.children}
    </GutkaContext.Provider>
  );
}

export {
  GutkaContext,
  GutkaProvider
}

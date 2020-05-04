import React, { createContext, useState } from 'react';

const KeyboardContext = createContext( null );


const KeyboardProvider = ( { children } ) => {
  const [ isKbVisible, toggleKb ] = useState( false );
  const [ text, updateText ] = useState( 'Kidda' );

  return (
    <KeyboardContext.Provider value={{
      isKbVisible,
      toggleKb,
      text,
      updateText,
    }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

const withKBProvider = ( Component ) => ( props ) => (
  <KeyboardProvider>
    <Component {...props} />
  </KeyboardProvider>
);
export default KeyboardProvider;

export { KeyboardContext, withKBProvider };

import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useCachedValue } from '../utils/Hooks'
import THEMES from '../utils/Themes'

type ProviderProps = {
  children: ReactNode,
}
const DEFAULT_THEME = 'light'
const ThemeContext = createContext( { theme: THEMES[ DEFAULT_THEME ], setTheme: function( theme: keyof typeof THEMES ){} } )


const ThemeProvider: React.FC<ProviderProps> = ( { children } ) => {
  const [ themeName, setTheme ] = useCachedValue<keyof typeof THEMES>( '@theme', DEFAULT_THEME )
  const [ theme, updateTheme ] = useState( THEMES[ DEFAULT_THEME ] )

  useEffect( () => {
    updateTheme( THEMES[ themeName ] )
  }, [ themeName ] )

  return (
    <ThemeContext.Provider value ={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }

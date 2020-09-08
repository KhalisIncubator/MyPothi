import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useCachedValue } from '../utils/Hooks'
import THEMES, { Theme } from '../utils/Themes'
import { update } from 'lodash'

type ProviderProps = {
  children: ReactNode,
}
const ThemeContext = createContext( null )

const DEFAULT_THEME = 'light'

const ThemeProvider: React.FC<ProviderProps> = ( { children } ) => {
  const [ themeName, setTheme ] = useCachedValue( '@theme', DEFAULT_THEME )
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

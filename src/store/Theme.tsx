import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { CacheValueUpdater, useCachedValue } from '../utils/Hooks'
import THEMES, { Theme } from '../utils/Themes'

type ProviderProps = {
  children: ReactNode,
}
const DEFAULT_THEME = 'light'
type ThemeCtx = {
  theme: Theme,
  setTheme: CacheValueUpdater<keyof typeof THEMES>
}
const ThemeContext = createContext<ThemeCtx | null>( null )


const ThemeProvider: React.FC<ProviderProps> = ( { children } ) => {
  const [ themeName, setTheme ] = useCachedValue<keyof typeof THEMES>( '@theme', DEFAULT_THEME )
  const [ theme, updateTheme ] = useState<Theme>( THEMES[ DEFAULT_THEME ] )

  useEffect( () => {
    updateTheme( THEMES[ themeName ] )
  }, [ themeName ] )

  return (
    <ThemeContext.Provider value ={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

const useTheme = (): [Theme, CacheValueUpdater<keyof typeof THEMES>] => {
  const { theme, setTheme } = useContext( ThemeContext )!
  return [ theme, setTheme ]
}

export { ThemeProvider, ThemeContext, useTheme }

import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { useSettings } from './Settings'
import THEMES, { Theme } from 'utils/Themes'

type ProviderProps = {
  children: ReactNode,
}
const DEFAULT_THEME = 'light'
type ThemeCtx = {
  theme: Theme,
  setTheme: ( theme: keyof typeof THEMES ) => void,
}
const ThemeContext = createContext<ThemeCtx | null>( null )


const ThemeProvider: React.FC<ProviderProps> = ( { children } ) => {
  const { themeSettings, updateSettings } = useSettings()
  const [ theme, updateTheme ] = useState<Theme>( THEMES[ DEFAULT_THEME ] )

  const setTheme = ( theme: keyof typeof THEMES ) => {
    updateSettings( 'themeSettings', 'theme', theme )
  }

  useEffect( () => {
    updateTheme( THEMES[ themeSettings.theme as keyof typeof THEMES ] )
  }, [ themeSettings.theme ] )

  return (
    <ThemeContext.Provider value ={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

const useTheme = (): [Theme, ( theme: keyof typeof THEMES ) => void] => {
  const { theme, setTheme } = useContext( ThemeContext )!
  return [ theme, setTheme ]
}

export { ThemeProvider, ThemeContext, useTheme }

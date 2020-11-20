import React, { createContext, ReactNode, useContext } from 'react'
import { updateObject } from 'utils/Functions'
import { useCachedValue } from 'utils/Hooks'
import { DefaultGurbaniSettings, DefaultTranslationSettings, DefaultTranslitSettings, DefaultTeekaSettings, DefaultSourceSettigns, DefaultThemeSettings, TranslationKeys } from 'screens/Settings/DefaultSettings'

type SettingsCtxKeys = 'gurbaniSettings' | 'translationSettings' | 'translitSettings' | 'teekaSettings' | 'sourceSettings' | "themeSettings"

export type SettingsCtx = {
  gurbaniSettings: typeof DefaultGurbaniSettings,
  translationSettings: typeof DefaultTranslationSettings,
  translitSettings: typeof DefaultTranslitSettings,
  teekaSettings: typeof DefaultTeekaSettings, 
  sourceSettings: typeof DefaultSourceSettigns,
  themeSettings: typeof DefaultThemeSettings,
  updateSettings: ( section: SettingsCtxKeys , path: string, value: any ) => void
}
const SettingsContext = createContext<SettingsCtx | null>( null )

const SettingsProvider = ( { children }: {children: ReactNode} ) => { 
  const [ gurbaniSettings, setGurbaniSettings ] = useCachedValue( '@settings-gurbaniSettings', DefaultGurbaniSettings )
  const [ translationSettings, setTranslationSettings ] = useCachedValue( '@settings-translationSettings', DefaultTranslationSettings )
  const [ translitSettings, setTranslitSettings ] = useCachedValue( '@settings-translitSettings', DefaultTranslitSettings )
  const [ teekaSettings, setTeekaSettings ] = useCachedValue( '@settings-teekaSettings', DefaultTeekaSettings )
  const [ sourceSettings, setSourceSettings ] = useCachedValue( '@settings-sourcesettings', DefaultSourceSettigns )
  const [ themeSettings, setThemeSettings ] = useCachedValue( '@settings-themeSettings', DefaultThemeSettings )

  const updateSettings =  ( section: SettingsCtxKeys, path: string, value: any ) => {
    switch( section ) {
      case 'gurbaniSettings': 
        setGurbaniSettings( updateObject( path, value, gurbaniSettings ) )
        break
      case 'translationSettings':
        setTranslationSettings( updateObject( path, value, translationSettings ) )
        break
      case 'translitSettings':
        setTranslitSettings( updateObject( path, value, translitSettings ) )
        break
      case 'teekaSettings':
        setTeekaSettings( updateObject( path, value, teekaSettings ) )
        break
      case 'sourceSettings':
        setSourceSettings( updateObject( path, value, sourceSettings ) )
        break
      case "themeSettings":
        setThemeSettings( updateObject( path, value, themeSettings ) )
        break
      default : { }
    }
  }

  return (
    <SettingsContext.Provider value={{
      gurbaniSettings,
      translationSettings,
      translitSettings,
      teekaSettings,
      sourceSettings,
      themeSettings,
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): SettingsCtx => useContext( SettingsContext )!
const useSettingsValues = (): [typeof DefaultTranslationSettings, typeof DefaultTranslitSettings, typeof DefaultTeekaSettings] => {
  const { translationSettings, translitSettings, teekaSettings } = useContext( SettingsContext )!
  return [ translationSettings, translitSettings, teekaSettings ]
}

const useDisplaySettings = () => { 
  const { translationSettings, translitSettings, teekaSettings } = useSettings()

  return { ...translationSettings.English, ...translationSettings.Other, ...translitSettings, ...teekaSettings }
}

export { SettingsContext, SettingsProvider, useSettings, useDisplaySettings }

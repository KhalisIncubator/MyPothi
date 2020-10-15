import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { updateObject } from '../utils/Functions'
import { useCachedValue } from '../utils/Hooks'
import { DefaultGurbaniSettings, DefaultTranslationSettings, DefaultTranslitSettings, DefaultTeekaSettings, DefaultSourceSettigns } from '../utils/DefaultSettings'

type SettingsCtxKeys = 'gurbaniSettings' | 'translationSettings' | 'translitSettings' | 'teekaSettings' | 'sourceSettings' | "test"

export type SettingsCtx = {
  gurbaniSettings: typeof DefaultGurbaniSettings,
  translationSettings: typeof DefaultTranslationSettings,
  translitSettings: typeof DefaultTranslitSettings,
  teekaSettings: typeof DefaultTeekaSettings, 
  sourceSettings: typeof DefaultSourceSettigns,
  updateSettings: ( section: SettingsCtxKeys , path: string, value: any ) => void
}
const SettingsContext = createContext<SettingsCtx | null>( null )

const SettingsProvider = ( { children }: {children: ReactNode} ) => { 
  const [ gurbaniSettings, setGurbaniSettings ] = useCachedValue( '@settings-gurbaniSettings', DefaultGurbaniSettings )
  const [ translationSettings, setTranslationSettings ] = useCachedValue( '@settings-translationSettings', DefaultTranslationSettings )
  const [ translitSettings, setTranslitSettings ] = useCachedValue( '@settings-translitSettings', DefaultTranslitSettings )
  const [ teekaSettings, setTeekaSettings ] = useCachedValue( '@settings-teekaSettings', DefaultTeekaSettings )
  const [ sourceSettings, setSourceSettings ] = useCachedValue( '@settings-sourcesettings', DefaultSourceSettigns )

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
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): SettingsCtx => useContext( SettingsContext )!

export { SettingsContext, SettingsProvider, useSettings }

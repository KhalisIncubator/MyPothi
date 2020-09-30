import React, { createContext, ReactNode, useCallback, useContext } from 'react'
import { updateObject } from '../utils/Functions'
import { useCachedValue } from '../utils/Hooks'

const DefaulyDisplaySettings = {
  translations: {
    'en.bdb': true,
    'en.ms': false,
    'en.ssk': false,
    'es': false
  },
  translit: {
    'en': false,
    'hi': false,
    'ipa': false,
    'ur': false
  },
  teeka: {
    'pu.ss': false,
    'pu.ft': false,
    'pu.bdb': true,
    'pu.ms': false,
  }
}
type DisplaySettingsKeys = keyof typeof DefaulyDisplaySettings.translations | keyof typeof DefaulyDisplaySettings.translit | keyof typeof DefaulyDisplaySettings.teeka
const DefaultFontSettings = {
  gurmukhi: 16,
  tanslation: 12,
  translit: 12,
  teeka: 12
}

const DefaultSourceSettings = {
  vishraams: 'banidb',
  baniLen: 'long'
}

export type SettingsCtx = {
  // displaySettings: typeof DefaulyDisplaySettings,
  // fontSettings: typeof DefaultFontSettings,
  // sourceSettings: typeof DefaultSourceSettings,
  updateSettings: ( section: 'displaySettings' | 'fontSettings' | 'sourceSettings', key: any, value: any ) => void
}
const SettingsContext = createContext<SettingsCtx | null>( null )

const SettingsProvider = ( { children }: {children: ReactNode} ) => { 
  // const [ displaySettings, setDisplaySettings ] = useCachedValue<typeof DefaulyDisplaySettings>( '@settings-display', DefaulyDisplaySettings )
  // const [ fontSettings, setFontSettings ] = useCachedValue<typeof DefaultFontSettings>( '@settings-font', DefaultFontSettings )
  // const [ sourceSettings, setSourceSettings ] = useCachedValue<typeof DefaultSourceSettings>( '@settings-source', DefaultSourceSettings )
  const [ testObj, setTestObj ] = useCachedValue( 'test', { test: 'moce' } )

  // const updateDisplaySettings = ( key: DisplaySettingsKeys, value: boolean ) => {
  //   setDisplaySettings( updateObject( key, value, displaySettings ) )
  // }
  // const updateFontSettings = ( key: keyof typeof DefaultFontSettings, value: number ) => {
  //   setFontSettings( { ...DefaultFontSettings, [ key ]: value } )
  // }
  // const updateSourceSettings = ( key: keyof typeof DefaultSourceSettings, value: typeof DefaultSourceSettings[typeof key] ) => {
  //   setSourceSettings( { ...DefaultSourceSettings, [ key ]: value } )
  // }

  const updateSettings = useCallback( ( section: 'displaySettings' | "fontSettings" | "sourceSettings", key: any, value: any ) => {
    switch( section ) {
      // case 'displaySettings': 
      //   updateDisplaySettings( key, value )
      //   break
      // case 'fontSettings':
      //   updateFontSettings( key, value )
      //   break
      // case 'sourceSettings':
      //   updateSourceSettings( key, value )
      //   break
      default : {}
    }
  }, [] )

  return (
    <SettingsContext.Provider value={{
      // displaySettings,
      // fontSettings,
      // sourceSettings,
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): SettingsCtx => useContext( SettingsContext )!

export { SettingsContext, SettingsProvider, useSettings }

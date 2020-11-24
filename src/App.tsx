/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import React, { useEffect } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import RNBootSplash from 'react-native-bootsplash'

import { MobileRoutes } from 'navigation/index'
import { ThemeProvider } from 'store/Theme'
import { SettingsProvider } from 'store/Settings'
import { localDatabase } from './database/LocalDatabase'
import { CurrentProvider } from 'store/Current'

const App = () => {
  useEffect( () => {
    if ( __DEV__ ) {
      RNAsyncStorageFlipper( AsyncStorage )
    }
    
    RNBootSplash.hide( { fade: true } )
  }, [] )
  return (
    <DatabaseProvider database={localDatabase}>
      <SettingsProvider >
        <ThemeProvider>
          <CurrentProvider>
            <MobileRoutes />
          </CurrentProvider>
        </ThemeProvider>
      </SettingsProvider>
    </DatabaseProvider>
  )
}

const ActionSheetConnectedApp = connectActionSheet( App )
const AppContainer = () => (
  <ActionSheetProvider>
    <ActionSheetConnectedApp />
  </ActionSheetProvider>
)
export default AppContainer

/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import React, { useEffect } from 'react'
import { localDatabase } from './database/LocalDatabase'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { MobileRoutes } from './navigation'
import { ThemeProvider } from './store/Theme'
import { SettingsProvider } from './store/Settings'

import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {
  useEffect( () => {
    if( __DEV__ ) {
      RNAsyncStorageFlipper( AsyncStorage )
    }
  }, [] )
  return (
    <ThemeProvider>
      <DatabaseProvider database={localDatabase}>
        <SettingsProvider >
          <MobileRoutes />
        </SettingsProvider>
      </DatabaseProvider>
  </ThemeProvider>
  )
}

const ActionSheetConnectedApp = connectActionSheet( App )
const AppContainer = () => (
  <ActionSheetProvider>
    <ActionSheetConnectedApp />
  </ActionSheetProvider>
)
export default AppContainer

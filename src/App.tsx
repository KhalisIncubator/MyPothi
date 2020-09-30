/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import React from 'react'
import { localDatabase } from './database/LocalDatabase'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { MobileRoutes } from './navigation'
import { ThemeProvider } from './store/Theme'
import { SettingsProvider } from './store/Settings'

const App = () => {
  return (
    <ThemeProvider>
      <DatabaseProvider database={localDatabase}>
          <MobileRoutes />
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

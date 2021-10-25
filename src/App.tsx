/**
 * Sample React Native App
 * https://github.com/facebook/react-native
   *
 * @format
 * @flow strict-local
 TODO: UDPATE TO RN 0.66
 */

 import React, { useEffect } from 'React'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import DripsyProvider from 'dripsy'
import { database } from 'db/database'
import { theme } from 'utils/theme'

const App = () => {
  useEffect( () => {
    RNAsyncStorageFlipper( AsyncStorage )
  }, [] )

  return (
    <DatabaseProvider database={database}> 
    <DripsyProvider theme={theme}>
      </DripsyProvider>
    </DatabaseProvider>
  )
}

export default App


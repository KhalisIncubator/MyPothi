/**
 * Sample React Native App
 * https://github.com/facebook/react-native
   *
 * @format
 * @flow strict-local
 */

 import { useEffect } from 'React'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import DripsyProvider from 'dripsy'
import { database } from 'db/database'

const App = () => {
  useEffect( () => {
    RNAsyncStorageFlipper( AsyncStorage )
  }, [] )

  return (
    <DatabaseProvider database={database}> 
      <DripsyProvider>
      </DripsyProvider>
    </DatabaseProvider>
  )
}

export default App


import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import lodash from 'lodash'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import {deepCompareObjectKeys} from 'utils/deep-compare-object-keys'

export type PersistedValueUpdater<T> = ( (newValue: T) => Promise<void> ) 
const usePersist = <T>( key: string, initialValue: T ): [T, PersistedValueUpdater<T>] => {
  const [ value, setValue ] = useState<T>( initialValue ) 

  // this is for when the data is an obj or array (useEffect cant compare)
  useDeepCompareEffectNoCheck( () => {
    AsyncStorage.getItem( key ).then( async ( storedValue ) => {
        if ( !storedValue ) {
          await AsyncStorage.setItem( key, JSON.stringify( initialValue ) )
        } else {
          const parsedValue: T = JSON.parse( storedValue )
          if (!deepCompareObjectKeys(initialValue, parsedValue)) {
            const merged = lodash.merge(initialValue, parsedValue)
            await AsyncStorage.setItem( key, JSON.stringify( initialValue ) )
          } else {
            setValue(parsedValue )
          } 
        }
      } )
  }, [ initialValue, key ] )

  const cacheNewValue = async ( newValue: T ) => {
    await AsyncStorage.setItem( key, JSON.stringify( newValue ) )
    if ( typeof newValue === 'object' ) {
      setValue( prev => ( { ...prev, ...newValue } ) )
    } else {
      setValue( newValue )
    }
  }
  return [ value, cacheNewValue ]
}

export { usePersist }

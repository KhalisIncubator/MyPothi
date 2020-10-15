import { useState, useEffect  } from 'react'
import { useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Clause } from '@nozbe/watermelondb/QueryDescription'
import { TableNames, TableType } from '../database/LocalDatabase'
const useIsTablet = () => {
  const dimensions = useWindowDimensions()
  return [ dimensions.width > 900 ]
}

const useToggle = ( initialValue?: boolean ): [boolean, ( newValue?: boolean ) => void] => {
  const [ isToggled, setToggle ] = useState<boolean>( initialValue !== undefined ? initialValue : false )
  const updateToggle = ( newValue?: boolean ) => {setToggle( prev => newValue ?? !prev )}
  return [ isToggled, updateToggle ]
}

export type CacheValueUpdater<T> = ( ( newValue: T ) => Promise<void> )
const useCachedValue = <T>( key: string, initialValue: T ): [T, CacheValueUpdater<T>] => {
  const [ value, updateValue ] = useState<T>( initialValue ) 

  // this is for when the data is an obj or array (useEffect cant compare)
  useDeepCompareEffectNoCheck( () => {
    let cancel = false
    !cancel &&  AsyncStorage.getItem( key ).then( async ( storedValue ) => {
        if ( !storedValue ) {
          await AsyncStorage.setItem( key, JSON.stringify( initialValue ) )
        }else {
          const parsedValue: T = JSON.parse( storedValue )
          updateValue( parsedValue )
        }
      } )
    return () => {
      cancel = true
    }
  }, [ initialValue, key ] )

  const cacheNewValue = async ( newValue: T ) => {
    await AsyncStorage.setItem( key, JSON.stringify( newValue ) )
    console.log( 'i set the value bor' )
    updateValue( newValue )
  }

  useEffect( () => {
    console.log( 'this changed' )
  }, [ value ] )
  return [ value, cacheNewValue ]
}

const useQuery = <K extends TableNames>( tableName: K, Q?: Clause[], dependencies: any[] = [] ): [
  TableType<K>[],
  ( fields: Partial<TableType<K>> ) => Promise<void>,
  ( id: string ) => Promise<void>,
  ( item: TableType<K>, fields: Partial<TableType<K>> ) => Promise<void>
] => {
  const database = useDatabase()
  const column = database.collections.get<TableType<K>>( tableName.toString() ) 
  const [ result, updateResult ] = useState<TableType<K>[]>( [] )
  useEffect( () => {
    const query = !!Q ? column.query( ...Q ) : column.query()
    const subscription = query.observe().subscribe( updateResult )

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies )
  const createRow = async( fields: Partial<TableType<K>> ) => {
    await database.action( async () => {
      const newRow:TableType<K> = await column.create( row => {
        Object.entries( fields ).forEach( ( [ key, value ] ) => {
          row[ key ] = value
        } )
      } )
    } )
  }
  const deleteRow = async ( id: string ) => {
    const item = await column.find( id )
    await database.action( async() => {
      await item.destroyPermanently()
    } )
  }
  const updateItem = async( item: TableType<K>, fields: Partial<TableType<K>> ) => {
    await database.action( async () => {
      if ( !!item ) {
        item.update( ( record: TableType<K> ) => {
          Object.entries( fields ).forEach( ( [ key, value ] ) => {
          record[ key ] = value
        } )
      } )

      }
    } )
  
  }
  
  return [ result, createRow, deleteRow, updateItem ]
}

export { useIsTablet, useCachedValue, useQuery, useToggle }

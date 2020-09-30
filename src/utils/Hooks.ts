import { useState, useEffect, useContext, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Clause } from '@nozbe/watermelondb/QueryDescription'
import deepEqual from 'deep-equal'

import { TableNames, TableType } from '../database/LocalDatabase'
import { never } from 'rxjs'
const useIsTablet = () => {
  const dimensions = useWindowDimensions()
  return [ dimensions.width > 900 ]
}

const useToggle = ( initialValue?: boolean ): [boolean, ( newValue?: boolean ) => void] => {
  const [ isToggled, setToggle ] = useState<boolean>( initialValue ?? false )
  const updateToggle = ( newValue?: boolean ) => {setToggle( prev => newValue ?? !prev )}
  return [ isToggled, updateToggle ]
}

export type CacheValueUpdater<T> = ( ( newValue: T ) => Promise<void> )
const useCachedValue = <T>( key: string, initialValue: T ): [T, CacheValueUpdater<T>] => {
  const [ value, updateValue ] = useState<T>( initialValue ) 
  const { getItem, setItem } = useAsyncStorage( key )

  useEffect( () => {
    let cancel = false
    console.log( 'running...' )
    const setValue = async () => {
      const cachedVal = await getItem()
      console.log( cachedVal, !cachedVal )
      if ( !cachedVal ) {
       await setItem( JSON.stringify( initialValue ) )
      } else {
        updateValue( JSON.parse( cachedVal ) )
      }
    }
    !cancel && setValue()
    return () => {
      cancel = true
    }
  }, [ deepEqual( initialValue ), getItem, setItem  ] )

  const cacheNewValue = async ( newValue: T ) => {
    await setItem( JSON.stringify( newValue ) )
    updateValue( newValue )
  }
  return [ value, cacheNewValue ]

}

const useExpCachedValueUpdater = <T>( key: string, initialValue: T ): [T] => {
  const [ value, updateValue ] = useState<T | null>( null ) 
  const { getItem, setItem } = useAsyncStorage( key )

  const getValue = useCallback( async( key, initialValue: T ) => {
    const item = await getItem()
    const value: T = !!item ? JSON.parse( item ): initialValue
    updateValue( value )
  }, [] )

  useEffect( () => {
      getValue( key, initialValue )
  }, [ initialValue, key, getValue ] )

  return [ value ]
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

export { useIsTablet, useCachedValue, useQuery, useToggle, useExpCachedValueUpdater }

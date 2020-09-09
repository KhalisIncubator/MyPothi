import { useWindowDimensions } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../store/Theme'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import themes from './Themes' 
import { Columns } from '../database/LocalDatabase'
const useIsTablet = () => {
  const dimensions = useWindowDimensions()
  return [ dimensions.width > 900 ]
}

const useCachedValue = ( key:string, initialValue: string ): [string, ( name: string ) => void] => {
  const [ value, updateValue ] = useState( initialValue )
  const { getItem, setItem } = useAsyncStorage( key )

  useEffect( () => {
    const setValue = async () => {
      let cachedVal = await getItem()

      if ( !cachedVal ) {
       await setItem( initialValue )
       cachedVal = initialValue
      }

      updateValue( cachedVal )
    }
    setValue()
  }, [ getItem, initialValue, setItem ] )
  const cacheNewValue = async ( newValue: string ) => {
    await setItem( newValue )
    updateValue( newValue )

  }
  return [ value, cacheNewValue ]

}

const useTheme = () => {
  const { theme, setTheme } = useContext( ThemeContext )
  return [ theme, setTheme ]
}

const useQuery: {<K extends keyof Columns>( column: K ): [Columns[K][], ( any ) => void]} = ( columnName, dependencies = [] ) => {
  const database = useDatabase()
  const column = database.collections.get( columnName )
  const [ result, updateResult ] = useState( [] )
  useEffect( () => {
    const subscription = column.query().observe().subscribe( updateResult )

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies )
  const createNew = async( fields ) => {
    await database.action( async () => {
      const newRow = await column.create( row => {
        Object.entries( fields ).forEach( ( [ key, value ] ) => {
          row[ key ] = value
        } )
      } )
    } )
  }
  

  return [ result, createNew ]
}

export { useIsTablet, useCachedValue, useTheme, useQuery }

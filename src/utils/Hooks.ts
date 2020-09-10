import { useWindowDimensions } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../store/Theme'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Theme } from './Themes'
import { Columns } from '../database/LocalDatabase'
import { Pothi } from '../database/Models'
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

const useTheme = (): [Theme, ( theme: string ) => void] => {
  const { theme, setTheme } = useContext( ThemeContext )
  return [ theme, setTheme ]
}

const useQuery:
   {
     <K extends keyof Columns>( columnName: K ): 
      [Columns[K][], (any) => {}, (any)=> {}] }  
   = ( columnName, dependencies = [] ) => {
  const database = useDatabase()
  const column = database.collections.get<Columns[typeof columnName]>( columnName )
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
  const deleteRecord = async ( id ) => {
    const pothi = await column.find( id )
    await database.action( async() => {
      await pothi.destroyPermanently()
    } )
  }
  

  return [ result, createNew, deleteRecord ]
}

export { useIsTablet, useCachedValue, useTheme, useQuery }

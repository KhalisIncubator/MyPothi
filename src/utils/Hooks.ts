import { useWindowDimensions } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../store/Theme'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import themes, { Theme } from './Themes'
import { Columns } from '../database/LocalDatabase'
const useIsTablet = () => {
  const dimensions = useWindowDimensions()
  return [ dimensions.width > 900 ]
} 
const useCachedValue: {<T>(key: string, initialValue: T): [T, (newVal: T) => Promise<void>]} = ( key, initialValue) => {
  const [ value, updateValue ] = useState<typeof initialValue>( initialValue ) 
  const { getItem, setItem } = useAsyncStorage( key )
  useEffect( () => {
    const setValue = async () => {
      let cachedVal = await getItem()

      if ( !cachedVal ) {
       await setItem( JSON.stringify(initialValue) )
       cachedVal = JSON.stringify(initialValue)
      }
      const parsedVal: typeof initialValue = JSON.parse(cachedVal)
      updateValue(parsedVal)
    }
    setValue()
  }, [ getItem, initialValue, setItem ] )
  const cacheNewValue = async ( newValue: typeof initialValue ) => {
    await setItem( JSON.stringify(newValue) )
    updateValue( newValue )
  }
  return [ value, cacheNewValue ]

}

const useTheme = (): [Theme, ( theme: keyof typeof themes ) => void] => {
  const { theme, setTheme } = useContext( ThemeContext )
  return [ theme, setTheme ]
}

const useQuery: {
  <K extends keyof Columns>(columnName: K, dependencies?: any[]): 
  [Columns[K][], 
  (fields: Partial<Columns[K]>) => void, 
  (id: string) => void,
  (item: Columns[K], fields: Partial<Columns[K]>) => void ]
} = (columnName, dependencies = []) => {
  const database = useDatabase()
  type ColumnType = Columns[typeof columnName]
  const column = database.collections.get<ColumnType>( columnName.toString() )
  const [ result, updateResult ] = useState<ColumnType[]>([])
  useEffect( () => {
    const subscription = column.query().observe().subscribe(updateResult)

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies )
  const createRow = async(fields: Partial<Columns[typeof columnName]>) => {
    await database.action( async () => {
      const newRow = await column.create( row => {
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
  const updateItem = async( item: ColumnType, fields: Partial<ColumnType>) => {
    await database.action( async () => {
      if ( item ) {
        item.update( ( record) => {
          Object.entries( fields ).forEach( ( [ key, value ] ) => {
          record[ key ] = value
        } )
      } )

      }
    } )
  
  }
  
  return [ result, createRow, deleteRow, updateItem ]
}

export { useIsTablet, useCachedValue, useTheme, useQuery }

import { useWindowDimensions } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../store/Theme'
import { useNavigation } from '@react-navigation/native'

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
  }, [] )
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

export { useIsTablet, useCachedValue, useTheme }

import { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Clause } from '@nozbe/watermelondb/QueryDescription'
import { Observable } from 'rxjs'
import { Pothi, Shabad } from 'database/Models '

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
  const [ value, setValue ] = useState<T>( initialValue )

  // this is for when the data is an obj or array (useEffect cant compare)
  useDeepCompareEffectNoCheck( () => {
    AsyncStorage.getItem( key ).then( async ( storedValue ) => {
      if ( !storedValue ) {
        await AsyncStorage.setItem( key, JSON.stringify( initialValue ) )
      } else {
        const parsedValue: T = JSON.parse( storedValue )
        setValue( parsedValue )
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

const usePothis = ( Q?: Clause[], dependencies: any[] = [] ):
  [Pothi[],
    ( title: string, shabads?: Shabad[] ) => Promise<void>,
    ( id: string ) => Promise<void>,
    ( item: Pothi, title: string ) => Promise<void>
  ] => {
  const [ pothis, updatePothis ] = useState<Pothi[]>( [] )
  const database = useDatabase()
  const column = database.collections.get<Pothi>( 'pothis' )
  useEffect( () => {
    const query = !!Q ? column.query( ...Q ) : column.query()

    const subscription = query.observe().subscribe( updatePothis )

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies )

  const createPothi = async ( title: string, shabads: Shabad[] = [] ) => {
    await database.action( async () => {
      const newPothi = await column.create( newRow => {
        newRow.title = title
        newRow.shabads = shabads
      } )
    } )
  }

  const deletePothi = async ( id: string ) => {
    const pothi = await column.find( id )
    await database.action( async () => {
      await pothi.destroyPermanently()
    } )
  }
  const updatePothi = async ( item: Pothi, title: string ) => {
    if ( !!item ) {
      await database.action( async () => {
        await item.update( record => {
          record.title = title
        } )
      } )
    }
  }

  return [ pothis, createPothi, deletePothi, updatePothi ]
}

const useObservable = <T>( observable: ( ...args: any[] ) => Observable<T>, initialValue: T, dependencies: any[] = [] ) => {
  const [ state, setState ] = useState( initialValue )
  useEffect( () => {
    const sub = observable().subscribe( setState )
    return () => {
      sub.unsubscribe()
    }
  }, dependencies )
  return [ state ]
}

export { useIsTablet, useCachedValue, usePothis, useToggle, useObservable }

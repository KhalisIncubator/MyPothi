/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Pothi } from 'db/models'
import { useEffect, useState } from 'react'

export const usePothis = (): [
  Pothi[],
    ( fields: Partial<Pothi> ) => Promise<void>,
    ( id: string ) => Promise<void>,
    ( pothi: Pothi, fields: Partial<Pothi> ) => Promise<void>
]  => {
 const database = useDatabase() 

 const PothisColumn = database.collections.get<Pothi> ( 'pothis' )

 const [ result, updateResult ] = useState<Pothi[]>( [] )

 useEffect( () => {
   const subscription = PothisColumn.query().observe().subscribe( updateResult )


   return () => subscription.unsubscribe()

  }, [ PothisColumn ] )

  const createPothi = async( fields: Partial<Pothi> ) => {
    await database.action( async() => {
      const newPothi = await PothisColumn.create( newRow => {
        for( const keyValueSet in Object.entries( fields ) ) {
          const [ key, value ] = keyValueSet
          newRow[ key as any ] = value
        }
      } )
    } )
  
  }

  const deletePothi = async( id: string ) => {
    const pothi = await PothisColumn.find( id )
    await database.action( async() => {
      await pothi.destroyPermanently()
    } )
  }

  const updatePothi = async( pothi: Pothi, fields: Partial<Pothi> ) => {
    if( !!pothi ) {
      await database.action( async() => {
        await pothi.update( record => {
          for( const keyValueSet in Object.entries( fields ) ){
            const [ key, value ] = keyValueSet

            if( !( record[ key as any ] === value ) ) {
              record[ key as any ] = value
            }
          }
        } )
      } )
    }
  }


  return [ result, createPothi, deletePothi, updatePothi ]

}

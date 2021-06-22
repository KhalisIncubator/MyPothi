import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Pothi } from 'db/models'
import { useEffect, useState } from 'react'

export const usePothis = () => {
 const database = useDatabase() 

 const PothisColumn = database.collections.get<Pothi> ( 'pothis' )

 const [ result, updateResult ] = useState<Pothi[]>( [] )

 useEffect( () => {
   const subscription = PothisColumn.query().observe().subscribe( updateResult )


   return () => subscription.unsubscribe()

  }, [ PothisColumn ] )

  const createPothi = async( fields: Partial<Pothi> ) => {
    await database.action( async() => {
      const newRow: Pothi = await PothisColumn.create( row => {
          Object.entries ( fields ).forEach( ( [ key, value ] ) => {
            row[ key ] = value
          } )
      } )
    } )
  }
  const deletePothi = async( id: string ) => {
      const item = await column.find( id )
      await database.action( async() => {
      await item.destroyPermanently()
      } )
  }
  const updatePothi = async ( pothi: Pothi, fields: Partial<Pothi> ) => { 
    await database.action( async () => {
      if ( !!pothi ) {
        pothi.update( ( record: Pothi ) => {
          Object.entries( fields ).forEach( ( [ key, value ] ) => {
          record[ key ] = value
        } )
      } )

      }
    } )
  
  }


  return [ result, createPothi, deletePothi, updatePothi ]

}

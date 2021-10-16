import { useDatabase } from "@nozbe/watermelondb/hooks"
import { Shabad } from "db/models"
import { useEffect, useState } from "react"

export const useShabads = () => {
  const [ shabads, setShabads ] = useState<Shabad[]>( [] )
  const database = useDatabase()
  const column = database.collections.get<Shabad>( 'shabads' )
  useEffect( () => {
    const query = column.query()

    const subscription = query.observe().subscribe( setShabads )

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )


  return [ shabads ]
}
import { buildApiUrl } from '@sttm/banidb'

import { banisOrder } from '../Defaults'
import { baniLengths } from './DatabaseConts'
import { fromFetch } from 'rxjs/fetch'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

const remapBani = ( verseObj ) => {
  const { verse } = verseObj
}

const sortBani = ( firstBani, secondBani ) => banisOrder.indexOf( firstBani.ID ) - banisOrder.indexOf( secondBani.ID )


export {
  remapLine,
}

const query = ( query: string, searchType: number ) => {
  const API_URL = 'https://api.banidb.com/v2/'
  const MAX_RESULTS = 50

  if ( !!query ) {
    const q = searchType !== 4 ? query : undefined
    const url = encodeURI( buildApiUrl( {
      q,
      type: searchType,
      results: MAX_RESULTS,
      API_URL,
      ...( searchType === 4 && { ang: Number( query ) } )
    } ) )

    const data$ = fromFetch( url ).pipe( switchMap( ( res ) => res.json() ) )

    const results$ = data$.pipe(
      switchMap( x => of( x.verses ) ),
      map( ( x ) => {
        return x.map( result => ( {
          info: {
            source: result.source.gurmukhi,
            writer: result.writer.gurmukhi,
            raag: result.raag.gurmukhi
          },
          verse: {
            gurmukhi: result.verse.gurmukhi,
            translation: result.translation.en.bdb
          }
        } ) )
      } ),
    )

    return results$
  }

  return of( [] )
}
export { query }

import { buildApiUrl } from "@sttm/banidb"
import { Observable, of } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { fromFetch } from 'rxjs/fetch'
import { QueryVerse, RemappedQuery } from "types/BanidbApi"

export const query = ( query: string, searchType: number ): Observable<RemappedQuery[]> => {
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
        return x.map( ( result: QueryVerse ) => ( {
          info: {
            source: result.source.gurmukhi,
            writer: result.writer.gurmukhi,
            raag: result.raag.gurmukhi
          },
          verse: {
            gurmukhi: result.verse.gurmukhi,
            translation: result.translation.en.bdb,
            verseId: result.verseId,
            id: result.shabadId
          }
        } ) )
      } ),
    )

    return results$
  }

  return of( [] )
}
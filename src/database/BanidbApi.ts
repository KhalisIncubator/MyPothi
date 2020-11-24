import { buildApiUrl } from '@sttm/banidb'

import { banisOrder } from '../Defaults'
import { fromFetch } from 'rxjs/fetch'
import { map, switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { VerseElement, QueryVerse, Visraam, Verse, BaniVerse, ShabadResponse, BaniResponse } from 'utils/BaniDBTypes'


export type RemappedQueryInfo = {
  source: string | null,
  writer: string | null,
  raag: string | null
}
type RemappedQueryVerse = {
  gurmukhi: string,
  translation: string | null,
  id: number,
  verseId: number
}
export type RemappedQuery = {
  info: RemappedQueryInfo
  verse: RemappedQueryVerse
}
type RemappedVerse = {
  verseID: number,
  gurmukhi: string,
  translation: {
    en: {
      bdb?: string,
      ms?: string,
      ssk?: string
    },
    pu: {
      ss?: string,
      ft?: string,
      bdb?: string,
      ms?: string
    }
  },
  transliteration: {
    en: string,
    hi: string,
    ur: string,
    english: null,
    hindi: null,
    ipa: null
  },
  visraam: Visraam,
}

type RemappedInfo = {
  shabadID?: number,
  shabadName?: string,
  baniID?: number,
  baniName?: string,
  ang: number,
  raag: {
    id: number,
    name: string
  },
  writer: {
    id: number,
    name: string
  },
  source: {
    id: string,
    name: string
  }
}


const getShabadInfo = ( shabad: ShabadResponse ): RemappedInfo => {
  const { shabadInfo, verses } = shabad
  const { shabadId, shabadName, pageNo, source, raag, writer } = shabadInfo

  return {
    shabadID: shabadId,
    shabadName: verses.find( verse => verse.verseId === shabadName )?.verse?.gurmukhi ?? verses[ 0 ].verse.gurmukhi,
    ang: pageNo,
    source: {
      id: source.sourceId,
      name: source.gurmukhi
    },
    raag: {
      id: raag.raagId,
      name: raag.gurmukhi,
    },
    writer: {
      id: writer.writerId,
      name: writer.gurmukhi
    },
  }
}

const getBaniInfo = ( bani: BaniResponse ): RemappedInfo => {
  const { baniInfo: { baniID, gurmukhi, source, raag, writer } } = bani

  return {
    baniID,
    baniName: gurmukhi,
    ang: source.pageNo,
    source: {
      id: source.sourceId,
      name: source.gurmukhi
    },
    raag: {
      id: raag.raagId,
      name: raag.gurmukhi,
    },
    writer: {
      id: writer.writerId,
      name: writer.gurmukhi
    }
  }
}

const remapVerse = ( line: Verse | BaniVerse ): RemappedVerse => {
  const { verseId: verseID, verse, translation, transliteration, visraam } = line

  const punjabiTranslationAscii: {[key in keyof typeof translation.pu]?: string} = {}

  Object.keys( translation.pu ).forEach( ( key ) => {
    const translationKey = key as keyof typeof translation.pu
    punjabiTranslationAscii[ translationKey ] = translation.pu[ translationKey ].gurmukhi
  } )

  return {
    verseID,
    gurmukhi: verse.gurmukhi,
    translation: {
      ...translation,
      pu: {
        ...punjabiTranslationAscii

      }
    },
    transliteration: {
      ...transliteration,
      english: null,
      hindi: null,
      ipa: null
    },
    visraam,
  }
}
const remapShabad = ( shabad: ShabadResponse ): RemappedVerse[] => {
  return shabad.verses.map( remapVerse )
}
const remapBaniVerse = ( verseObj: VerseElement ): RemappedVerse => {
  const { verse } = verseObj
  return remapVerse( verse )
}
const remapBani = ( bani: BaniResponse ): RemappedVerse[] => {
  return bani.verses.map( remapBaniVerse )
}

const sortBani = ( firstBani: any, secondBani: any ) => banisOrder.indexOf( firstBani.ID ) - banisOrder.indexOf( secondBani.ID )

const query = ( query: string, searchType: number ): Observable<RemappedQuery[]> => {
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
export { query }

const fetchShabad = async ( id: number ): Promise<[RemappedInfo, RemappedVerse[]]> => {
  const API_URL = 'https://api.banidb.com/v2/'
  const url = encodeURI( buildApiUrl( {
    id,
    API_URL
  } ) )

  return fetch( url )
    .then( res => res.json() )
    .then( ( shabadRes: unknown ) => {
      const ResWithTypes = shabadRes as ShabadResponse
      return [ getShabadInfo( ResWithTypes ), remapShabad( ResWithTypes ) ]
    } )
}

const fetchBani = async ( id: number ): Promise<[RemappedInfo, RemappedVerse[]]> => {
  return fetch( `https://api.banidb.com/v2/banis/${id}` )
    .then( res => res.json() )
    .then( ( baniRes: unknown ) => {
      const ResWithTypes = baniRes as BaniResponse
      return [ getBaniInfo( ResWithTypes ), remapBani( ResWithTypes ) ]
    } )
}
export { fetchShabad, fetchBani, sortBani }

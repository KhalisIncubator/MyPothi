import { buildApiUrl } from '@sttm/banidb'

import { banisOrder } from '../Defaults'
import { baniLengths } from './DatabaseConts'
import { fromFetch } from 'rxjs/fetch'
import { combineAll, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

const shabadInfo = ( { shabadInfo: info, baniInfo } ) => {
  const { source, raag, writer } = info ?? baniInfo
  const sourceG = source.gurmukhi
  const raagG = raag.gurmukhi
  const writerG = writer.gurmukhi
  return {
    source: sourceG,
    raag: raagG,
    writer: writerG,
  }
}
const remapLine = ( raw ) => {
  const {
    verse, translation, transliteration, visraam,
  } = raw
  return {
    id: raw.verseId,
    sID: raw.shabadId,
    Gurbani: {
      ascii: verse.gurmukhi,
    },
    Translations: {
      English: translation.en.bdb,
      Punjabi: {
        SS: translation.pu.ss?.gurmukhi,
        FT: translation.pu.ft?.gurmukhi,
      },
      Spanish: translation.es?.sn,
    },
    Transliteration: {
      English: transliteration.en,
      Hindi: transliteration.hi,
      IPA: transliteration.ipa,
      UR: transliteration.ur,
    },
    Vishraams: {
      sttm: visraam?.sttm,
      ig: visraam?.igurbani,
      sttm2: visraam?.sttm2,
    },
  }
}

const remapBani = ( verseObj ) => {
  const { verse } = verseObj
  return remapLine( verse )
}

const sortBani = ( firstBani, secondBani ) => banisOrder.indexOf( firstBani.ID ) - banisOrder.indexOf( secondBani.ID )

const loadShabad = async ( id: number ) => {
  const API_URL = 'https://api.banidb.com/v2/'
  const url = encodeURI( buildApiUrl( {
    id,
    API_URL,
  } ) )
  return fetch( url )
    .then( ( res ) => res.json() )
    .then( ( data ) => [ shabadInfo( data ), data.verses.map( ( verse ) => remapLine( verse ) ) ] )
    .then( ( [ info, remapped ] ) => [ info, remapped.map( ( line ) => ( {
      data: JSON.stringify( line ),
      lineId: line.id,
    } ) ) ] )
    .catch( ( err ) => err )
}
const fetchBanis = async () => (
  fetch( 'https://api.banidb.com/v2/banis' )
    .then( ( res ) => res.json() )
    .then( ( data ): any[] => data.map( ( bani ) => bani ) )
    .then( ( banisArr ) => banisArr.sort( sortBani ) )
    .catch( ( err ) => err )
)

const loadBani = async ( id: number, length: lengthType ) => (
  fetch( `https://api.banidb.com/v2/banis/${id}` )
    .then( ( res ) => res.json() )
    .then( ( json ) => [ shabadInfo( json ), json.verses.filter( ( verse ) => verse.mangalPosition !== 'above' ) ] )
    .then( ( [ info, filtered ] ) => [ info, filtered.filter( ( verse ) => verse[ baniLengths[ length ] ] === 1 ) ] )
    .then( ( [ info, data ] ) => [ info, data.map( ( verse ) => remapBani( verse ) ) ] )
    .then( ( [ info, remapped ] ) => [ info, remapped.map( ( line ) => ( {
      data: JSON.stringify( line ),
      lineId: line.id,
    } ) ) ] )
    .catch( ( err ) => err ) )

const parseLines = async ( item: entryObj ) => {
  const linesArray = item.lines ? Array.from( {
    ...item.lines,
    length: Object.keys( item.lines ).length,
  } ) : []
  return Promise.resolve( linesArray.map( ( { data } ) => JSON.parse( data ) ) )
}
// because once again the realm returns the array as an object, we have to map to object

export {
  remapLine,
  loadShabad,
  fetchBanis,
  loadBani,
  parseLines,
  shabadInfo,
}

const query = ( query: string, searchType: number ) => {
 const API_URL = 'https://api.banidb.com/v2/'
 const MAX_RESULTS = 50

 if( !!query ) {
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
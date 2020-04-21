import { buildApiUrl } from '@sttm/banidb';
import { lengthType, entryObj, RemappedLine } from '../../types/types';
import { baniLengths } from './DatabaseConts';
import { banisOrder } from '../Defaults';


const shabadInfo = ( { shabadInfo: info, baniInfo } ) => {
  const { source, raag, writer } = info ?? baniInfo;
  const sourceG = source.gurmukhi;
  const raagG = raag.gurmukhi;
  const writerG = writer.gurmukhi;
  return {
    source: sourceG,
    raag: raagG,
    writer: writerG,
  };
};
const remapLine = ( raw ): RemappedLine => {
  const {
    verse, translation, transliteration, visraam,
  } = raw;
  return {
    id: raw.verseId,
    sID: raw.shabadId,
    Gurbani: {
      ascii: verse.gurmukhi,
      unicode: verse.unicode,
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
  };
};

const remapBani = ( verseObj ) => {
  const { verse } = verseObj;
  return remapLine( verse );
};
const query = async ( search: string, type: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const results = 50;
  if ( search !== '' ) {
    const q = type !== 4 ? search : null;
    const url = encodeURI( buildApiUrl( {
      q,
      type,
      results,
      API_URL,
      ang: type === 4 ? Number( search ) : null,
    } ) );

    return fetch( url )
      .then( ( response ) => response.json() )
      .then( ( data ) => data.verses )
      .then( ( verses ) => verses.map( ( v ) => [
        {
          source: v.source.gurmukhi,
          writer: v.writer.gurmukhi,
          raag: v.raag.gurmukhi,
        },
        v,
      ] ) )
      .catch( ( err ) => err );
  }
  return [ {} ];
};
const sortBani = ( firstBani, secondBani ) => banisOrder.indexOf( firstBani.ID ) - banisOrder.indexOf( secondBani.ID );

const loadShabad = async ( id: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const url = encodeURI( buildApiUrl( {
    id,
    API_URL,
  } ) );
  return fetch( url )
    .then( ( res ) => res.json() )
    .then( ( data ) => [ shabadInfo( data ), data.verses.map( ( verse ) => remapLine( verse ) ) ] )
    .then( ( [ info, remapped ] ) => [ info, remapped.map( ( line ) => ( {
      data: JSON.stringify( line ),
      lineId: line.id,
    } ) ) ] )
    .catch( ( err ) => err );
};
const fetchBanis = async () => (
  fetch( 'https://api.banidb.com/v2/banis' )
    .then( ( res ) => res.json() )
    .then( ( data ): any[] => data.map( ( bani ) => bani ) )
    .then( ( banisArr ) => banisArr.sort( sortBani ) )
    .catch( ( err ) => err )
);

const loadBani = async ( id: number, length: lengthType ) => (
  fetch( `https://api.banidb.com/v2/banis/${id}` )
    .then( ( res ) => res.json() )
    .then( ( json ) => [ shabadInfo( json ), json.verses.filter( ( verse ) => verse.mangalPosition !== 'above' ) ] )
    .then( ( [ info, filtered ] ) => [ info, filtered.filter( ( verse ) => verse[baniLengths[length]] === 1 ) ] )
    .then( ( [ info, data ] ) => [ info, data.map( ( verse ) => remapBani( verse ) ) ] )
    .then( ( [ info, remapped ] ) => [ info, remapped.map( ( line ) => ( {
      data: JSON.stringify( line ),
      lineId: line.id,
    } ) ) ] )
    .catch( ( err ) => err ) );

const parseLines = async ( item: entryObj ) => {
  const linesArray = item.lines ? Array.from( {
    ...item.lines,
    length: Object.keys( item.lines ).length,
  } ) : [];
  return Promise.resolve( linesArray.map( ( { data } ) => JSON.parse( data ) ) );
};
// because once again the realm returns the array as an object, we have to map to object
export default query;

export {
  remapLine, loadShabad, fetchBanis, loadBani, parseLines, shabadInfo,
};

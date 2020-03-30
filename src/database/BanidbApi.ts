import { buildApiUrl } from '@sttm/banidb';
import { lengthType, entryObj } from '../../types/types';
import { baniLengths } from './DatabaseConts';

const remapLine = ( raw ) => {
  const line = {} as any;
  line.id = raw.verseId;
  line.sID = raw.shabadId;
  line.Gurbani = {
    ascii: raw.verse.gurmukhi,
    unicode: raw.verse.unicode,
  };
  line.Translations = {
    English: raw.translation.en.bdb,
    Punjabi: {
      SS: raw.translation.pu.ss?.gurmukhi,
      FT: raw.translation.pu.ft?.gurmukhi,
    },
    Spanish: raw.translation.es?.sn,
  };
  line.Transliteration = {
    English: raw.transliteration.en,
    Hindi: raw.transliteration.hi,
  };
  line.Vishraams = {
    sttm: raw.visraam?.sttm,
    ig: raw.visraam?.igurbani,
    sttm2: raw.visraam?.sttm2,
  };
  return line;
};

const remapBani = ( verseObj ) => {
  const { verse } = verseObj;
  return remapLine( verse );
};
const query = async ( search: string, type: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const results = 50;
  if ( search !== '' ) {
    const q = search;
    const url = encodeURI( buildApiUrl( {
      q, type, results, API_URL,
    } ) );
    return fetch( url )
      .then( ( response ) => response.json() )
      .then( ( data ) => data.verses )
      .catch( ( err ) => err );
  }
  return [ {} ];
};

const loadShabad = async ( id: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const url = encodeURI( buildApiUrl( { id, API_URL } ) );
  return fetch( url )
    .then( ( res ) => res.json() )
    .then( ( data ) => ( data.verses.map( ( verse ) => remapLine( verse ) ) ) )
    .then( ( remapped ) => remapped.map( ( line ) => ( { data: JSON.stringify( line ), lineId: line.id } ) ) )
    .catch( ( err ) => err );
};
const fetchBanis = async () => (
  fetch( 'https://api.banidb.com/v2/banis' )
    .then( ( res ) => res.json() )
    .then( ( data ) => data.map( ( bani ) => bani ) )
    .catch( ( err ) => err )
);

const loadBani = async ( id: number, length: lengthType ) => (
  fetch( `https://api.banidb.com/v2/banis/${id}` )
    .then( ( res ) => res.json() )
    .then( ( json ) => json.verses.filter( ( verse ) => verse.mangalPosition !== 'above' ) )
    .then( ( filtered ) => filtered.filter( ( verse ) => verse[baniLengths[length]] === 1 ) )
    .then( ( data ) => data.map( ( verse ) => remapBani( verse ) ) )
    .then( ( remapped ) => remapped.map( ( line ) => ( { data: JSON.stringify( line ), lineId: line.id } ) ) )
    .catch( ( err ) => err ) );

const parseLines = async ( item: entryObj ) => {
  const linesArray = item.lines ? Array.from( { ...item.lines, length: Object.keys( item.lines ).length } ) : [];
  return Promise.resolve( linesArray.map( ( { data } ) => JSON.parse( data ) ) );
};
// because once again the realm returns the array as an object, we have to map to object
export default query;

export {
  remapLine, loadShabad, fetchBanis, loadBani, parseLines,
};

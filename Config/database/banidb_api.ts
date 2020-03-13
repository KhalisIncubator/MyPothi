import { buildApiUrl } from '@sttm/banidb';
import { Line } from '../dev_env/interfaces';

const remapLine = ( raw ) => {
  const line: Line = {} as any;
  line.id = raw.verseId;
  line.sID = raw.shabadId;
  line.Gurbani = {
    ascii: raw.verse.gurmukhi,
    unicode: raw.verse.unicode,
  };
  line.Translations = {
    English: raw.translation.en.bdb,
    Punjabi: {
      SS: raw.translation.pu.ss.gurmukhi,
      FT: raw.translation.pu.ft.gurmukhi,
    },
    Spanish: raw.translation.es.sn,
  };
  line.Transliteration = {
    English: raw.transliteration.en,
    Hindi: raw.transliteration.hi,
  };
  line.Vishraams = {
    sttm: raw.visraam.sttm,
    ig: raw.visraam.igurbani,
    sttm2: raw.visraam.sttm2,
  };
  return line;
};
const query = async ( search: string, type: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const results = 50;
  const shabads = [];
  if ( search !== '' ) {
    const q = search;
    const url = encodeURI( buildApiUrl( {
      q, type, results, API_URL,
    } ) );
    return fetch( url )
      .then( ( response ) => response.json() )
      .then( ( data ) => {
        data.verses.forEach( ( shabad ) => {
          shabads.push( shabad );
        } );
        return shabads;
      } )
      .catch( ( err ) => err );
  }
  return [ {} ];
};

const loadShabad = async ( id: number ) => {
  const API_URL = 'https://api.banidb.com/v2/';
  const url = encodeURI( buildApiUrl( { id, API_URL } ) );
  return fetch( url )
    .then( ( res ) => res.json() )
    .then( ( data ) => {
      const remapped = [];
      data.verses.forEach( ( pg ) => {
        remapped.push( remapLine( pg ) );
      } );
      return remapped;
    } )
    .catch( ( err ) => err );
};
export default query;

export { remapLine, loadShabad };

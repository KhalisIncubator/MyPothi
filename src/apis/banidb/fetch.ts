import { buildApiUrl } from "@sttm/banidb"
import { BaniResponse, RemappedInfo, RemappedVerse, ShabadResponse } from "types/BanidbApi"
import { getBaniInfo, getShabadInfo } from "./info"
import { remapBani, remapShabad } from "./remap"

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
export { fetchShabad, fetchBani }
export const deepCompareObjectKeys = ( base , toCompare ): boolean => { 
  let baseKeys = Object.keys( base )
  let compareKeys = Object.keys( base )

  // if shallow compare results in different lenghts, then don't do any complicated 
  // execution, they're just not the same
  if ( baseKeys.length !== compareKeys.length ) return false

  baseKeys = setNestedKeys( baseKeys, base )
  compareKeys = setNestedKeys( compareKeys, toCompare )

  return arrayEquals( baseKeys, compareKeys )

} 

const arrayEquals = ( a: any[],b: any[] ): boolean => {
  return Array.isArray( a ) && Array.isArray( b ) && a.length === b.length && a.every( ( val, index ) => {
    if( Array.isArray( val ) ) {
      return arrayEquals( val, b[ index ] )
    }
    return val === b[ index ]
  } )
}

const setNestedKeys = ( firstLayerKeyArray, obj ) => {
  return firstLayerKeyArray.map( ( key, index ) => {
    if( typeof obj[ key ] === "object" ) {
      return Object.keys( object[ key ] )
    }
    return key
  } )
}



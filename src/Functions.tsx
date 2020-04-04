import { getModWithParent } from './database/LocalDatabase';
import { Modification } from '../types/types';
// bug with realm where on first load this stuff is not an array for some reason
const mapToArray = ( obj ): Modification[] => ( obj ? Array.from( { ...obj, length: Object.keys( obj ).length } ) : [] );
export default mapToArray;

const mapVishraams = ( line: string, apiValue: object, source: string ) => {
  const sourceVishraams = apiValue[source];
  const indeces = sourceVishraams.map( ( { p } ) => p );
  const parsedLines = line.split( ' ' ).reduce( ( phrases, word, index ) => {
    const isIndexed = indeces.includes( index );
    const previousSections = phrases.slice( 0, phrases.length - 1 ); // everything before
    const currentSection = phrases[phrases.length - 1]; // current section we are editing
    // If is in index, group the word separately, and begin new section
    if ( isIndexed ) {
      return [
        ...( previousSections || [] ),
        currentSection,
        { type: sourceVishraams[indeces.indexOf( index )].t, data: word },
        { type: null, data: null } ];
    }
    // else Add on to the end of the current phrase
    const nextSection = currentSection ? (
      {
        ...currentSection,
        type: 'line',
        data: currentSection?.data?.concat( ` ${word}` ) ?? word,
      }
    )
      : (
        {
          type: 'line',
          data: word,
        }
      );

    return [ ...previousSections, nextSection ];
  }, [] );
  // return (and filter out undefined or null data stuff (null caused by a vishram followed by another vishraam))
  return indeces.length
    ? parsedLines.filter( ( section ) => section !== undefined && section.data )
    : [ { type: 'line', data: line } ];
};
export { mapVishraams };
// get current font size on selected element
const getCurrentFontSize = ( [ lineid, element, parentID ], globalFontSize ) => {
  if ( lineid && element && parentID ) {
    return getModWithParent( lineid, element, parentID )?.fontSize
 ?? globalFontSize;
  }
  return null;
};
export { getCurrentFontSize };

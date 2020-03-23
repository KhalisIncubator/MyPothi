import { getModWithParent } from './database/local_database';
// bug with realm where on first load this stuff is not an array for some reason

const mapModsToArray = ( mods ) => ( mods ? Array.from( { ...mods, length: Object.keys( mods ).length } ) : [] );

const mapToArray = ( obj ) => ( obj ? Array.from( { ...obj, length: Object.keys( obj ).length } ) : [] );

export default mapToArray;
// get current font size on selected element
const getCurrentFontSize = ( [ lineid, element, parentID ], globalFontSize ) => {
  if ( lineid && element && parentID ) {
    return getModWithParent( lineid, element, parentID )?.fontSize
 ?? globalFontSize;
  }
  return null;
};
export { mapModsToArray, getCurrentFontSize };

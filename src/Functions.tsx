import { getModWithParent } from './database/LocalDatabase';
// bug with realm where on first load this stuff is not an array for some reason


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
export { getCurrentFontSize };

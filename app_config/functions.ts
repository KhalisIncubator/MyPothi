// bug with realm where on first load this stuff is not an array for some reason

const mapModsToArray = ( mods ) => Array.from( { ...mods, length: Object.keys( mods ).length } );


export { mapModsToArray };

const updateObject = <ObjectType, Value>( objPath: string, newValue: Value, obj: ObjectType ) => {
  const clonedObj = obj

  const splitPath = objPath.split( '/' )

  splitPath.reduce( ( traversedObj, nextPathKey, indx ) => {
    if ( indx === splitPath.length - 1 ) {
      traversedObj[ nextPathKey ] = newValue
    }
    // @ts-expect-error this is because i swear all these iterators return typeof string as the key, and you cant change it :(
    if ( !!traversedObj && traversedObj[ nextPathKey ] ) {
      return traversedObj[ nextPathKey ]
    }
    return traversedObj
  }, clonedObj )
  return clonedObj
}

export { updateObject }

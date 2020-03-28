import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import ShimmeringLine from './ShimmeringBlock';

const Skeleton = ( ) => {
  const amountLines = useWindowDimensions().height / 100;
  const [ lines, updateLines ] = useState( [] );
  useEffect( () => {
    console.log( 'here' );
  } );
  useLayoutEffect( () => {
    const temp = [];
    for ( let i = 0; i < amountLines; i++ ) {
      temp.push( <ShimmeringLine /> );
    }
    updateLines( temp );
  }, [ amountLines ] );
  return (
    <>
   {lines}
    </>
  );
};

export default Skeleton;

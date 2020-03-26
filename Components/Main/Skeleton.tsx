import React from 'react';
import { useWindowDimensions } from 'react-native';
import ShimmeringLine from './ShimmeringBlock';

const Skeleton = ( ) => {
  const amountLines = useWindowDimensions().height / 100;
  console.log( amountLines );
  return (
    <ShimmeringLine />
  );
};

export default Skeleton;

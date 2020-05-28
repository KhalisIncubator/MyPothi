import React from 'react';
import { Code } from 'react-content-loader/native';
import { StyleSheet } from 'react-native';

const ShimmeringLine = () => (
  <Code
    style={style.View}
    backgroundColor="#ababab"
    foregroundColor="#c9c9c9"
  />
);

const style = StyleSheet.create( {
  View: {
    alignContent: 'center',
    margin: 5,
  },
} );
export default ShimmeringLine;

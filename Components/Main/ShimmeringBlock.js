import React from 'react';
import {
  StyleSheet
} from 'react-native';

// import Shimmer from 'react-native-shimmer';
import { Code } from 'react-content-loader/native'
const ShimmeringLine = () => <Code
  style={style.View}
  backgroundColor="#ababab"
  foregroundColor="#c9c9c9"
/>;

const style = StyleSheet.create({
  View: {
    margin: 5,
    alignContent: 'center'
  }
})
export default ShimmeringLine;
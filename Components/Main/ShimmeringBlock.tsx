import React from 'react';
import { StyleSheet } from 'react-native';

import ContentLoader, { Rect } from 'react-content-loader/native';

const ShimmeringLine = () => (
  <ContentLoader
    speed={2}
    style={style.View}
    width={400}
    height={100}
    viewBox="0 0 400 100"
    backgroundColor="#808080"
    foregroundColor="#d9d9d9"
  >
    <Rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
    <Rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
    <Rect x="0" y="48" rx="3" ry="3" width="53" height="11" />
    <Rect x="65" y="48" rx="3" ry="3" width="72" height="11" />
    <Rect x="60" y="71" rx="3" ry="3" width="100" height="11" />
    <Rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
    <Rect x="0" y="23" rx="3" ry="3" width="140" height="11" />
    <Rect x="155" y="23" rx="3" ry="3" width="173" height="11" />
  </ContentLoader>
);

const style = StyleSheet.create( {
  View: {
    alignContent: 'center',
    margin: 5,
  },
} );
export default ShimmeringLine;

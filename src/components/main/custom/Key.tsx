import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';


const Key = ( { akhar, textStyle = {}, viewStyle = {} } ) => (
  <View key={akhar} style={[ styles.Key, viewStyle ]}>
    <Text
      style={textStyle}
    >
      {akhar}
    </Text>
  </View>
);

const CustomIconKey = ( { icon, style = {} } ) => (
  <View key={icon} style={[ styles.Key, style, { padding: 3 } ]}>
    <Icon size={20} name={icon} />
  </View>
);
const Spacer = ( { spaces, bgColor } ) => (
  <View style={[
    styles.Spacer,
    {
      backgroundColor: bgColor,
      flex: spaces,
    } ]}
  />
);
const SpaceBar = ( ) => (
  <View style={styles.SpaceBar}>
    <Text style={{
      fontSize: 20,
      padding: 3,
    }}
    >
      Space
    </Text>
  </View>
);
const styles = StyleSheet.create( {
  Key: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingTop: 2,
  },
  SpaceBar: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 8,
    marginHorizontal: 4,
    paddingTop: 2,
  },
  Spacer: {
    borderRadius: 8,
    flex: 8,
    marginHorizontal: 4,
    paddingTop: 2,

  },
} );
export default Key;

export { SpaceBar, CustomIconKey, Spacer };

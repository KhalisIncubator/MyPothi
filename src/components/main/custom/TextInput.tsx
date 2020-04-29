import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Cursor from './Cursor';

const TextInput = ( props ) => {
  const { style, value, isActive } = props;


  return (
    <View>
      <Text>
        <Text>{value}</Text>
        {isActive && <Cursor style={style} /> }
      </Text>
    </View>
  );
};

export default TextInput;

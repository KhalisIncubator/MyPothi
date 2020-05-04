import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Cursor from './Cursor';
import { KeyboardContext } from './Controller';

const TextInput = ( props ) => {
  const { style, value, isActive } = props;

  const controller = useContext( KeyboardContext );
  return (
    <View>
      <Text>
        <Text>{controller.text}</Text>
        {isActive && <Cursor style={style} /> }
      </Text>
    </View>
  );
};

export default TextInput;

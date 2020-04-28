/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardContext } from './Controller';

const leftCol = [
  [ 'a', 'A', 'e', 's', 'h' ],
  [ 'k', 'K', 'g', 'G', '|' ],
  [ 'c', 'C', 'j', 'J', '\\' ],
  [ 't', 'T', 'f', 'F', 'x' ],
  [ 'q', 'Q', 'd', 'D', 'n' ],
  [ 'p', 'P', 'b', 'B', 'm' ],
  [ 'X', 'r', 'l', 'v', 'V' ],
];
const Keyboard = ( props ) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[ style.Main, { backgroundColor: theme.colors.surface } ]}>
      <View style={style.View}>
        <View style={style.Column}>
          {leftCol.map( ( row, index ) => (
            <View key={index} style={style.Row}>
              { row.map( ( akhar ) => (
                <View key={akhar} style={style.Button}>
                  <Text
                    style={style.Text}
                  >
                    {akhar}
                  </Text>
                </View>
              ) )}
            </View>
          ) )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const KeyboardScrollView = ( props ) => {
  const KbCtx = useContext( KeyboardContext );

  return <ScrollView style={props.style} onScroll={() => KbCtx.toggleKb( false )}>{props.children}</ScrollView>;
};

const style = StyleSheet.create( {
  Button: {
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    margin: 2,
  },
  Column: {
    flex: 1,
    flexDirection: 'column',
  },
  Main: {
    height: '40%',
    width: '100%',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  Text: {
    fontFamily: 'AnmolLipiTrue',
    fontSize: 28,

  },
  View: {
    flexDirection: 'row',
    height: '100%',
    marginTop: 10,
    width: '100%',
  },
} );

export default Keyboard;

export { KeyboardScrollView };

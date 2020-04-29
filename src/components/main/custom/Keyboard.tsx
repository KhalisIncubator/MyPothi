/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardContext } from './Controller';
import Key, { CustomIconKey, SpaceBar, Spacer } from './Key';


const keys = [
  [ 'a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', '|' ],
  [ 'c', 'C', 'j', 'J', '\\', 't', 'T', 'f', 'F', 'x' ],
  [ 'q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm' ],
  [ 'X', 'r', 'l', 'v', 'V', '', '' ],
];

const customKeysInRow = [
  {
    row: 4,
    index: 5,
    type: 'spacer',
    component: <Spacer spaces={3} bgColor="Gray" />,
  },
  {
    row: 4,
    index: 6,
    component: <Key
      akhar="done"
      viewStyle={{
        backgroundColor: 'rgb(10, 132, 255)',
        flex: 3,
        justifyContent: 'center',
      }}
    />,

  },
];
// 'S', 'Z', '^', 'z', 'L'

const Keyboard = ( props ) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[ style.Main, { backgroundColor: theme.colors.surface } ]}>
      <View style={style.MainKeyView}>
        {keys.map( ( row, rowIndex ) => (
          <View key={rowIndex} style={style.KeyRow}>
            { row.map( ( akhar, index ) => {
              const customKey = customKeysInRow.find( ( key ) => key.row === rowIndex + 1 && key.index === index );
              return customKey ? customKey.component : <Key akhar={akhar} textStyle={style.KeyText} key={akhar} />;
            } )}
          </View>
        ) )}
        <View style={style.KeyRow}>
          <Key akhar="123" textStyle={{ padding: 3 }} />
          <SpaceBar />
          <CustomIconKey icon="delete" style={{ backgroundColor: '255, 59, 48' }} />

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
  KeyRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    width: '100%',
  },
  KeyText: {
    fontFamily: 'AnmolLipiTrue',
    fontSize: 25,
    padding: 3,

  },
  Main: {
    height: '40%',
    width: '100%',
  },
  MainKeyView: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
} );

export default Keyboard;

export { KeyboardScrollView };

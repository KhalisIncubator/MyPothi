import React from 'react';

import {
  Text, StyleSheet, View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

const TextBlock = ( props ) => {
  const theme = useTheme();
  const {
    style, value, isSelected, onClick, mods, type,
  } = props;
  const isGurmukhi = type === 'Teeka';
  const isPangtee = type === 'Pangtee';
  const modStyle: any = { };
  mods.forEach( ( mod ) => {
    if ( type === mod?.element ) {
      if ( mod?.bold ) modStyle.fontWeight = 'bold';
      if ( mod?.italics ) modStyle.fontStyle = 'italics';
      if ( mod?.underline ) modStyle.textDecorationLine = 'underline';
      if ( mod?.backgroundColor ) modStyle.backgroundColor = mod.backgroundColor;
      if ( mod?.fontSize ) modStyle.fontSize = mod.fontSize;
      // console.log( type, mod?.element, type === mod?.element, modStyle );
    }
  } );
  const flatten = StyleSheet.flatten(
    [ style,
      { ...modStyle },
      { color: theme.colors.text },
      isGurmukhi ? styles.Gurmukhi : styles.English,
      isSelected ? styles.Selected : {},
      isPangtee ? styles.Pangtee : {},
      styles.Text ],
  );
  return (
        <View style={styles.View}>
            <Text
                onPress={() => {
                  onClick();
                }}
                selectable={false}
                style={flatten}>
                {value}
            </Text>
        </View>
  );
};

const styles = StyleSheet.create( {
  English: {
    marginVertical: 3,
  },
  Gurmukhi: {
    fontFamily: 'AnmolLipiTrue',
    marginVertical: 3,
  },
  Pangtee: {
    fontFamily: 'AnmolLipiTrue',
    marginVertical: 4,
  },
  Selected: {
    backgroundColor: '#a5a5a5',
  },
  Text: {
    paddingHorizontal: 10,
  },
  View: {
    width: '100%',
  },
} );
export default TextBlock;

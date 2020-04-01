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
      if ( mod?.bold ) { ( isPangtee || isGurmukhi ) ? modStyle.fontFamily = 'AnmolLipiBoldTrue' : modStyle.fontWeight = 'bold'; }
      if ( mod?.italics ) modStyle.fontStyle = 'italics';
      if ( mod?.underline ) modStyle.textDecorationLine = 'underline';
      if ( mod?.backgroundColor ) modStyle.backgroundColor = mod.backgroundColor;
      if ( mod?.fontSize ) modStyle.fontSize = mod.fontSize;
    }
  } );
  const flatten = StyleSheet.flatten(
    [ style,
      modStyle,
      { color: theme.colors.text },
      isGurmukhi ? styles.Gurmukhi : styles.English,
      !modStyle.fontFamily && ( isPangtee || isGurmukhi ) ? { fontFamily: 'AnmolLipiTrue' } : {},
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
    marginVertical: 3,
  },
  Pangtee: {
    marginVertical: 4,
  },
  Selected: {
    borderColor: '#FFA500',
    borderWidth: 5,
  },
  Text: {
    paddingHorizontal: 10,
  },
  View: {
    width: '100%',
  },
} );
export default TextBlock;

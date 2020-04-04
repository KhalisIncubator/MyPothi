import React from 'react';

import {
  Text, StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { mapVishraams } from '../../../Functions';

const TextBlock = ( props ) => {
  const theme = useTheme();
  const {
    style, value, isSelected, onClick, mods, type, vishraams, source,
  } = props;
  const isGurmukhi = type === 'Teeka';
  const isPangtee = type === 'Pangtee';
  const modStyle: any = { };

  let pangteeWithVishraams;
  if ( isPangtee ) pangteeWithVishraams = mapVishraams( value, vishraams, source );

  mods.forEach( ( mod ) => {
    if ( type === mod?.element ) {
      if ( mod?.bold ) { ( isPangtee || isGurmukhi ) ? modStyle.fontFamily = 'AnmolLipiBoldTrue' : modStyle.fontWeight = 'bold'; }
      if ( mod?.italics ) modStyle.fontStyle = 'italics';
      if ( mod?.underline ) modStyle.textDecorationLine = 'underline';
      if ( mod?.backgroundColor ) modStyle.backgroundColor = mod.backgroundColor;
      if ( mod?.fontSize ) modStyle.fontSize = mod.fontSize;
    }
  } );
  const ViewStyle = StyleSheet.flatten(
    [
      isSelected ? styles.Selected : {},
      styles.View,
    ],
  );

  const textStyle = StyleSheet.flatten(
    [
      style,
      modStyle,
      !modStyle.fontFamily && ( isPangtee || isGurmukhi ) ? { fontFamily: 'AnmolLipiTrue' } : {},
      { color: theme.colors.text },
      isGurmukhi ? styles.Gurmukhi : styles.English,
      isPangtee ? styles.Pangtee : {},
      styles.Text,
    ],
  );
  return (
        <TouchableWithoutFeedback onPress={onClick} >
          <View style={ViewStyle} pointerEvents="box-none">
            {
              pangteeWithVishraams ? (
                <Text
                selectable={false}
                style={textStyle}>
                  {
                    pangteeWithVishraams.map( ( section ) => ( <Text
                    style={
                      section.type === 'line'
                        ? {}
                        : ( section.type === 'v'
                          ? styles.FullVishraam
                          : styles.YamkiVishraam )
                    }>
                       {`${section.data} `}
                      </Text> ) )
                  }
                </Text>
              )
                : (
                <Text
                  selectable={false}
                  style={textStyle}>
                  {value}
                </Text>
                )
            }
            </View>
        </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create( {
  English: {
    paddingVertical: 3,
  },
  FullVishraam: {
    color: 'orange',
  },
  Gurmukhi: {
    paddingVertical: 3,
  },
  Pangtee: {
    paddingVertical: 4,
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
  YamkiVishraam: {
    color: 'green',
  },
} );
export default TextBlock;

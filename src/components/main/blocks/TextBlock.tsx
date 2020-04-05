/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

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
  const modStyle: any = useMemo( () => {
    const tempStyle = {} as any;
    mods.forEach( ( mod ) => {
      if ( type === mod?.element ) {
        if ( mod?.bold ) { ( isPangtee || isGurmukhi ) ? tempStyle.fontFamily = 'AnmolLipiBoldTrue' : tempStyle.fontWeight = 'bold'; }
        if ( mod?.italics ) tempStyle.fontStyle = 'italics';
        if ( mod?.underline ) tempStyle.textDecorationLine = 'underline';
        if ( mod?.backgroundColor ) tempStyle.backgroundColor = mod.backgroundColor;
        if ( mod?.fontSize ) tempStyle.fontSize = mod.fontSize;
      }
    } );
    return tempStyle;
  }, [] );

  // let pangteeWithVishraams;
  // if ( isPangtee ) pangteeWithVishraams = mapVishraams( value, vishraams, source );
  const pangteeWithVishraams = useMemo( () => (
    isPangtee ? mapVishraams( value, vishraams, source ) : null
  ), [ value, source ] );
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
      !modStyle?.fontFamily && ( isPangtee || isGurmukhi ) ? { fontFamily: 'AnmolLipiTrue' } : {},
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
                    pangteeWithVishraams.map( ( section, index ) => ( <Text
                    style={
                      section.type === 'line'
                        ? {}
                        : ( section.type === 'y'
                          ? styles.YamkiVishraam
                          : styles.FullVishraam )
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

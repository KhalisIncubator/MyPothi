/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, memo, ReactNode } from 'react';

import {
  Text, StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { mapVishraams } from '../../../Functions';
import { Modification } from '../../../../types/types';

interface Props {
  style: object,
  value: string,
  isSelected: boolean,
  onClick: () => void,
  mod: Modification[],
  type: any,
  vishraams?: object,
  source?: string,
  children?: ReactNode
}
const TextBlock: React.FC<Props> = ( {
  style, value, isSelected, onClick, mod, type, vishraams, source,
} ) => {
  const [ singularMod ] = mod;
  const theme = useTheme();
  const isGurmukhi = type === 'Teeka';
  const isPangtee = type === 'Pangtee';
  const modStyle: any = useMemo( () => {
    const tempStyle = {} as any;
    if ( singularMod?.bold ) { ( isPangtee || isGurmukhi ) ? tempStyle.fontFamily = 'AnmolLipiBoldTrue' : tempStyle.fontWeight = 'bold'; }
    if ( singularMod?.backgroundColor ) tempStyle.backgroundColor = singularMod.backgroundColor;
    if ( singularMod?.fontSize ) tempStyle.fontSize = singularMod.fontSize;
    return tempStyle;
  }, [ singularMod ] );

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

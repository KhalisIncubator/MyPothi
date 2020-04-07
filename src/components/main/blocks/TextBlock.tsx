/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, ReactNode } from 'react';

import {
  Text, StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { mapVishraams } from '../../../Functions';
import { Modification } from '../../../../types/types';
import { useMainStoreState } from '../../../store/TsHooks';

interface Props {
  style: object,
  value: string,
  isSelected: boolean,
  onClick: () => void,
  mod: Modification[],
  type: any,
  isMainLine?: boolean,
  vishraams?: object,
  source?: string,
  children?: ReactNode
}
const TextBlock: React.FC<Props> = ( {
  style, value, isSelected, onClick, mod, type, vishraams, source, isMainLine,
} ) => {
  const [ singularMod ] = mod;
  const theme = useTheme();
  const isDarkMode = useMainStoreState( ( store ) => store.themeModel.isDarkMode );
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
    source && vishraams ? mapVishraams( value, vishraams, source ) : null
  ), [ value, source ] );
  const ViewStyle = StyleSheet.flatten(
    [
      styles.View,
      isMainLine ? ( isDarkMode ? styles.DarkMainLine : styles.MainLine ) : {},
      isSelected ? styles.Selected : {},
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
                    }
                    key={section.data}>
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
  DarkMainLine: {
    backgroundColor: '#69707a',
  },
  English: {
    paddingVertical: 3,
  },
  FullVishraam: {
    color: '#ec9900',
  },
  Gurmukhi: {
    paddingVertical: 3,
  },
  MainLine: {
    backgroundColor: '#c6cfd4',
  },
  Pangtee: {
    paddingVertical: 4,
  },
  Selected: {
    borderColor: '#FFA500',
    borderStyle: 'dashed',
    borderWidth: 3,
  },
  Text: {
    paddingHorizontal: 10,
  },
  View: {
    width: '100%',
  },
  YamkiVishraam: {
    color: '#458B00',
  },
} );
export default TextBlock;

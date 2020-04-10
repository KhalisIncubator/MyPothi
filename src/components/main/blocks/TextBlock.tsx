/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, ReactNode } from 'react';

import {
  Text, StyleSheet, View, TouchableWithoutFeedback, useColorScheme,
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
  const colors = useColorScheme();
  const isDarkMode = useMainStoreState( ( store ) => store.themeModel.theme.isDarkMode );
  const isTrueDark = useMainStoreState( ( store ) => store.themeModel.theme.trueDarkMode );
  const useSystem = useMainStoreState( ( store ) => store.themeModel.theme.choseSystem );

  const isGurmukhi = type === 'Teeka';
  const isPangtee = type === 'Pangtee';
  const modStyle: any = useMemo( () => {
    const tempStyle = {} as any;
    if ( singularMod?.bold ) { ( isPangtee || isGurmukhi ) ? tempStyle.fontFamily = 'AnmolLipiBoldTrue' : tempStyle.fontWeight = 'bold'; }
    if ( singularMod?.backgroundColor ) tempStyle.backgroundColor = singularMod.backgroundColor;
    if ( singularMod?.fontSize ) tempStyle.fontSize = singularMod.fontSize;
    return tempStyle;
  }, [ singularMod ] );

  const mainLineHighlight = useMemo( () => {
    if ( useSystem ) return colors === 'dark' ? ( isTrueDark ? styles.trueDarkLine : styles.DarkMainLine ) : styles.MainLine;
    return isTrueDark ? styles.trueDarkLine : ( isDarkMode ? styles.DarkMainLine : styles.MainLine );
  }, [ isDarkMode, isTrueDark, useSystem ] );
  // let pangteeWithVishraams;
  // if ( isPangtee ) pangteeWithVishraams = mapVishraams( value, vishraams, source );
  const pangteeWithVishraams = useMemo( () => (
    source && vishraams ? mapVishraams( value, vishraams, source ) : null
  ), [ value, source ] );
  const ViewStyle = StyleSheet.flatten(
    [
      styles.View,
      isMainLine ? mainLineHighlight : {},
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
    backgroundColor: '#52555a',
  },
  English: {
    paddingVertical: 3,
  },
  FullVishraam: {
    // color: '#e14500', alt orange
    // color: '#ea4600', base for main vishraams
    color: '#d2470b',
  },
  // #136983
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

    // color: '#237fad', dark blue, base for jamki
    color: '#417d9a',
  },
  // TODO: add when gursewak db is added
  // ThamkiVishraam: {
  // color: '#739968', light green color: now used as base for thamki
  // color: '#688d5d',
  //   color: '#537e47',
  // },
  //
  // #cc7100
  trueDarkLine: {
    backgroundColor: '#2C2F33',
  },
} );
export default TextBlock;

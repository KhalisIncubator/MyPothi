/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactChild } from 'react';

import { StyleSheet, View } from 'react-native';

import { useMPTheme } from '../../../Hooks';

interface BaseProps {
  isSelected: boolean,
  lineID: number,
  onClick?: () => void,
  children: ReactChild,
  isMainLine?: boolean,
}

const TextBlockBase: React.FC<BaseProps> = ( {
  isSelected, isMainLine, children,
} ) => {
  const theme = useMPTheme();
  const ViewStyle = StyleSheet.flatten( [ styles.View, isMainLine ? theme.customTypes?.lineHighlight : {},
    isSelected ? styles.Selected : {} ] );
  return (
    <View style={ViewStyle}>
      {children}
    </View>
  );
};

export { TextBlockBase };
const styles = StyleSheet.create( {

  // #136983
  Selected: {
    borderColor: '#FFA500',
    borderStyle: 'dashed',
    borderWidth: 3,
  },

  View: {
    width: '100%',
  },
} );

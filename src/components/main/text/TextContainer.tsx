/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode } from 'react';
import { Results } from 'realm';
import {
  Text, StyleSheet, Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Modification } from '../../../../types/types';


const generateFont = ( isGurmukhi, isBold ) => {
  if ( Platform.OS === 'android' ) {
    if ( isGurmukhi ) return isBold ? ( { fontFamily: 'OpenGurbaniAkhar-Bold' } ) : ( { fontFamily: 'OpenGurbaniAkhar-Regular' } );
    if ( isBold ) return ( { fontWeight: 'bold' } );
  } else {
    if ( isBold ) return ( { fontWeight: 'bold' } );
    if ( isGurmukhi ) return ( { fontFamily: 'OpenGurbaniAkhar' } );
  }

  return null;
};

const modMap = {
  backgroundColor: ( value ) => ( { backgroundColor: value } ),
  bold: ( value, isGurmukhi ) => ( value ? generateFont( isGurmukhi, true ) : null ),
  fontSize: ( value ) => ( value ? ( { fontSize: value } ) : null ),

};

const generateStyle = ( modResults, style, isGurmukhi ) => {
  const { 0: mod } = modResults;
  const modStyle = mod?.entries().reduce( ( acc, [ key, value ] ) => {
    const createrFunc = modMap?.[key];
    return ( {
      ...acc,
      ...( createrFunc ? createrFunc( value, isGurmukhi ) : {} ),
    } );
  }, {} ) ?? {};


  return StyleSheet.flatten( [ style, modStyle ] );
};


interface TextContainerProps {
  style?: any,
  mod?: Results<Modification>,
  children?: ReactNode
  isGurmukhi?: boolean
}

const RomanTextContainer: React.FC<TextContainerProps> = ( {
  style, children, mod, isGurmukhi = false,
} ) => {
  const theme = useTheme();
  const textStyle = generateStyle( mod, StyleSheet.flatten( [ style, { color: theme.colors.text }, styles.Text ] ), isGurmukhi );
  return (
    <Text style={textStyle}>
      {children}
    </Text>
  );
};
const GurmukhiTextContainer: React.FC<TextContainerProps> = ( { style, children, mod } ) => (
  <RomanTextContainer style={StyleSheet.flatten( [ generateFont( true, false ), style ] )} mod={mod} isGurmukhi>
    {children}
  </RomanTextContainer>
);

const styles = StyleSheet.create( {
  Text: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
} );

export { RomanTextContainer, GurmukhiTextContainer };

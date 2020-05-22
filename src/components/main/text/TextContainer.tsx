/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode } from 'react';
import { Results } from 'realm';
import {
  Text, StyleSheet, TextStyle, StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Modification } from '../../../../types/types';


const modMap = {
  backgroundColor: ( value ) => ( { backgroundColor: value } ),
  bold: ( value ) => ( value ? ( { fontWeight: 'bold' } ) : null ),
  fontSize: ( value ) => ( value ? ( { fontSize: value } ) : null ),

};

const generateStyle = ( modResults, style ) => {
  const { 0: mod } = modResults;
  const modStyle = mod?.entries().reduce( ( acc, [ key, value ] ) => {
    const createrFunc = modMap?.[key];
    return ( {
      ...acc,
      ...( createrFunc ? createrFunc( value ) : {} ),
    } );
  }, {} ) ?? {};


  return StyleSheet.flatten( [ style, modStyle ] );
};


interface TextContainerProps {
  style?: StyleProp<TextStyle>
  mod?: Results<Modification>,
  children?: ReactNode
}

const RomanTextContainer: React.FC<TextContainerProps> = ( { style, children, mod } ) => {
  const theme = useTheme();
  const textStyle = generateStyle( mod, StyleSheet.flatten( [ style, { color: theme.colors.text }, styles.Text ] ) );
  return (
    <Text style={textStyle}>
      {children}
    </Text>
  );
};
const GurmukhiTextContainer: React.FC<TextContainerProps> = ( { style, children, mod } ) => (
  <RomanTextContainer style={StyleSheet.flatten( [ { fontFamily: 'OpenGurbaniAkhar' }, style ] )} mod={mod}>
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

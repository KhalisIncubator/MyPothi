import React, { ReactNode } from 'react';

import {
  Text, StyleSheet, TextStyle, StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Modification } from '../../../../types/types';


const modMap = {
  backgroundColor: ( value ) => ( { backgroundColor: value } ),
  bold: ( value ) => ( value ? ( { fontWeight: 'bold ' } ) : null ),
  fontSize: ( value ) => ( { fontSize: value } ),

};

const generateStyle = ( mod, style ) => {
  const modStyle = mod.entries().reduce( ( acc, [ key, value ] ) => ( {
    ...acc,
    ...modMap[key]( value ),
  } ), {} );


  return StyleSheet.flatten( [ style, modStyle ] );
};


interface TextContainerProps {
  style?: StyleProp<TextStyle>
  mod?: Modification,
  children?: ReactNode
}

const RomanTextContainer: React.FC<TextContainerProps> = ( { style, children, mod } ) => {
  const theme = useTheme();
  // const textStyle = generateStyle( mod, StyleSheet.flatten( [ style, { color: theme.colors.text }, styles.Text ] ) );
  return (
    <Text style={StyleSheet.flatten( [ {
      color: theme.colors.text,
    }, styles.Text, style ] )}
    >
      {children}
    </Text>
  );
};
const GurmukhiTextContainer: React.FC<TextContainerProps> = ( { style, children } ) => (
  <RomanTextContainer style={StyleSheet.flatten( [ { fontFamily: 'OpenGurbaniAkhar' }, style ] )}>
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

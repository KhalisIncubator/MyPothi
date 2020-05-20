/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useMemo, ReactNode, ReactChild, useState,
} from 'react';

import {
  Text, StyleSheet, View, TouchableWithoutFeedback, useColorScheme, TextStyle, StyleProp, TouchableHighlight,
} from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import { mapVishraams } from '../../../Functions';
import {
  Modification, ApiVishraams, VishraamType, LineMenuItem,
} from '../../../../types/types';
import { useMainStoreState } from '../../../store/TsHooks';
import { useMPTheme } from '../../../Hooks';


const modMap = {
  backgroundColor: ( value ) => ( { backgroundColor: value } ),
  bold: ( value ) => ( value ? ( { fontWeight: 'bold ' } ) : null ),
  fontSize: ( value ) => ( { fontSize: value } ),

};

const generateVishraamStyle = ( type ) => {
  switch ( type ) {
    case 'y':
      return styles.YamkiVishraam;
    case 'v':
      return styles.FullVishraam;
    case 't':
      return styles.ThamkiVishraam;
    default: return { };
  }
};
const generateStyle = ( mod, style ) => {
  const modStyle = mod.entries().reduce( ( acc, [ key, value ] ) => ( {
    ...acc,
    ...modMap[key]( value ),
  } ), {} );


  return StyleSheet.flatten( [ style, modStyle ] );
};


// Text Container Nodes


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


// TEXT NODES
interface VishraamsProps {
  line: string,
  vishraams?: ApiVishraams,
  source: VishraamType,
  lineID?: number // not really necessary, just helpful for the key prop
}
const VishraamText: React.FC<VishraamsProps> = ( {
  line, vishraams, source, lineID,
} ) => (
  <>
    {mapVishraams( line, vishraams, source ).map( (
      { data, type },
    ) => (
      <Text key={`${data}-lineID${lineID}-${type}`} style={generateVishraamStyle( type )}>{`${data} `}</Text>
    ) ) }
  </>
);

export { RomanTextContainer, GurmukhiTextContainer, VishraamText };

const withContextMenu = ( children ) => ( line, menu ) => {
  const theme = useMPTheme();
  const [ isVisible, updateVisible ] = useState( false );

  const toggleVis = () => {
    updateVisible( ( prev ) => !prev );
  };
  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVis}
      anchor={(
        <TouchableHighlight onLongPress={toggleVis} underlayColor={theme.customTypes.lineHighlight}>
          {children}
        </TouchableHighlight>
      )}
    >
      {menu.map( ( { title, action } ) => (
        <Menu.Item
          title={title}
          onPress={() => {
            action( line );
            toggleVis();
          }}
          key={title}
        />
      ) )}
    </Menu>
  );
};

export { withContextMenu };
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
  FullVishraam: {
    // color: '#e14500', alt orange
    // color: '#ea4600', base for main vishraams
    color: '#d2470b',
  },
  // #136983
  Selected: {
    borderColor: '#FFA500',
    borderStyle: 'dashed',
    borderWidth: 3,
  },
  Text: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  // TODO: implement when gursewak db is added
  ThamkiVishraam: {
    // color: '#739968', light green color: now used as base for thamki
    // color: '#688d5d',
    color: '#537e47',
  },
  View: {
    width: '100%',
  },
  YamkiVishraam: {
    // color: '#237fad', dark blue, base for jamki
    color: '#417d9a',
  },
  // #cc7100
} );

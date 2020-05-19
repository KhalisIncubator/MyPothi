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
    <Text style={StyleSheet.flatten( [ style, {
      color: theme.colors.text,
      fontSize: 32,
    } ] )}
    >
      {children}
    </Text>
  );
};
const GurmukhiTextContainer: React.FC<TextContainerProps> = ( { style, children } ) => (
  <RomanTextContainer style={StyleSheet.flatten( [ style, { fontFamily: 'OpenGurbaniAkhar' } ] )}>
    {children}
  </RomanTextContainer>
);


// TEXT NODES

interface TextProps {
  line: string,
}

interface VishraamsProps {
  vishraams: ApiVishraams,
  source: VishraamType,
  lineID?: number // not really necessary, just helpful for the key prop
}
const VishraamText: React.FC<VishraamsProps & TextProps> = ( {
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
  isMainLine: boolean,
  lineID: number,
  onClick?: () => void,
  children: ReactChild,
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
interface Props {
  style: object,
  value: string,
  isSelected: boolean,
  onClick: () => void,
  mod: Modification[],
  type: 'Pangtee' | 'Eng' | 'Teeka' | 'Translit',
  lineID: number,
  isMainLine?: boolean,
  vishraams?: object,
  source?: string,
  children?: ReactNode,
}
const TextBlock: React.FC<Props> = ( {
  style, value, isSelected, onClick, mod, type, vishraams, source, isMainLine, lineID,
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
    if ( singularMod?.bold ) { tempStyle.fontWeight = 'bold'; }
    if ( singularMod?.backgroundColor ) tempStyle.backgroundColor = singularMod.backgroundColor;
    if ( singularMod?.fontSize ) tempStyle.fontSize = singularMod.fontSize;
    return tempStyle;
  }, [ singularMod ] );

  const mainLineHighlight = useMemo( () => {
    if ( isMainLine ) {
      if ( useSystem ) return colors === 'dark' ? ( isTrueDark ? styles.trueDarkLine : styles.DarkMainLine ) : styles.MainLine;
      return isTrueDark ? styles.trueDarkLine : ( isDarkMode ? styles.DarkMainLine : styles.MainLine );
    }
    return null;
  }, [ isDarkMode, isTrueDark, useSystem, colors ] );

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
      !modStyle?.fontFamily && ( isPangtee || isGurmukhi ) ? { fontFamily: 'OpenGurbaniAkhar' } : {},
      { color: theme.colors.text },
      isGurmukhi ? styles.Gurmukhi : styles.English,
      isPangtee ? styles.Pangtee : {},
      styles.Text,
    ],
  );
  // pointerEvents="box-none"
  return (
    <TouchableWithoutFeedback onPress={onClick} onLongPress={() => { console.log( 'yooo' ); }}>
      <View style={ViewStyle}>
        {
             ( isPangtee || type === 'Translit' ) && source && vishraams
               ? (
                 <Text style={textStyle}>
                   <Text

                     selectable={false}

                   >
                     {
                   mapVishraams( value, vishraams, source ).map( ( section, index ) => (
                     <Text
                       style={
                     section.type === 'line'
                       ? {}
                       : ( section.type === 'y'
                         ? styles.YamkiVishraam
                         : styles.FullVishraam )
                   }
                       key={`${section.data}-lineID${lineID}-${type}`}
                     >
                       {`${section.data} `}
                     </Text>
                   ) )
                 }
                   </Text>
                 </Text>
               )
               : (
                 <Text
                   selectable={false}
                   style={textStyle}
                 >
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
  trueDarkLine: {
    backgroundColor: '#2C2F33',
  },
} );
export default TextBlock;

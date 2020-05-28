import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  IconButton,
  useTheme,
} from 'react-native-paper';

import { getCurrentFontSize } from '../../Functions';
import {
  useUpdaters,
  useValues,
} from '../../store/StateHooks';

const Toolbar = ( {
  showMain, updateMode, currentLine, style, toggleHighligher, isHighlighterOn,
} ) => {
  const theme = useTheme();

  const { createMod, deleteMod } = useUpdaters( 'currentModel' );
  const { fontSizes } = useValues( 'viewerModel' );
  const [ lineid, element, parentID ] = currentLine;
  return (

    <SafeAreaView
      style={[ styles.View, { backgroundColor: theme.colors.backdrop }, style ]}
    >
      <View
        style={[
          styles.Header,
          { backgroundColor: theme.colors.backdrop },
        ]}
      >
        <IconButton
          icon={showMain ? 'chevron-down' : 'chevron-up'}
          onPress={() => {
            updateMode();
            if ( isHighlighterOn ) {
              toggleHighligher();
            }
          }}
        />
        <Text>Customize</Text>
      </View>
      {showMain && (
      <View style={[ styles.Main, { backgroundColor: theme.colors.surface } ]}>
        <IconButton
          icon="bold"
          size={20}
          onPress={() => {
            createMod( {
              lineid,
              element,
              type: 'bold',
              value: true,
              parentID,
            } );
          }}
        />
        <IconButton
          icon="plus-square"
          size={20}
          onPress={() => {
            const newSize = getCurrentFontSize( currentLine,
              fontSizes[element === 'Pangtee' ? 'gurmukhi' : ( element ? element.toLowerCase() : 0 )] ) + 1;
            createMod( {
              lineid,
              element,
              type: 'fontSize',
              value: newSize,
              parentID,
            } );
          }}
        />
        <IconButton
          icon="minus-square"
          size={20}
          onPress={() => {
            const getSize = getCurrentFontSize( currentLine,
              fontSizes[element === 'Pangtee' ? 'gurmukhi' : ( element ? element.toLowerCase() : 0 )] );
            const newSize = getSize <= 0 ? null : getSize - 1;
            createMod( {
              lineid,
              element,
              type: 'fontSize',
              value: newSize,
              parentID,
            } );
          }}
        />
        <IconButton
          icon="edit-2"
          size={20}
          onPress={() => {
            toggleHighligher();
          }}
        />
        <IconButton
          icon="x"
          size={20}
          onPress={() => {
            deleteMod( {
              lineid,
              element,
              parentID,
            } );
          }}
        />
      </View>
      )}
      {!showMain && <View />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {

  Header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    minHeight: 10,
    width: '100%',
  },
  Main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: 20,
    paddingHorizontal: 5,
    paddingTop: 2.5,
    width: '100%',
  },
  View: {
    width: '100%',
  },
} );
export default Toolbar;

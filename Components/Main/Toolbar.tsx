import React, { useState } from 'react';

import {
  View, Text, StyleSheet, SafeAreaView,
} from 'react-native';

import { IconButton, useTheme } from 'react-native-paper';
import HighlightSelector from './HighlightSelector';
import { useUpdaters } from '../../config/app_state/state_hooks';

const Toolbar = ( { showMain, updateMode, currentLine } ) => {
  const theme = useTheme();

  const [ isHighlighterVis, toggleHighligher ] = useState( false );

  const { createMod } = useUpdaters( 'currentModel' );
  return (
    <>
            {isHighlighterVis && (
                <HighlightSelector style={styles.Highlighter} />
            )}
            <SafeAreaView
                style={[ styles.View, { backgroundColor: theme.colors.backdrop } ]}>
                <View
                    style={[
                      styles.Header,
                      { backgroundColor: theme.colors.backdrop },
                    ]}>
                    <IconButton
                        icon={showMain ? 'chevron-down' : 'chevron-up'}
                        onPress={() => {
                          updateMode();
                        }}
                    />
                    <Text>Toolbar</Text>
                </View>
                {showMain && (
                    <View style={[ styles.Main, { backgroundColor: theme.colors.surface } ]}>
                        <IconButton
                            icon="bold"
                            size={20}
                            onPress={() => {
                              // createMod();
                              const [ lineid, element, parentID ] = currentLine;
                              createMod( {
                                lineid, element, type: 'bold', value: true, parentID,
                              } );
                            }}
                        />
                        <IconButton
                            icon="italic"
                            size={20}
                            onPress={() => {
                              // console.log( 'Italicize' );
                              console.log( currentLine );
                            }}
                        />
                        <IconButton
                            icon="underline"
                            size={20}
                            onPress={() => {
                              console.log( 'Underline' );
                            }}
                        />
                        <IconButton
                            icon="plus-square"
                            size={20}
                            onPress={() => {
                              console.log( 'Increase Size' );
                            }}
                        />
                        <IconButton
                            icon="minus-square"
                            size={20}
                            onPress={() => {
                              console.log( 'decrease Size' );
                            }}
                        />
                        <IconButton
                            icon="edit-2"
                            size={20}
                            onPress={() => {
                              toggleHighligher( ( prev ) => !prev );
                            }}
                        />
                        <IconButton
                        icon ="x"
                        size={20}
                        />
                    </View>
                )}
                {!showMain && <View />}
            </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create( {
  Header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  Highlighter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingBottom: 5,
    width: '100%',
  },
  Main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    paddingTop: 2.5,
    width: '100%',
  },
  View: {
    width: '100%',
  },
} );
export default Toolbar;

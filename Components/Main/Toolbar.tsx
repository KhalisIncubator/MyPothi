import React, { useState } from 'react';

import {
  View, Text, StyleSheet, SafeAreaView,
} from 'react-native';

import { IconButton, useTheme } from 'react-native-paper';
import { useUpdaters } from '../../app_config/app_state/state_hooks';

const Toolbar = ( {
  showMain, updateMode, currentLine, style, toggleHighligher,
} ) => {
  const theme = useTheme();


  const { createMod, deleteMod } = useUpdaters( 'currentModel' );
  const [ lineid, element, parentID ] = currentLine;
  return (

            <SafeAreaView
                style={[ styles.View, { backgroundColor: theme.colors.backdrop }, style ]}>
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

                              createMod( {
                                lineid, element, type: 'bold', value: true, parentID,
                              } );
                            }}
                        />
                        <IconButton
                            icon="plus-square"
                            size={20}
                            onPress={() => {
                            }}
                        />
                        <IconButton
                            icon="minus-square"
                            size={20}
                            onPress={() => {
                              // createMod( {
                              //   lineid, element, type: 'bold', value: true, parentID,
                              // } );
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
                        icon ="x"
                        size={20}
                        onPress={() => {
                          deleteMod( { lineid, element, parentID } );
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

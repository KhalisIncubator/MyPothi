import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useUpdaters } from '../../app_config/app_state/state_hooks';

const HighlightSelector = ( { currentLine, style } ) => {
  const { createMod } = useUpdaters( 'currentModel' );
  const [ lineid, element, parentID ] = currentLine;
  //   {
  //     lineid, element, type, value, parentID,
  //   }
  return (
        <View style={style}>
            <View style={styles.Main}>
                <View style={styles.Row}>
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'red' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'red', parentID,
                        } )}
                    />
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'orange' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'orange', parentID,
                        } )}
                    />
                </View>
                <View style={styles.Row}>
                <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'yellow' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'yellow', parentID,
                        } )}
                    />
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'green' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'green', parentID,
                        } )}
                    />
                </View>
                <View style={styles.Row}>
                <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'blue' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'blue', parentID,
                        } )}
                    />
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'indigo' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'indigo', parentID,
                        } )}
                    />

                </View>
                <View style={styles.Row}>
                <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'violet' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'violet', parentID,
                        } )}
                    />
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'gray' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'gray', parentID,
                        } )}
                    />
                    <TouchableOpacity
                        style={[ styles.Surface, { backgroundColor: 'black' } ]}
                        onPress={() => createMod( {
                          lineid, element, type: 'backgroundColor', value: 'black', parentID,
                        } )}
                    />
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create( {
  Main: {
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',

  },
  Row: {
    display: 'flex',
    flexDirection: 'row',
  },
  Surface: {
    margin: 5,
    minHeight: 35,
    minWidth: 35,
  },
} );
export default HighlightSelector;

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { IconButton, Colors } from 'react-native-paper';

const Toolbar = ({ showMain, updateMode }) => {
  return (
    <SafeAreaView style={[styles.View, showMain ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#FFA500' }]}>
      <View style={styles.Header}>
        <IconButton
          icon={showMain ? "arrow-down-drop-circle-outline" : "arrow-up-drop-circle-outline"}
          size={20}
          onPress={() => updateMode()}
        />
        <Text>Toolbar</Text>
      </View>
      {
        showMain &&
        <View style={styles.Main}>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  View: {
    width: '100%',
    minHeight: 50,
  },
  Header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    width: '100%'
  },
  Main: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 2.5,
  }
});
export default Toolbar;
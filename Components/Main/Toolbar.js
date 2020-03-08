import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { IconButton, useTheme } from 'react-native-paper';

const Toolbar = ({ showMain, updateMode, removeSelection }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.View, { backgroundColor: theme.colors.header }]}>
      <View style={[styles.Header, { backgroundColor: theme.colors.header }]}>
        <IconButton
          icon={showMain ? "chevron-down" : "chevron-up"}
          onPress={() => {
            updateMode();
            removeSelection();
          }}
        />
        <Text>Toolbar</Text>
      </View>
      {
        showMain &&
        <View style={styles.Main}>
          <IconButton
            icon="bold"
            size={20}
            onPress={() => { console.log('Bold') }}
          />
          <IconButton
            icon="italic"
            size={20}
            onPress={() => { console.log('Italicize') }}
          />
          <IconButton
            icon="underline"
            size={20}
            onPress={() => { console.log('Underline') }}
          />
          <IconButton
            icon="plus-square"
            size={20}
            onPress={() => { console.log('Increase Size') }}
          />
          <IconButton
            icon="minus-square"
            size={20}
            onPress={() => { console.log('decrease Size') }}
          />
          <IconButton
            icon="edit-2"
            size={20}
            onPress={() => { console.log('Highlight') }}
          />
        </View>
      }
      {
        !showMain &&
        <View />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  View: {
    width: '100%',
  },
  Header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  Main: {
    width: '100%',
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 5,
    paddingTop: 2.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
export default Toolbar;
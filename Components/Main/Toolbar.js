import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { IconButton, useTheme } from 'react-native-paper';
import HighlightSelector from './HighlightSelector';

const Toolbar = ({ showMain, updateMode, removeSelection }) => {
  const theme = useTheme();

  const [isHighlighterVis, toggleHighligher] = useState(false);
  return (
    <>
      {
        isHighlighterVis &&
        <HighlightSelector style={styles.Highlighter} />
      }
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
              onPress={() => { toggleHighligher(prev => !prev) }}
            />
          </View>
        }
        {
          !showMain &&
          <View />
        }
      </SafeAreaView>
    </>
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
  },
  Highlighter: {
    display: "flex",
    flexDirection: 'row-reverse',
    width: '100%',
    paddingBottom: 5,
  },
});
export default Toolbar;
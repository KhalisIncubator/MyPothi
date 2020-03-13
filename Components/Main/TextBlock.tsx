import React from 'react';

import { Text, StyleSheet, View } from 'react-native';

const TextBlock = ( props ) => {
  const {
    style, value, isGurmukhi, isPangtee, isSelected, onClick,
  } = props;
  return (
        <View style={styles.View}>
            <Text
                onPress={() => {
                  onClick();
                }}
                selectable={false}
                style={[
                  style,
                  isGurmukhi ? styles.Gurmukhi : styles.English,
                  isSelected ? styles.Selected : {},
                  isPangtee ? styles.Pangtee : {},
                  styles.Text,
                ]}>
                {value}
            </Text>
        </View>
  );
};

const styles = StyleSheet.create( {
  English: {
    color: 'black',
    fontWeight: '200',
    marginVertical: 3,
  },
  Gurmukhi: {
    fontFamily: 'AnmolLipiTrue',
    fontWeight: '200',
    marginVertical: 3,
  },
  Pangtee: {
    fontFamily: 'AnmolLipiTrue',
    fontWeight: '400',
    marginVertical: 4,
  },
  Selected: {
    backgroundColor: '#a5a5a5',
  },
  Text: {
    paddingHorizontal: 10,
  },
  View: {
    width: '100%',
  },
} );
export default TextBlock;

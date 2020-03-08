import React, { useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

const TextBlock = (props) => {
  const { style, value, isGurmukhi, isPangtee, isSelected, onClick } = props;
  return (
    <View style={styles.View}>
      <Text
        onPress={() => {
          onClick();
        }}
        selectable={false}
        style={[style,
          isGurmukhi ? styles.Gurmukhi : styles.English,
          isSelected ? styles.Selected : {},
          isPangtee ? styles.Pangtee : {},
          styles.Text]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    width: '100%',
  },
  Text: {
    paddingHorizontal: 10,
  },
  English: {
    color: 'black',
    marginVertical: 3,

    fontWeight: "200",
  },
  Gurmukhi: {
    marginVertical: 3,
    fontWeight: "200",
    fontFamily: "AnmolLipiTrue",
  },
  Pangtee: {
    marginVertical: 4,
    fontWeight: "400",
    fontFamily: "AnmolLipiTrue",
  },
  Selected: {
    backgroundColor: '#a5a5a5',
  }
});
export default TextBlock;
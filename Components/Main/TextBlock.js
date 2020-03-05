import React, { useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

const TextBlock = (props) => {
  const { style, value, isGurmukhi, isPangtee, isSelectable } = props;
  const [isSelected, toggleSelect] = useState(false);
  const toggleSelectionMode = (newVal) => {
    toggleSelect(newVal)
  }
  return (
    <View style={styles.View}>
      <Text
        onPress={() => {
          if (isSelectable) {
            toggleSelectionMode(!isSelected);
          }
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
    backgroundColor: 'blue',
  }
});
export default TextBlock;
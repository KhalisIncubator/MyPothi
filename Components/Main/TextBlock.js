import React, { useState, useEffect } from 'react';

import {
  Text,
  StyleSheet,
} from 'react-native';

const TextBlock = (props) => {
  const { style, value, isGurmukhi, isPangtee } = props;
  const [isSelected, toggleSelect] = useState(false);
  const toggleSelectionMode = (newVal) => {
    toggleSelect(newVal)
  }
  useEffect(() => console.log(isSelected), [isSelected]);
  return (
    <Text
      onPress={() => {
        toggleSelectionMode(!isSelected)
      }}
      style={[style, isGurmukhi ? styles.Gurmukhi : styles.English, isSelected ? styles.Selected : {}]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  English: {
    color: 'black',
    marginVertical: 3,
    paddingLeft: 5,
    fontWeight: "200",
  },
  Gurmukhi: {

  },
  Selected: {
    backgroundColor: 'blue',
    overflow: 'hidden'
  }
});
export default TextBlock;
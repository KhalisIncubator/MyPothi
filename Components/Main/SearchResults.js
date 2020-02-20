import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
const SearchResult = (props) => {
  const { Gurmukhi, Id } = props.result;
  return (
    <View>
      <Text style={styles.text}>{Gurmukhi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'AnmolLipiTrue'
  }
})
export default SearchResult;
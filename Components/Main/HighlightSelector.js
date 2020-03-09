import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const HighlightSelector = (props) => {
  return (
    <View style={props.style}>
      <View style={[styles.Main]}>
        <View style={styles.Row}>
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'red' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'orange' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'yellow' }]} />
        </View>
        <View style={styles.Row}>
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'green' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'blue' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'indigo' }]} />
        </View>
        <View style={styles.Row}>
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'violet' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'gray' }]} />
          <TouchableOpacity style={[styles.Surface, { backgroundColor: 'black' }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    backgroundColor: '#D3D3D3',
    minWidth: 50,
    minHeight: 25,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  Row: {
    display: 'flex',
    flexDirection: 'row',
  },
  Surface: {
    minHeight: 30,
    minWidth: 30,
    margin: 5,
  }
});
export default HighlightSelector;
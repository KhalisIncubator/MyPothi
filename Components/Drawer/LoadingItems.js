import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const LoadingItems = (props) => {
  return (
    <View stlye={tempStyle.Vue}>
      <Text style={tempStyle.Text}>Loading...</Text>
    </View>
  );
}

const tempStyle = StyleSheet.create({
  Vue: {
    backgroundColor: '#9FA8DA'
  },
  Text: {
    fontSize: 20,
  }
});

export default LoadingItems;
import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
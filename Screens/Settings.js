import React from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
const SettingsScreen = ({ navigation }) => {
  return (
    <View>
      <Header
        backgroundColor={"#f99d1c"}
        leftComponent={<Icon
          name="arrow-left"
          type='font-awesome'
          color='white'
          onPress={() => navigation.navigate('ShabadViewer')} />
        }
        centerComponent={{ text: 'Settings', style: { color: '#fff', fontSize: 25 } }}
      />
    </View>
  );
}

export default SettingsScreen;
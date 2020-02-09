import React from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
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
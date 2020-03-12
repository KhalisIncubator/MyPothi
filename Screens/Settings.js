import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useFontSize } from '../config/app_state/hooks';


import { ViewerContext } from '../contexts/Contexts';
const SettingsScreen = ({ navigation }) => {
  const viewer = useContext(ViewerContext);
  const hook = useFontSize();
  return (
    <View>
      <Text>{viewer.gurmukhiSize}</Text>
      <Button onPress={() => viewer.updateFontSize(12, 'translit')} title="mhmmm" />
    </View>
  );
}

export default SettingsScreen;
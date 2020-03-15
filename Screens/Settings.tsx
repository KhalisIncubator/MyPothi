import React from 'react';
import { View, Text, Button } from 'react-native';
import { useValues, useUpdaters } from '../config/app_state/state_hooks';


const SettingsScreen = ( { navigation } ) => {
  const { isDarkMode } = useValues( 'themeModel' );
  const { updateDarkMode } = useUpdaters( 'themeModel' );

  return (
        <View>
            <Text>{isDarkMode}</Text>
            <Button
                onPress={() => { updateDarkMode(); }}
                title="mhmmm"
            />
        </View>
  );
};

export default SettingsScreen;

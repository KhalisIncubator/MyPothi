import React from 'react';
import { View, Text, Button } from 'react-native';
import { useValues, useUpdaters } from '../config/app_state/state_hooks';


const SettingsScreen = ( { navigation } ) => {
  const { fontSizes } = useValues( 'viewerModel' );
  const { updateFontSize } = useUpdaters( 'viewerModel' );

  return (
        <View>
            <Text>{fontSizes.gurmukhi}</Text>
            <Button
                onPress={() => { updateFontSize( [ 'gurmukhi', 12 ] ); }}
                title="mhmmm"
            />
        </View>
  );
};

export default SettingsScreen;

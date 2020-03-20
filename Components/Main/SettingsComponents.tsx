import React, { useState } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Switch, Subheading, Button, Paragraph, Menu,
} from 'react-native-paper';

const SettingWithSwitch = ( props ) => {
  const {
    text, value, updater,
  } = props;
  return (
    <View style={styles.MainViewLine}>
        <Subheading style={{ paddingRight: 10 }}>{text}</Subheading>
      <View style={{ alignSelf: 'flex-end' }}>
        <View style={styles.Buttons}>
        <Switch
        value={value}
          onValueChange={() => { updater(); }}
          color="lightgreen" />
        </View>
        </View>
    </View>
  );
};

export default SettingWithSwitch;

const SettingWithFonts = ( props ) => {
  const {
    text, value, positiveUpdater, negativeUpdater, theme,
  } = props;
  return (
    <View style={styles.MainViewLine}>
    <View style={styles.DescVal}>
  <Subheading style={{ paddingRight: 10 }}>{text}</Subheading>
     <Paragraph>{value}</Paragraph>
   </View>
   <View style={{ alignSelf: 'flex-end' }}>
     <View style={styles.Buttons}>
         <Button
         mode="contained"
         icon="plus"
         color={theme.colors.backdrop}
         theme={{ roundness: 0 }}
         onPress={() => { positiveUpdater(); }} compact>
           {}
           </Button>
         <Button
         mode="contained"
         icon="minus"
         color={theme.colors.backdrop}
         theme={{ roundness: 0 }}
         onPress={() => { negativeUpdater(); }}
         compact>
           {}</Button>
         </View>
   </View>
 </View>
  );
};

const SettingWithList = ( props ) => {
  const {
    values, current, theme, updater, text,
  } = props;
  const [ lengthListVis, updateLengthList ] = useState( false );

  return (
    <View style={styles.MainViewLine}>
        <Subheading style={{ paddingRight: 10 }}>{text}</Subheading>
      <View style={{ alignSelf: 'flex-end' }}>
    <Menu
    visible={lengthListVis}
    onDismiss={() => updateLengthList( false )}
    anchor={
        <Button
            style={[ styles.button, { backgroundColor: theme.colors.surface } ]}
            color={theme.colors.text}
            onPress={() => updateLengthList( true )}>
            {current}
        </Button>
    }>
      {
        Object.keys( values ).map( ( length ) => (
          <Menu.Item
        onPress={() => {
          updateLengthList( false );
          updater( length );
        }}
        title={length}
    />
        ) )
      }
    </Menu>
    </View>
</View>

  );
};
const styles = StyleSheet.create( {
  Buttons: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
  },
  DescVal: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  MainViewLine: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  button: {
    marginTop: 8,
  },
} );

export { SettingWithFonts, SettingWithList };

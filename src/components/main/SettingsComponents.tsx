import React, { useState } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Switch, Subheading, Button, Paragraph, Menu, Card,
} from 'react-native-paper';

const SettingsCard = ( { children, title, theme } ) => (
      <Card theme={theme} style={styles.Card}>
        <Card.Title title={title} />
          <Card.Content>
            { children }
          </Card.Content>
      </Card>
);
export default SettingsCard;
const SettingWithSwitch = ( {
  text, value, updater, objKey,
} ) => {
  const toggle = () => ( objKey ? updater( objKey ) : updater() );
  return (
    <View style={styles.MainViewLine}>
        <Subheading style={{ paddingRight: 10 }}>{text}</Subheading>
      <View style={{ alignSelf: 'flex-end' }}>
        <View style={styles.Buttons}>
        <Switch
        value={value}
          onValueChange={toggle}
          color="#FFA500" />
        </View>
        </View>
    </View>
  );
};

export { SettingWithSwitch };

const SettingWithFonts = ( {
  text, value, updater, theme, objKey,
} ) => {
  const increment = () => updater( [ objKey, value + 1 ] );
  const decrement = () => updater( [ objKey, value - 1 ] );
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
         onPress={increment} compact>
           {}
           </Button>
         <Button
         mode="contained"
         icon="minus"
         color={theme.colors.backdrop}
         theme={{ roundness: 0 }}
         onPress={decrement}
         compact>
           {}</Button>
         </View>
   </View>
 </View>
  );
};
const SettingWithList = ( {
  values, current, theme, updater, text, isBani = false,
} ) => {
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
        Object.entries( values ).map( ( [ key, value ] ) => (
          <Menu.Item
        onPress={() => {
          updateLengthList( false );
          isBani ? updater( key ) : updater( [ 'vishraamSource', key ] );
        }}
        title={isBani ? key : value}
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
  Card: {
    margin: 5,
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

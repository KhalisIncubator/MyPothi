import React, { useState } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Switch, Subheading, Button, Menu, Card, Paragraph,
} from 'react-native-paper';

const wrapHOC = ( SettingModifier ) => ( { theme, value, ...props } ) => <SettingModifier theme={theme} value={value} {...props} />;

const SettingsCard = ( { children, title, theme } ) => (
  <Card theme={theme} style={styles.Card}>
    <Card.Title title={title} />
    <Card.Content>
      { children }
    </Card.Content>
  </Card>
);
export default SettingsCard;

const SettingSection = ( { text, children, subheading } ) => (
  <>
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
    >
      <View style={styles.MainViewLine}>
        <Subheading style={{ paddingRight: 10 }}>{text}</Subheading>
        <View style={{ alignSelf: 'flex-end' }}>
          <View style={styles.Buttons}>
            { children }
          </View>
        </View>
      </View>
    </View>
    <View style={{ justifyContent: 'center' }}>
      {subheading && <Paragraph style={{ fontSize: 14 }}>{subheading}</Paragraph>}
    </View>
  </>
);
const SwitchModifier = ( {
  value, updater, theme, objKey,
} ) => (
  <Switch
    value={value}
    onValueChange={() => { objKey ? updater( objKey ) : updater(); }}
    color={theme.colors.backdrop}
  />
);
const MenuModifier = ( {
  value, updater, theme, list, objKey,
} ) => {
  const [ isVisible, toggler ] = useState( false );
  return (
    <Menu
      visible={isVisible}
      onDismiss={() => toggler( false )}
      anchor={(
        <Button
          style={[ styles.button, { backgroundColor: theme.colors.surface } ]}
          color={theme.colors.text}
          onPress={() => toggler( true )}
        >
          {list[value]}
        </Button>
      )}
    >
      {
        list
          ? Object.entries( list ).map( ( [ key, itemVal ] ) => (
            <Menu.Item
              onPress={() => {
                toggler( false );
                updater( [ objKey, key ] );
              }}
              title={itemVal}
              key={key}
            />
          ) ) : []
      }
    </Menu>
  );
};

const IncrementModifier = ( {
  value, updater, theme, objKey,
} ) => (
  <View style={styles.Buttons}>
    <Paragraph style={{ padding: 5 }}>{value}</Paragraph>
    <Button
      mode="contained"
      icon="plus"
      color={theme.colors.backdrop}
      theme={{ roundness: 0 }}
      onPress={() => { updater( [ objKey, value + 1 ] ); }}
      compact
    >
      {}
    </Button>
    <Button
      mode="contained"
      icon="minus"
      color={theme.colors.backdrop}
      theme={{ roundness: 0 }}
      onPress={() => { updater( [ objKey, value - 1 ] ); }}
      compact
    >
      {}
    </Button>
  </View>
);

const wrappedModifiers = {
  switch: wrapHOC( SwitchModifier ),
  menu: wrapHOC( MenuModifier ),
  font: wrapHOC( IncrementModifier ),
};

export { SettingSection, wrappedModifiers, SwitchModifier };
const styles = StyleSheet.create( {
  Buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Card: {
    margin: 5,
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

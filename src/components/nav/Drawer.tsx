import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem, useIsDrawerOpen } from '@react-navigation/drawer';

import {
  Title, Drawer, Text, Button, useTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useValues, useUpdaters } from '../../store/StateHooks';

const CustomDrawerComponent = ( props ) => {
  const theme = useTheme();

  const { pothiNames } = useValues( 'pothiModel' );
  const { currentName } = useValues( 'currentModel' );

  const { updateCurrentName } = useUpdaters( 'currentModel' );
  const { createPothi } = useUpdaters( 'pothiModel' );

  const [ isCreating, toggleCreateMode ] = useState( false );
  const [ newGutkaName, changeText ] = useState( '' );
  const { navigation } = props;
  const isOpen = useIsDrawerOpen();

  useEffect( () => {
    if ( !isOpen ) {
      toggleCreateMode( false );
    }
  }, [ isOpen ] );
  return (
    <KeyboardAvoidingView style={styles.drawerContent} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
        <View style={styles.titleSection}>
          <View style={styles.row}>
            <Title style={styles.title}>Pothis</Title>
            <Icon
              name="plus-circle"
              color={theme.colors.text}
              size={20}
              onPress={() => {
                toggleCreateMode( true );
              }}
            />
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {pothiNames.map( ( data ) => (
            <>
              <DrawerItem
                icon={( { focused, color, size } ) => (
                  <Icon
                    name={
                      focused
                        ? 'book-open-variant'
                        : 'book'
                    }
                    color={focused ? color : theme.colors.text}
                    size={size}
                  />
                )}
                key={data[0]}
                style={{ borderRadius: theme.roundness }}
                focused={data[0] === currentName[0] && data[1] === currentName[1]}
                activeTintColor="#ff9a00"
                label={( { focused, color } ) => (
                  <Text style={[ { color: focused ? color : theme.colors.text }, styles.text ]}>
                    {data[0]}
                  </Text>
                )}
                onPress={() => {
                  updateCurrentName( [ data[0], data[1] ] );
                  props.navigation.closeDrawer();
                }}
              />
            </>
          ) )}
          {isCreating && (
            <DrawerItem
              icon={( { color, size } ) => (
                <Icon
                  name="pencil-outline"
                  color={theme.colors.text}
                  size={size}
                />
              )}
              onPress={() => null}
                            // activeTintColor="#ff9a00"
              label={( ) => (
                <TextInput
                  style={{ color: theme.colors.text, borderBottomWidth: 1, borderBottomColor: theme.colors.accent }}
                  autoCorrect={false}
                  autoCompleteType="off"
                  placeholderTextColor="gray"
                  placeholder="Enter Pothi Name"
                  underlineColorAndroid="transparent"
                  onChangeText={( text ) => {
                    changeText( text );
                  }}
                />
              )}
            />
          )}
        </Drawer.Section>
        {isCreating && (
          <View>
            <Drawer.Section>
              <Button
                icon="plus"
                style={styles.button}
                color="green"
                onPress={() => {
                  createPothi( newGutkaName );
                  toggleCreateMode( false );
                }}
              >
                Create Pothi!
              </Button>
              <Button
                color="red"
                icon="x"
                style={styles.button}
                onPress={() => {
                  toggleCreateMode( false );
                }}
              >
                Cancel
              </Button>
            </Drawer.Section>
          </View>
        )}
        <Drawer.Section>
          <Button
            icon="list"
            color={theme.colors.text}
            style={styles.button}
            onPress={() => navigation.navigate( 'Stack', {
              screen: 'Edit',
              params: { type: 'Pothi' },
            } )}
          >
            Edit Pothis
          </Button>
        </Drawer.Section>
      </DrawerContentScrollView>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create( {
  button: {
    margin: 5,
  },
  drawerContent: {
    flex: 1,
  },

  drawerSection: {
    marginTop: 15,
  },
  row: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 14,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  titleSection: {
    paddingLeft: 20,
  },
} );

export default CustomDrawerComponent;

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useValues } from '../../config/app_state/state_hooks';


const Header = ( { previous, navigation } ) => {
  const theme = useTheme();
  const { currentName } = useValues( 'currentModel' );
  const route = useRoute();
  const isMain = route.name === 'Gutka';
  return (
        <Appbar.Header theme={{ colors: { primary: theme.colors.backdrop } }}>
            {previous ? (
                <Appbar.BackAction
                    onPress={() => {
                      navigation.navigate( 'Gutka' );
                    }}
                    color={theme.colors.primary}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                      navigation.openDrawer();
                    }}>
                    <Icon name="menu" size={30} />
                </TouchableOpacity>
            )}
            <Appbar.Content title={isMain ? currentName[0] : route.name} />
            {isMain && [
                <Appbar.Action
                    key="Search"
                    icon="search"
                    onPress={() => {
                      navigation.navigate( 'Stack', { screen: 'Search' } );
                    }}
                />,
                <Appbar.Action
                    key="Edit"
                    icon="list"
                    onPress={() => {
                      navigation.navigate( 'Stack', {
                        screen: 'Edit',
                        params: { type: 'Shabad' },
                      } );
                    }}
                />,
                <Appbar.Action
                    key="Settings"
                    icon="settings"
                    onPress={() => {
                      navigation.navigate( 'Stack', { screen: 'Settings' } );
                    }}
                />,
            ]}
        </Appbar.Header>
  );
};

export { Header };

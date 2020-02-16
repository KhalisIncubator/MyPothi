import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Appbar,
  useTheme,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../contexts/Contexts';

const Header = ({ previous, navigation }) => {
  const GlobalCtx = useContext(GlobalContext);
  const theme = useTheme();
  const title = GlobalCtx.currentName;
  const route = useRoute();
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => { navigation.navigate("Gutka") }}
          color={theme.colors.primary}
        />
      ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon
              name="menu"
              size={30} />
          </TouchableOpacity>
        )}
      <Appbar.Content
        style={{ text: { color: 'white' } }}
        title={
          route.name === 'Gutka' ? title : route.name
        }
      />
      {route.name === 'Gutka' &&
        <Appbar.Action icon="dots-vertical" onPress={() => { navigation.navigate('Stack', { screen: 'Edit' }); }} />}
      {route.name === 'Gutka' &&
        <Appbar.Action icon="settings" onPress={() => { navigation.navigate('Stack', { screen: 'Settings' }); }} />}
    </Appbar.Header>
  );
};

export {
  Header,
}
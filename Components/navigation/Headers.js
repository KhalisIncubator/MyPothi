import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Appbar,
  useTheme,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GutkaContext } from '../../contexts/Contexts';


const Header = ({ previous, navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  const theme = useTheme();
  const title = GutkaCtx.currentName[0];
  const route = useRoute();
  const isMain = route.name === 'Gutka';
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.header } }}>
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
          isMain ? title : route.name
        }
      />
      {isMain &&
        [
          <Appbar.Action icon="search" onPress={() => { navigation.navigate('Stack', { screen: 'Search' }); }} />,
          <Appbar.Action icon="list" onPress={() => { navigation.navigate('Stack', { screen: 'Edit', params: { type: 'Shabad' } }); }} />,
          <Appbar.Action icon="settings" onPress={() => { navigation.navigate('Stack', { screen: 'Settings' }); }} />,
        ]
      }

    </Appbar.Header>
  );
};

export {
  Header,
}
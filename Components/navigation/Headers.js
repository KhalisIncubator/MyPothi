import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../contexts/Contexts';

const Header = ({ previous, navigation }) => {
  const GlobalCtx = useContext(GlobalContext);
  const title = GlobalCtx.currentName;
  return (
    <Appbar.Header theme={{ colors: { primary: "#FFA500" } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
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
          title
        }
      />
      <Appbar.Action icon="settings" onPress={() => { navigation.navigate('Stack', { screen: 'Settings' }); }} />
    </Appbar.Header>
  );
};

export {
  Header
}
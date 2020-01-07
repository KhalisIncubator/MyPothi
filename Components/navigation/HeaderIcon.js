import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderIcon = (props) => {
  return (
    <Icon
      name={`${props.name}`}
      type='font-awesome'
      color='white'
      onPress={() => props.navigation.openDrawer()} />

  );
}

export default HeaderIcon;
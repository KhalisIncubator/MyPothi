import React, { useContext } from 'react';
import { Text } from 'react-native';

import { Header, Icon } from 'react-native-elements';

import HeaderIcon from './HeaderIcon';

import { GlobalContext } from '../../Contexts/Contexts';

const MainHeader = (props) => {
  const GlobalCtx = useContext(GlobalContext);
  return (<Header
    backgroundColor={"#f99d1c"}
    leftComponent={
      GlobalCtx.isEditMode && < Text onPress={() => GlobalCtx.toggleEditMode()} style={{ color: '#fff', fontSize: 20 }}> Cancel</Text >
      || <HeaderIcon name="bars" navigation={props.navigation} />
    }
    centerComponent={{ text: `${GlobalCtx.currentName}` || props.tempHeading, style: { color: '#fff', fontSize: 25 } }}
    rightComponent={
      GlobalCtx.isEditMode && <Icon
        name="plus"
        type='font-awesome'
        color='white'
        onPress={() => { props.navigation.navigate('Add') }}
      />
      ||
      <Text onPress={() => GlobalCtx.toggleEditMode()} style={{ color: '#fff', fontSize: 20 }}>Edit</Text>
    }
  />);
}

export default MainHeader;
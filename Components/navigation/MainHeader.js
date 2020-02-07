import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { Header } from 'react-native-elements';
import { GutkaContext, GlobalContext } from '../../Contexts/Contexts';
import HeaderIcon from './HeaderIcon';
import { Icon } from 'react-native-elements';

const MainHeader = (props) => {

  const GutkaCtx = useContext(GutkaContext);
  const GlobalCtx = useContext(GlobalContext);
  if (GlobalCtx.isEditMode) {
    return (
      < Header
        backgroundColor={"#f99d1c"}
        leftComponent={< Text onPress={() => GlobalCtx.toggleEditMode()} style={{ color: '#fff', fontSize: 20 }}> Cancel</Text >}
        centerComponent={{ text: `${GlobalCtx.currentGutkaName}` || props.tempHeading, style: { color: '#fff', fontSize: 25 } }}
        rightComponent={<Icon
          name="plus"
          type='font-awesome'
          color='white'
          onPress={() => { props.navigation.navigate('Add') }}
        />}
      />
    );
  }
  return (<Header
    backgroundColor={"#f99d1c"}
    leftComponent={<HeaderIcon name="bars" navigation={props.navigation} />}
    centerComponent={{ text: `${GlobalCtx.currentGutkaName}` || props.tempHeading, style: { color: '#fff', fontSize: 25 } }}
    rightComponent={<Text onPress={() => GlobalCtx.toggleEditMode()} style={{ color: '#fff', fontSize: 20 }}>Edit</Text>}
  />);
}

export default MainHeader;
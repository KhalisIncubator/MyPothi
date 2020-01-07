import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { Header } from 'react-native-elements';
import { GutkaContext } from '../../Contexts/GutkaCtx';
import HeaderIcon from './HeaderIcon';
import { Icon } from 'react-native-elements';

const MainHeader = (props) => {

  const GutkaCtx = useContext(GutkaContext);
  if (GutkaCtx.isEditMode) {
    return (
      < Header
        backgroundColor={"#f99d1c"}
        leftComponent={< Text onPress={() => GutkaCtx.setMode(false)} style={{ color: '#fff', fontSize: 20 }}> Cancel</Text >}
        centerComponent={{ text: `${GutkaCtx.currGutka}`, style: { color: '#fff', fontSize: 25 } }}
        rightComponent={<Icon
          name="plus"
          type='font-awesome'
          color='white'
          onPress={() => { props.navigation.navigate('Add') }}
        />}
      />
    );
  } else {
    return (<Header
      backgroundColor={"#f99d1c"}
      leftComponent={<HeaderIcon name="bars" navigation={props.navigation} />}
      centerComponent={{ text: `${GutkaCtx.currGutka}`, style: { color: '#fff', fontSize: 25 } }}
      rightComponent={<Text onPress={() => GutkaCtx.setMode(true)} style={{ color: '#fff', fontSize: 20 }}>Edit</Text>}
    />);
  }
}

export default MainHeader;
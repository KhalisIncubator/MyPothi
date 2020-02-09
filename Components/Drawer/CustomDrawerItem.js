import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { GutkaContext, GlobalContext } from '../../Contexts/Contexts';

const CustomDrawerItem = (props) => {

  const GlobalCtx = useContext(GlobalContext);

  if (props.value === GlobalCtx.currentName) {
    return (
      <TouchableOpacity style={style.currentPage} onPress={() => props.navigation.closeDrawer()}>
        <Text style={style.currentPageText}>{props.value}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={() => {
      GlobalCtx.updateCurrentGutka(props.value);
      props.navigation.closeDrawer();
    }}>
      <Text style={style.normalText}>{props.value}</Text>
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
  currentPage: {
    backgroundColor: '#f99d1c',
    marginBottom: 5,
  },
  currentPageText: {
    color: 'white',
    fontSize: 25,
    margin: 5,
  },
  normalText: {
    fontSize: 25,
    marginBottom: 5,
    margin: 5,
  }
});
export default CustomDrawerItem;
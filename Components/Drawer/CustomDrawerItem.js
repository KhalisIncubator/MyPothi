import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { GutkaContext } from '../../Contexts/GutkaCtx.js';

const CustomDrawerItem = (props) => {

  const GutkaCtx = useContext(GutkaContext);

  if (props.value === GutkaCtx.currGutka) {
    return (
      <TouchableOpacity style={style.currentPage} onPress={() => props.navigation.closeDrawer()}>
        <Text style={style.currentPageText}>{props.value}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => {
        GutkaCtx.setCurrGutka(props.value);
        props.navigation.closeDrawer();
      }}>
        <Text style={style.normalText}>{props.value}</Text>
      </TouchableOpacity>
    )
  }
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
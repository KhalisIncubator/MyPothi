import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { GutkaContext } from '../../Contexts/GutkaCtx';
import { Card, Button } from 'react-native-elements';
const ShabadButton = (props) => {
  const GutkaCtx = useContext(GutkaContext);
  return (
    <TouchableOpacity style={card.container} onPress={() => {
      GutkaCtx.setCurrShabadID(props.id)
      props.navigation.navigate('ShabadViewer');
    }}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

const card = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#FEFEFE',
    margin: 10,
    minHeight: 100,
  },
  button: {
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
  text: {
    fontSize: 20,
    padding: 5,
  }
});
export default ShabadButton;
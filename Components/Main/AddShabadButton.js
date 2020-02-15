import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GutkaContext } from '../../contexts/Contexts';

const AddShabadButton = (props) => {
  const GuktaCtx = useContext(GutkaContext);
  return (
    <TouchableOpacity style={style.View} onPress={() => {
      GuktaCtx.addToGutka(13, 'Harcharan Sharan Gobind Dukh Bhanjana', 'Shabad');
      props.navigation.navigate('Gutka');
    }}>
      <Text style={style.text}>Harcharan Sharan Gobind Dukh Bhanjana</Text>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  View: {
    backgroundColor: '#FEFEFE',
    margin: 10,
    minWidth: 400,
    minHeight: 100,
  },
  text: {
    fontSize: 20,
    padding: 5,
  }
});
export default AddShabadButton;
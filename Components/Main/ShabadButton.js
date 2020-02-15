import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Icon } from 'react-native-elements';

import { GutkaContext, GlobalContext } from '../../contexts/Contexts';

const ShabadButton = (props) => {
  const GlobalCtx = useContext(GlobalContext);
  const GutkaCtx = useContext(GutkaContext);
  if (GlobalCtx.isEditMode) {
    return (

      <View style={card.editOpacity}>
        <Icon
          name="minus-circle"
          type='font-awesome'
          color='red'
          onPress={() => {
            GutkaCtx.removeFromGutka(props.id)
          }} />
        <Text style={card.header}>{props.title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={card.container} onPress={() => {
      GlobalCtx.updateCurrShabadID(props.id);
      props.navigation.navigate('ShabadViewer');
    }}>
      <Text style={card.header}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const card = StyleSheet.create({
  editOpacity: {
    flexDirection: "row",
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: '#FEFEFE',
    margin: 5,
    minHeight: 100,
    minWidth: 100,
  },
  container: {
    borderColor: 'black',
    backgroundColor: '#FEFEFE',
    margin: 10,
    minHeight: 100,
  },
  button: {
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
  header: {
    fontWeight: '400',
    fontSize: 20,
    padding: 5,
  },
  text: {
    fontSize: 20,
    padding: 5,
  }
});
export default ShabadButton;
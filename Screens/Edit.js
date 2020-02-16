import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { GutkaContext } from '../contexts/Contexts';


const Edit = ({ navigation }) => {
  const [inputVal, updateInputVal] = useState('Type Here...');
  const GutkaCtx = useContext(GutkaContext);
  const currentGutka = GutkaCtx.currentItems;
  return (
    currentGutka.map(item => {
      return (
        <Card.Title
          style={style.Card}
          title={`${item.mainLine}`}
          subtitle={`Shaabd ID: ${item.id}`}
          left={(props) => <Avatar.Icon {...props} icon="book" />}
          right={(props) => <IconButton {...props} color="red" icon="minus-circle" onPress={() => {
            GutkaCtx.removeFromGutka(item.id);
          }} />}
        />
      )
    })
  );
}

const style = StyleSheet.create({
  Searchbar: {
    backgroundColor: '#FEFEFE',
    marginTop: 15,
    marginHorizontal: 15,
    minHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Card: {
    margin: 5,
    backgroundColor: 'white'
  },

  // IconContainer: {
  //   marginLeft: 5,
  // },
  // Icon: {
  //   color: '#b0b0b0'
  // },
  // TextIn: {
  //   height: 40, borderColor: 'gray', borderWidth: 1, flex: 1,
  // }
})
export default Edit;
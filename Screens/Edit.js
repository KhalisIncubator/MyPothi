import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { Avatar, Card, IconButton, Button, Snackbar } from 'react-native-paper';
import { GutkaContext } from '../contexts/Contexts';


const Edit = ({ navigation }) => {
  const [showSnack, updateShow] = useState(false);
  const GutkaCtx = useContext(GutkaContext);
  const currentGutka = GutkaCtx.currentItems;
  const handleRemove = (id) => {
    GutkaCtx.removeFromGutka(id);
    updateShow(true);
  }
  return (
    <View style={style.View}>
      {currentGutka.map(item => {
        return (
          <Card.Title
            style={style.Card}
            title={`${item.mainLine}`}
            subtitle={`Shaabd ID: ${item.id}`}
            left={(props) => <Avatar.Icon {...props} icon="book" />}
            right={(props) => <IconButton {...props} color="red" icon="minus-circle" onPress={() => {
              handleRemove(item.id);
            }} />}
          />
        )
      })}
      <Snackbar
        visible={showSnack}
        onDismiss={() => updateShow(false)}
        style={style.Snack}
      >
        Shabad Removed!
        </Snackbar>
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    flexDirection: 'column'
  },
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
  Snack: {
    alignSelf: 'flex-end'
  }

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
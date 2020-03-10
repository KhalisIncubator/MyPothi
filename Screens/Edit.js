import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar, Card, IconButton, Snackbar } from 'react-native-paper';
import { GutkaContext } from '../contexts/Contexts';


const Edit = ({ route, navigation }) => {
  const [showSnack, updateShow] = useState(false);
  const [showError, updateErr] = useState(false);
  const GutkaCtx = useContext(GutkaContext);
  const currentGutka = GutkaCtx.currentItems;
  const { type } = route.params;

  const snack = `${type} Removed!`
  const handleRemoveShabad = (entryID, index) => {
    GutkaCtx.removeEntry(entryID, index);
    updateShow(true);
  }
  const handleRemoveGutka = (name, gutkaID, index) => {
    const position = index !== 0 ? index - 1 : index + 1
    GutkaCtx.updateCurrentName(GutkaCtx.gutkaNames[position][0], GutkaCtx.gutkaNames[position][1]);
    GutkaCtx.deleteAGutka(name, gutkaID, index);
    updateShow(true);
  }
  return (
    <View style={style.View}>
      {type === 'Shabad' && currentGutka.map((item, index) => {
        if (item.isValid()) {
          return (
            <Card.Title
              style={style.Card}
              key={index}
              titleStyle={style.CardTitleG}
              title={`${item.mainLine}`}
              subtitle={`Shaabd ID: ${item.shabadId}`}
              left={(props) => <Avatar.Icon {...props} icon="book" />}
              right={(props) => <IconButton {...props} color="red" icon="minus-circle" onPress={() => {
                handleRemoveShabad(item.entryID, index);
              }} />}
            />
          )
        }
      })}
      {type === 'Gutka' && GutkaCtx.gutkaNames.map((data, index) => {
        return (
          <Card.Title
            style={style.Card}
            key={index}
            title={`${data[0]}`}
            left={(props) => <Avatar.Icon {...props} icon="book" />}
            right={(props) => <IconButton {...props} color="red" icon="minus-circle" onPress={() => {
              if (GutkaCtx.gutkaNames.length === 1) {
                updateErr(true);
              } else {
                handleRemoveGutka(data[0], data[1], index);
              }
            }} />}
          />
        )
      })}
      <Snackbar
        visible={showSnack}
        onDismiss={() => updateShow(false)}
        style={style.Snack}
      >
        {snack}
      </Snackbar>
      <Snackbar
        visible={showError}
        onDismiss={() => updateErr(false)}
        style={style.Snack}
      >
        You cannot have less than one gutka!
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
  CardTitleG: {
    fontFamily: 'AnmolLipiTrue'
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
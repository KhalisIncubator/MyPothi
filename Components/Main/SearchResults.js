import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Avatar, Card, IconButton, Button, Snackbar } from 'react-native-paper';
import { GutkaContext, SearchContext } from '../../contexts/Contexts';

const SearchResult = (props) => {
  const { Gurmukhi, ID, Shabads } = props.result;
  const GutkaCtx = useContext(GutkaContext);
  const { queryType } = useContext(SearchContext)
  return (
    <TouchableOpacity
      onPress={() => GutkaCtx.addEntry(Shabads[0].ShabadID, Gurmukhi, queryType)}>
      <Card.Title
        style={style.Card}
        titleStyle={style.CardTitle}
        title={`${Gurmukhi}`}
        subtitle={`Shaabd ID: ${ID}`}
        left={(props) => <Avatar.Icon {...props} icon="book" />
        }
      />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    flexDirection: 'column'
  },
  Card: {
    margin: 5,
    backgroundColor: 'white',
  },
  CardTitle: {
    fontFamily: 'AnmolLipiTrue'
  },
  Snack: {
    alignSelf: 'flex-end'
  }
})
export default SearchResult;
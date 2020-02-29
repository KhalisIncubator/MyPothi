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
  const { verse, shabadId } = props.result;
  const GutkaCtx = useContext(GutkaContext);
  const { queryType } = useContext(SearchContext)
  return (
    <TouchableOpacity
      onPress={() => GutkaCtx.addEntry(shabadId, verse.gurmukhi, queryType)}>
      <Card.Title
        style={style.Card}
        titleStyle={style.CardTitle}
        title={`${verse.gurmukhi}`}
        subtitle={`Shaabd ID: ${shabadId}`}
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
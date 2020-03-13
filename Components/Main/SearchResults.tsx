import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  Avatar, Card,
} from 'react-native-paper';
import { GutkaContext, SearchContext } from '../../contexts/Contexts';

const SearchResult = ( props ) => {
  const { verse, shabadId } = props.result;
  const GutkaCtx = useContext( GutkaContext );
  const { queryType } = useContext( SearchContext );
  return (
        <TouchableOpacity
            onPress={() => GutkaCtx.addEntry( shabadId, verse.gurmukhi, queryType )
            }>
            <Card.Title
                style={style.Card}
                titleStyle={style.CardTitle}
                title={`${verse.gurmukhi}`}
                subtitle={`Shaabd ID: ${shabadId}`}
                left={( properties ) => <Avatar.Icon {...properties} icon="book" />}
            />
        </TouchableOpacity>
  );
};

const style = StyleSheet.create( {
  Card: {
    backgroundColor: 'white',
    margin: 5,
  },
  CardTitle: {
    fontFamily: 'AnmolLipiTrue',
  },
} );
export default SearchResult;

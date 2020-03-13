import React from 'react';
import {
  StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  Avatar, Card,
} from 'react-native-paper';
import { SearchCtx } from '../../config/app_state/easy-peasy/models';
import { useUpdaters } from '../../config/app_state/hooks';

const SearchResult = ( props ) => {
  const { verse, shabadId } = props.result;
  const { addEntry } = useUpdaters( 'currentModel' );
  const queryType = SearchCtx.useStoreState( ( store ) => store.queryType );
  return (
        <TouchableOpacity
            onPress={() => { addEntry( [ shabadId, verse.gurmukhi, queryType ] ); }
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

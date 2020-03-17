import React from 'react';
import {
  StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  Avatar, Card,
} from 'react-native-paper';
import { SearchCtx } from '../../app_config/app_state/easy-peasy/models';
import { useUpdaters } from '../../app_config/app_state/state_hooks';

const SearchResult = ( props ) => {
  const styling = props.theme;
  const { verse, shabadId } = props.result;
  const { addEntry } = useUpdaters( 'currentModel' );
  const queryType = SearchCtx.useStoreState( ( store ) => store.queryType );
  return (
        <TouchableOpacity
            onPress={() => { addEntry( [ shabadId, verse.gurmukhi, queryType ] ); }
            }>
            <Card.Title
                style={[ style.Card, { borderRadius: styling.roundness, backgroundColor: styling.colors.surface } ]}
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
    margin: 5,
  },
  CardTitle: {
    fontFamily: 'AnmolLipiTrue',
  },
} );
export default SearchResult;

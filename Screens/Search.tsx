import React, { useState, useEffect } from 'react';
import {
  Searchbar, Menu, Button, Text, useTheme,
} from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { SearchCtx } from '../app_config/app_state/easy-peasy/models';
import { SEARCH_TEXTS } from '../app_config/database/database_conts';
import query from '../app_config/database/banidb_api';

import SearchResult from '../Components/Main/SearchResults';


const Search = () => {
  const theme = useTheme();
  const [ searchQuery, updateQuery ] = useState( '' );
  const [ results, updateResults ] = useState( [] );
  const [ typeMenu, updateTypeM ] = useState( false );
  const [ searchMenu, updateSearchM ] = useState( false );

  const { searchType, queryType } = SearchCtx.useStoreState( ( store ) => ( { ...store } ) );
  const { updateQueryType, updateSeachType } = SearchCtx.useStoreActions( ( actions ) => ( { ...actions } ) );
  const net = useNetInfo();
  useEffect( () => {
    let cancelSearch = !net.isConnected;
    const fetchResults = async () => {
      const dbResults = await query( searchQuery, searchType );
      updateResults( [] );
      updateResults( [ ...dbResults ] );
    };
    if ( searchQuery.length > 0 && !cancelSearch ) {
      fetchResults();
    }
    return () => {
      cancelSearch = true;
    };
  }, [ searchQuery ] );
  return (
        <View style ={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={{ padding: 5 }}>
              <Searchbar
                  placeholder="Search"
                  inputStyle={ styles.input }
                  onChangeText={( newQuery ) => updateQuery( newQuery )}
                  value={searchQuery}
                  autoCapitalize="none"
                  theme={{ colors: { primary: 'white' } }}
              />
            </View>
            <View style={styles.row}>
                <Menu
                    visible={typeMenu}
                    onDismiss={() => updateTypeM( false )}
                    anchor={
                        <Button
                            style={[ styles.button, { backgroundColor: theme.colors.surface } ]}
                            color={theme.colors.text}
                            onPress={() => updateTypeM( true )}>
                            {queryType}
                        </Button>
                    }>
                    <Menu.Item
                        onPress={() => {
                          updateTypeM( false );
                          updateQueryType( 'Shabad' );
                        }}
                        title="Shabad"
                    />
                    <Menu.Item
                        onPress={() => {
                          updateTypeM( false );
                          updateQueryType( 'Bani' );
                        }}
                        title="Bani"
                    />
                </Menu>
                <Menu
                    visible={searchMenu}
                    onDismiss={() => updateSearchM( false )}
                    anchor={
                        <Button
                            style={[ styles.button, { backgroundColor: theme.colors.surface } ]}
                            color={theme.colors.text}
                            onPress={() => updateSearchM( true )}>
                            {SEARCH_TEXTS[searchType]}
                        </Button>
                    }>
                    {Object.entries( SEARCH_TEXTS ).map( ( text ) => {
                      const [ id, desc ] = text;
                      const newID = parseInt( id, 10 );
                      return (
                            <Menu.Item
                                onPress={() => {
                                  updateSeachType( newID );
                                  updateSearchM( false );
                                }}
                                title={`${desc}`}
                            />
                      );
                    } )}
                    {!net.isConnected && (
                        <View>
                            <Text>
                                Sorry you are not connected to the internet!
                            </Text>
                        </View>
                    )}
                </Menu>
            </View>
            <ScrollView>
                {results.length > 0
                    && results.map( ( result ) => <SearchResult theme={theme} result={result} /> )}
            </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create( {
  button: {
    marginTop: 8,
  },
  input: {
    fontFamily: 'AnmolLipiTrue',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
} );

const withSearchCtx = () => (
    <SearchCtx.Provider>
        <Search />
    </SearchCtx.Provider>
);
export default withSearchCtx;

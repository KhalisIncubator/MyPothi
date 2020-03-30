import React, { useState, useEffect, useCallback } from 'react';
import {
  Searchbar, Menu, Button, Text, useTheme,
} from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { SearchCtx, AddedCtx } from '../store/context_stores/Contexts';
import { SEARCH_TEXTS } from '../database/DatabaseConts';
import query, { fetchBanis } from '../database/BanidbApi';
import { BaniResult, SearchResult } from '../components/main/Results';
import { useValues, useUpdaters } from '../store/StateHooks';


const Search = () => {
  const theme = useTheme();
  const [ banis, updateBanis ] = useState( [] );
  const [ searchQuery, updateQuery ] = useState( '' );
  const [ results, updateResults ] = useState( [] );
  const [ typeMenu, updateTypeM ] = useState( false );
  const [ searchMenu, updateSearchM ] = useState( false );

  const { searchType, queryType } = SearchCtx.useStoreState( ( store ) => ( { ...store } ) );
  const { updateQueryType, updateSeachType } = SearchCtx.useStoreActions( ( actions ) => ( { ...actions } ) );
  const { currentItems } = useValues( 'currentModel' );
  const { addEntry } = useUpdaters( 'currentModel' );


  const addedItems = AddedCtx.useStoreState( ( state ) => state.addedItems );
  const updateItems = AddedCtx.useStoreActions( ( actions ) => actions.updateAddedItems );
  const net = useNetInfo();

  const onPress = useCallback( ( sID, gurmukhi ) => {
    addEntry( [ sID, gurmukhi, queryType ] );
    updateItems( sID );
  }, [ addEntry, queryType, updateItems ] );
  useEffect( () => {
    const baniFetcher = async () => {
      const fetched = await fetchBanis();
      updateBanis( [ ...fetched ] );
    };
    baniFetcher();
  }, [] );
  useEffect( () => {
    let cancelSearch = !net.isConnected;
    const fetchResults = async () => {
      const dbResults = await query( searchQuery, searchType );
      updateResults( [] );
      updateResults( [ ...dbResults ] );
    };
    if ( searchQuery.length > 1 && !cancelSearch ) {
      fetchResults();
    }
    return () => {
      cancelSearch = true;
    };
  }, [ searchQuery, net.isConnected, searchType ] );

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
                {queryType === 'Shabad' && results.length > 0
                    && results.map( ( result ) => {
                      const isAdded = currentItems.findIndex( ( item ) => item.shabadId === result.shabadId ) !== -1
                                    || addedItems.findIndex( ( id ) => id === result.shabadId ) !== -1;
                      return <SearchResult theme={theme} result={result} isAdded={isAdded}
                      onPress={() => { onPress( result.shabadId, result.verse.gurmukhi ); }}/>;
                    } )}
                    {queryType === 'Bani' && banis.map( ( bani ) => {
                      const isAdded = currentItems.findIndex( ( item ) => item.shabadId === bani.ID ) !== -1
                      || addedItems.findIndex( ( id ) => id === bani.ID ) !== -1;
                      return <BaniResult theme={theme} result={bani} isAdded={isAdded} onPress={() => { onPress( bani.ID, bani.gurmukhi ); }}/>;
                    } )}
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

const withCtxs = () => (
  <AddedCtx.Provider>
    <SearchCtx.Provider>
          <Search />
    </SearchCtx.Provider>
    </AddedCtx.Provider>

);
export default withCtxs;

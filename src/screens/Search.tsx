import React, { useState, useEffect, useCallback } from 'react';
import {
  Searchbar, Menu, Text, useTheme, Button, Title,
} from 'react-native-paper';
import {
  View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { useNetInfo } from '@react-native-community/netinfo';

import { SearchCtx } from '../store/context_stores/Contexts';
import { SEARCH_TEXTS } from '../database/DatabaseConts';
import query, { fetchBanis } from '../database/BanidbApi';
import { BaniResult, SearchResult } from '../components/main/Results';
import { useValues, useUpdaters } from '../store/StateHooks';


const Search = () => {
  const theme = useTheme();

  const [ searchQuery, updateQuery ] = useState( '' );

  const [ banis, updateBanis ] = useState( [] );
  const [ results, updateResults ] = useState( [] );


  const [ typeMenu, updateTypeM ] = useState( false );
  const [ searchMenu, updateSearchM ] = useState( false );


  const { searchType, queryType } = SearchCtx.useStoreState( ( store ) => ( {
    ...store,
  } ) );
  const { updateQueryType, updateSeachType } = SearchCtx.useStoreActions( ( actions ) => ( {
    ...actions,
  } ) );
  const { showModal, text } = useValues( 'modalModel' );
  const { currentItems } = useValues( 'currentModel' );
  const { addEntry } = useUpdaters( 'currentModel' );


  const { addedItems } = useValues( 'addedModel' );
  const { updateAddedItems } = useUpdaters( 'addedModel' );
  const net = useNetInfo();

  const onPress = useCallback( ( sID, gurmukhi ) => {
    addEntry( [ sID, gurmukhi, queryType ] );
    updateAddedItems( sID );
  }, [ addEntry, queryType, updateAddedItems ] );
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
    <SafeAreaView style={{
      backgroundColor: theme.colors.background, 
      flex: 1,
    }}
    >
      <Modal
        testID="downloadingModal"
        isVisible={showModal}
        useNativeDriver
      >
        <SafeAreaView style={[ styles.content,
        {
          backgroundColor: theme.colors.surface,
           borderRadius: theme.roundness,
        } ]}
        >
          <View style={{
            padding: 10,
          }}
          >
            <Title style={{
              color: theme.colors.text,
            }}
            >
              {text}
            </Title>
            <ActivityIndicator color="white" />
          </View>

        </SafeAreaView>
      </Modal>
      <View style={{
        padding: 5,
      }}
      >
        <Searchbar
          placeholder="Search"
          inputStyle={styles.input}
          autoCompleteType="off"
          autoCorrect={false}
          onChangeText={( newQuery ) => updateQuery( newQuery )}
          value={searchQuery}
          autoCapitalize="none"
          theme={{
            colors: {
              primary: 'white',
            },
          }}
        />
      </View>
      <View style={styles.row}>
        <Menu
          visible={typeMenu}
          onDismiss={() => updateTypeM( false )}
          anchor={(
            <Button
              style={[ styles.button, {
                backgroundColor: theme.colors.surface,
              } ]}
              color={theme.colors.text}
              onPress={() => updateTypeM( true )}
            >
              {queryType}
            </Button>
                      )}
        >
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
          anchor={(
            <Button
              style={[ styles.button, {
                backgroundColor: theme.colors.surface,
              } ]}
              color={theme.colors.text}
              onPress={() => updateSearchM( true )}
            >
              {SEARCH_TEXTS[searchType]}
            </Button>
                      )}
        >
          {Object.entries( SEARCH_TEXTS ).map( ( searchText ) => {
            const [ id, desc ] = searchText;
            const newID = parseInt( id, 10 );
            return (
              <Menu.Item
                onPress={() => {
                  updateSeachType( newID );
                  updateSearchM( false );
                }}
                key={id}
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
        {queryType === 'Shabad' && results.length > 0 && results.map( ( result ) => {
          const isAdded = currentItems.findIndex( ( item ) => item.shabadId === result.shabadId ) !== -1
                                    || addedItems.findIndex( ( id ) => id === result.shabadId ) !== -1;

          const addedCount = addedItems.filter( ( id ) => id === result.shabadId ).length;

          return (
            <SearchResult
              key={result.gurmukhi}
              theme={theme}
              result={result}
              isAdded={isAdded}
              addCount={addedCount || null}
              onPress={() => {
                Alert.alert(
                  'Confirm Addition',
                  'Are you sure you want to add this to your pothi?',
                  [
                    {
                      text: 'Ok',
                      onPress: () => { onPress( result.shabadId, result.verse.gurmukhi ); },
                      style: 'cancel',
                    },
                    {
                      text: 'Cancel',
                    },
                  ],
                  {
                    cancelable: false,
                  },
                );
              }}
            />
          );
        } )}
        {queryType === 'Bani' && banis.map( ( bani ) => {
          const isAdded = currentItems.findIndex( ( item ) => item.shabadId === bani.ID ) !== -1
                      || addedItems.findIndex( ( id ) => id === bani.ID ) !== -1;

          const addedCount = addedItems.filter( ( id ) => id === bani.ID ).length;
          return (
            <BaniResult
              key={bani.gurmukhi}
              theme={theme}
              result={bani}
              isAdded={isAdded}
              addCount={addedCount || null}
              onPress={() => {
                Alert.alert(
                  'Confirm Addition',
                  'Are you sure you want to add this to your pothi?',
                  [
                    {
                      text: 'Ok',
                      onPress: () => { onPress( bani.ID, bani.gurmukhi ); },
                      style: 'cancel',
                    },
                    {
                      text: 'Cancel',
                    },
                  ],
                  {
                    cancelable: false,
                  },
                );
              }}
            />
          );
        } )}
      </ScrollView>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create( {
  button: {
    margin: 8,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#FFA500',
    justifyContent: 'center',
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
  <SearchCtx.Provider>
    <Search />
  </SearchCtx.Provider>
);
export default withCtxs;

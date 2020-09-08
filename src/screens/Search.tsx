import { useNetInfo } from '@react-native-community/netinfo'
import React, { useCallback, useEffect, useState, useReducer, ReducerAction, useRef } from 'react'
import {
  ActivityIndicator, Alert,
  SafeAreaView, ScrollView, StyleSheet, View,
} from 'react-native'
import Modal from 'react-native-modal'
import {
  Chip,
  Menu,  Text, Title,
} from 'react-native-paper'
import { BaniResult, SearchResult } from '../components/Results'
import query, { fetchBanis } from '../database/BanidbApi'
import { SEARCH_TEXTS } from '../database/DatabaseConts'
import { SearchCtx } from '../store/context_stores/Contexts'
import { useUpdaters, useValues } from '../store/StateHooks'
import { SearchBar } from '../components/SearchComponents'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '../utils/Hooks'

const InitialSearchState = {
  searchQuery: '',
  banis: [],
  results: [],
  showQueryTypeMenu: false,
  showSearchMethodMenu: false
}

const SearchStateReducer = ( state:typeof InitialSearchState, action ) => {
  switch( action.type ) {
    case 'updateQuery': 
      console.log( action, state )
      return { ...state, searchQuery: action.payload }
    case 'updateBanis':
      return { ...state, banis: action.payload }
    case 'updateResults':
      return { ...state, results: action.payload }
    case 'toggleQueryTypeMenu': 
      return { ...state, showQueryTypeMenu: !state.showQueryTypeMenu }
    case 'toggleSearchMethodMenu':
      return { ...state, showSearchMethodMenu: !state.showSearchMethodMenu }
  }
}
const Search = () => {
  const [ theme ] = useTheme()

  const [ searchState, dispatch ] = useReducer( SearchStateReducer, InitialSearchState )
  const [ searchQuery, updateQuery ] = useState( '' )
  const SearchBarRef = useRef( null )

  const [ banis, updateBanis ] = useState( [] )
  const [ results, updateResults ] = useState( [] )


  const [ typeMenu, updateTypeM ] = useState( false )
  const [ searchMenu, updateSearchM ] = useState( false )


  const { searchType, queryType } = SearchCtx.useStoreState( ( store ) => ( {
    ...store,
  } ) )
  const { updateQueryType, updateSeachType } = SearchCtx.useStoreActions( ( actions ) => ( {
    ...actions,
  } ) )
  const { currentItems } = useValues( 'currentModel' )
  const { addEntry } = useUpdaters( 'currentModel' )


  const { addedItems } = useValues( 'addedModel' )
  const { updateAddedItems } = useUpdaters( 'addedModel' )
  const net = useNetInfo()

  const onPress = useCallback( ( sID, gurmukhi ) => {
    addEntry( [ sID, gurmukhi, queryType ] )
    updateAddedItems( {
      sID,
      queryType,
    } )
  }, [ addEntry, queryType, updateAddedItems ] )
  useEffect( () => {
    const baniFetcher = async () => {
      const fetched = await fetchBanis()
      updateBanis( [ ...fetched ] )
    }
    baniFetcher()
  }, [] )
  useEffect( () => {
    let cancelSearch = !net.isConnected
    const fetchResults = async () => {
      const dbResults = await query( searchState.searchQuery, searchType )
      updateResults( [ ...dbResults ] )
      console.log( searchState )
    }
    if ( !!searchState.searchQuery && !cancelSearch ) {
      fetchResults()
    }
    return () => {
      cancelSearch = true
    }
  }, [ searchState.searchQuery, net.isConnected, searchType ] )
  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.background,
      flex: 1,
    }}
    >
      <View style={{
        padding: 5,
      }}
      >
        <SearchBar
          ref={SearchBarRef}
          icon="search"
          theme={theme}
          placeholder="Search..."
          autoCorrect={false}
          autoCapitalize="none"
          rightIcon={<Icon name="check" size={25} color="green" />}
          onTextInput={() => { 
          dispatch( { type: "updateQuery", payload: SearchBarRef.current.getValue() } )}}
        />
      </View>
      <View style={styles.row}>
        <Menu
          visible={typeMenu}
          onDismiss={() => updateTypeM( false )}
          anchor={(
            <Chip
              style={[ styles.button, {
                backgroundColor: theme.colors.surface,
              } ]}
              // color={theme.colors.text}
              onPress={() => updateTypeM( true )}
            >
              {queryType}
            </Chip>
                      )}
        >
          <Menu.Item
            onPress={() => {
              updateTypeM( false )
              updateQueryType( 'Shabad' )
            }}
            title="Shabad"
          />
          <Menu.Item
            onPress={() => {
              updateTypeM( false )
              updateQueryType( 'Bani' )
            }}
            title="Bani"
          />
        </Menu>
        <Menu
          visible={searchMenu}
          onDismiss={() => updateSearchM( false )}
          anchor={(
            <Chip
              style={[ styles.button, {
                backgroundColor: theme.colors.surface,
              } ]}
              onPress={() => updateSearchM( true )}
            >
              {SEARCH_TEXTS[ searchType ]}
            </Chip>
                      )}
        >
          {Object.entries( SEARCH_TEXTS ).map( ( searchText ) => {
            const [ id, desc ] = searchText
            const newID = parseInt( id, 10 )
            return (
              <Menu.Item
                onPress={() => {
                  updateSeachType( newID )
                  updateSearchM( false )
                }}
                key={id}
                title={`${desc}`}
              />
            )
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
        {queryType === 'Shabad' && results.length > 0 && results.map( ( [ info, result ] ) => {
          const isAdded = currentItems.findIndex( ( item ) => item.shabadId === result.shabadId ) !== -1
                                    || addedItems.findIndex( ( item ) => item.sID === result.shabadId && item.queryType === 'Shabad' ) !== -1

          const addedCount = addedItems.filter( ( item ) => item.sID === result.shabadId ).length

          return (
            <SearchResult
              key={result.gurmukhi}
              info={info}
              theme={theme}
              result={result}
              isAdded={isAdded}
              addedCount={addedCount || null}
              onPress={() => {
                Alert.alert(
                  'Confirm Addition',
                  'Are you sure you want to add this to your pothi?',
                  [
                    {
                      text: 'Cancel',
                    },
                    {
                      text: 'Ok',
                      onPress: () => { onPress( result.shabadId, result.verse.gurmukhi ) },
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: false,
                  },
                )
              }}
            />
          )
        } )}
        {queryType === 'Bani' && banis.map( ( bani ) => {
          const isAdded = currentItems.findIndex( ( item ) => item.shabadId === bani.ID ) !== -1
                      || addedItems.findIndex( ( item ) => item.sID === bani.ID && item.queryType === 'Bani' ) !== -1
          return (
            <BaniResult
              key={bani.gurmukhi}
              theme={theme}
              result={bani}
              isAdded={isAdded}
              onPress={() => {
                Alert.alert(
                  'Confirm Addition',
                  'Are you sure you want to add this to your pothi?',
                  [
                    {
                      text: 'Ok',
                      onPress: () => { onPress( bani.ID, bani.gurmukhi ) },
                      style: 'cancel',
                    },
                    {
                      text: 'Cancel',
                    },
                  ],
                  {
                    cancelable: false,
                  },
                )
              }}
            />
          )
        } )}
      </ScrollView>
    </SafeAreaView>


  )
}

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
    fontFamily: 'OpenGurbaniAkhar',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
} )

const withCtxs = () => (
  <SearchCtx.Provider>
    <Search />
  </SearchCtx.Provider>
)
export default withCtxs

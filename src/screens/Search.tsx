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
  const SearchBarRef = useRef( null )

  const [ banis, updateBanis ] = useState( [] )
  const [ results, updateResults ] = useState( [] )


  const [ typeMenu, updateTypeM ] = useState( false )
  const [ searchMenu, updateSearchM ] = useState( false )


  const net = useNetInfo()

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
      </View>
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

export default Search

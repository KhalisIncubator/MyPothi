import { useNetInfo } from '@react-native-community/netinfo'
import React, { useCallback, useEffect, useState, useReducer, ReducerAction, useRef } from 'react'
import {
  ActivityIndicator, Alert,
  SafeAreaView, ScrollView, StyleSheet, View, Keyboard,
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
import { SearchCard } from '../components/Card'

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

  const net = useNetInfo()
  useEffect( () => {
   const fetchResults = async () => {
        const dbResults = await query( searchState.searchQuery, 1 )
        dispatch( { type: 'updateResults', payload: dbResults } )
      }
      if ( searchState.searchQuery.length > 1 && net.isConnected ) {
        fetchResults()
      }
  }, [ searchState.searchQuery, net.isConnected ] )

  return (
    <SafeAreaView style={styles.page } >
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
      <View style={styles.row}>
        
      </View>
      
      <ScrollView onScroll={() => {
        Keyboard.dismiss()
        }}>
        {searchState.results.map( result => <SearchCard title={result[ 1 ].verse.gurmukhi} /> )}
        </ScrollView> 
    </SafeAreaView>


  )
}

const styles = StyleSheet.create( {
  input: {
    fontFamily: 'OpenGurbaniAkhar',
  },
  page:{
    margin: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
} )

export default Search

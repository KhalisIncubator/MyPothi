import { useNetInfo } from '@react-native-community/netinfo'
import React, {  useEffect, useReducer } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import query from '../../database/BanidbApi'
import { SearchBar } from './SearchComponents'  
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '../../store/Theme'
import { SearchCard } from './SearchComponents'
import { Page } from '../../components/Page'

type SearchState = {
  searchQuery: string,
  banis: any[],
  results: any[],
  showQueryTypeMenu: boolean,
  showSearchMethodMenu: boolean
}
const InitialSearchState: SearchState = {
  searchQuery: '',
  banis: [],
  results: [],
  showQueryTypeMenu: false,
  showSearchMethodMenu: false
}
const SearchStateReducer = ( state: any, action: any ) => {
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
  const [ searchState, dispatch ] = useReducer<React.Reducer<SearchState, any>>( SearchStateReducer, InitialSearchState )
  const net = useNetInfo()
  useEffect( () => {
   const fetchResults = async () => {
        const dbResults = await query( searchState.searchQuery, 1 )
        dispatch( { type: 'updateResults', payload: dbResults } )
      }
      if ( searchState.searchQuery.length > 1 && net.isConnected ) {
        fetchResults()
      }

  },[ searchState.searchQuery, net.isConnected ] )
  return (
    <Page>
        <SearchBar
          icon="search"
          theme={theme}
          placeholder="Search..."
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={( text: string ) => {
            dispatch( { type: 'updateQuery', payload: text } )
          }}
          rightIcon={<Icon name="check" size={25} color="green" />}
        />
      <View style={styles.row}>
        
      </View>
      
      <ScrollView style={styles.ScrollView} >
        {searchState.results.map( result => ( <SearchCard result={result} key={result[ 1 ].verse.gurmukhi}/> )
         )}
        </ScrollView> 
    </Page>


  )
}

const styles = StyleSheet.create( {
  ScrollView: {
    height: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
} )

export { Search }

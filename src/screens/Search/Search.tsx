import React, { useReducer } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import  { query } from '../../database/BanidbApi'
import { SearchBar } from './SearchComponents'  
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from 'store/Theme'
import { SearchCard } from './SearchComponents'
import { Page } from 'components/Page'
import { useObservable } from 'utils/Hooks'

type SearchState = {
  searchQuery: string,
  banis: any[],
  showQueryTypeMenu: boolean,
  showSearchMethodMenu: boolean
}
const InitialSearchState: SearchState = {
  searchQuery: '',
  banis: [],
  showQueryTypeMenu: false,
  showSearchMethodMenu: false
}
const SearchStateReducer = ( state: any, action: any ) => {
  switch( action.type ) {
    case 'updateQuery': 
      return { ...state, searchQuery: action.payload }
    case 'updateBanis':
      return { ...state, banis: action.payload }
    case 'toggleQueryTypeMenu': 
      return { ...state, showQueryTypeMenu: !state.showQueryTypeMenu }
    case 'toggleSearchMethodMenu':
      return { ...state, showSearchMethodMenu: !state.showSearchMethodMenu }
  }
}
const Search = () => {
  const [ theme ] = useTheme()
  const [ searchState, dispatch ] = useReducer<React.Reducer<SearchState, any>>( SearchStateReducer, InitialSearchState )
  const [ results ] = useObservable( () => query( searchState.searchQuery, 1 ), [], [ searchState.searchQuery ] )
  return (
    <Page>
        <SearchBar
          icon="search"
          style={styles.SearchBar}
          placeholder="Koj..."
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
        {results.map( ( result, indx: number ) => ( <SearchCard result={result} key={`${result.verse.gurmukhi}-${indx}`}/> )
         )}
        </ScrollView> 
    </Page>


  )
}

const styles = StyleSheet.create( {
  ScrollView: {
    height: '100%'
  },
  SearchBar: {
    fontFamily: 'OpenGurbaniAkhar'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
} )

export { Search }

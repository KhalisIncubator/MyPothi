import React, { useReducer } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { fetchShabad, query } from '../../database/BanidbApi'
import { Popup, SearchBar } from './SearchComponents'
import Icon from 'react-native-vector-icons/Feather'
import { SearchCard } from './SearchComponents'
import { Page } from 'components/Page'
import { useCurrentPothi, useObservable } from 'utils/Hooks'
import { createShabadHTML } from 'utils/GenerateHTML'

type SearchState = {
  searchQuery: string,
  banis: any[],
  showQueryTypeMenu: boolean,
  showSearchMethodMenu: boolean,
  showConfirmModal: boolean,
  selectedID: [number, number],
}
const InitialSearchState: SearchState = {
  searchQuery: '',
  banis: [],
  showQueryTypeMenu: false,
  showSearchMethodMenu: false,
  showConfirmModal: false,
  selectedID: [ 0, 0 ],
}
const SearchStateReducer = ( state: any, action: any ) => {
  switch ( action.type ) {
    case 'updateQuery':
      return { ...state, searchQuery: action.payload }
    case 'updateBanis':
      return { ...state, banis: action.payload }
    case 'toggleQueryTypeMenu':
      return { ...state, showQueryTypeMenu: !state.showQueryTypeMenu }
    case 'toggleSearchMethodMenu':
      return { ...state, showSearchMethodMenu: !state.showSearchMethodMenu }
    case 'toggleConfirmModal':
      return { ...state, showConfirmModal: !state.showConfirmModal, selectedID: action.payload }
  }
}
const Search = () => {
  const [ searchState, dispatch ] = useReducer<React.Reducer<SearchState, any>>( SearchStateReducer, InitialSearchState )
  const [ results ] = useObservable( () => query( searchState.searchQuery, 1 ), [], [ searchState.searchQuery ] )

  const onShabadPressed = ( ids: [number, number] ) => {
    dispatch( { type: 'toggleConfirmModal', payload: ids } )
  }
  const downloadShabad = async ( pothi: Pothi ) => {
    const [ shabadID, verseID ] = searchState.selectedID
    const shabad = await fetchShabad( shabadID )
    pothi.addShabad( createShabadHTML( shabad[ 1 ] ), shabad[ 1 ].find( verse => verse.verseID === verseID )?.gurmukhi ?? 'main line not found' )
  }
  return (
    <Page>
      <Popup
        isVisible={searchState.showConfirmModal}
        closePopUp={() => dispatch( { type: 'toggleConfirmModal', payload: 0 } )}
        onConfirm={downloadShabad}
      />
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
        {results.map( ( result, indx ) => ( <SearchCard result={result} onPressed={onShabadPressed} key={`${result.verse.gurmukhi}-${indx}`} /> )
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
  modal: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
} )

export { Search }

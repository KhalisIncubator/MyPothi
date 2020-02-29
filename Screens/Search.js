import React, { useState, useContext, useEffect } from 'react';
import { Searchbar, useTheme, Menu, Button, Divider } from 'react-native-paper';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SearchContext } from '../contexts/Contexts';
import { SEARCH_TEXTS } from '../config/database/database_conts';
import query from '../config/database/banidb_api';
import SearchResult from '../Components/Main/SearchResults';
const Search = () => {
  const SearchCtx = useContext(SearchContext);

  const [searchQuery, updateQuery] = useState('');
  const [results, updateResults] = useState([]);
  const [typeMenu, updateTypeM] = useState(false);
  const [searchMenu, updateSearchM] = useState(false);
  useEffect(() => {
    const fetchResults = async () => {
      const results = await query(searchQuery, SearchCtx.searchType);
      updateResults([]);
      results.forEach(result => updateResults(prevArr => [...prevArr, result]))
    }
    if (searchQuery.length > 0) {
      fetchResults();
    }
    return true
  }, [searchQuery]);
  return (
    <View>
      <Searchbar
        placeholder="Search"
        inputStyle={styles.input}
        onChangeText={searchQuery => updateQuery(searchQuery)}
        value={searchQuery}
        autoCapitalize='none'
        theme={{ colors: { primary: 'white' } }}
      />
      <View style={styles.row}>
        <Menu
          visible={typeMenu}
          onDismiss={() => updateTypeM(false)}
          anchor={
            <Button style={styles.button} onPress={() => updateTypeM(true)}>{SearchCtx.queryType}</Button>
          }
        >
          <Menu.Item onPress={() => {
            updateTypeM(false)
            SearchCtx.updateQueryType('Shabad')
          }} title="Shabad" />
          <Menu.Item onPress={() => {
            updateTypeM(false)
            SearchCtx.updateQueryType('Bani')
          }} title="Bani" />
        </Menu>
        <Menu
          visible={searchMenu}
          onDismiss={() => updateSearchM(false)}
          anchor={
            <Button style={styles.button} onPress={() => updateSearchM(true)}>{SEARCH_TEXTS[SearchCtx.searchType]}</Button>
          }
        >
          {Object.entries(SEARCH_TEXTS).map((text) => {
            const [id, desc] = text;
            return <Menu.Item onPress={() => {
              SearchCtx.updateSearchType(id);
              updateSearchM(false);
            }} title={`${desc}`} />
          })}
        </Menu>
      </View>
      <ScrollView>
        {results.length > 0 &&
          results.map(result => {
            return (
              <SearchResult result={result} />
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'AnmolLipiTrue',
  },
  button: {
    marginTop: 8,
    backgroundColor: 'white',

  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-evenly'
  }
});
export default Search;
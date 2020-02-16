import React, { useState } from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
const Search = (props) => {
  const [query, updateQuery] = useState('');
  const theme = useTheme();
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { updateQuery(query) }}
        value={query}
        theme={{ colors: { primary: 'white' } }}
      />
    </View>
  );
}

export default Search;
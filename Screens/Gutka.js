import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import ShabadButton from '../Components/Main/ShabadButton';

import { GutkaContext, GlobalContext, ViewerContext } from '../contexts/Contexts';
import { loadShabad } from '../config/database/database';

const Gutka = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  const GlobalCtx = useContext(GlobalContext);
  const [shabads, updateShabads] = useState([]);

  //when items update, load their shabads
  useEffect(() => {
    const getLines = async () => {
      for (const item of GutkaCtx.currentItems) {
        const shabad = await loadShabad(item.id);
        updateShabads(prevArr => [...prevArr, shabad]);
      }
    }
    getLines();
  }, [GutkaCtx.currentItems]);
  //empty out array when name changes to refill array with correct items
  useEffect(() => {
    updateShabads([]);
  }, [GlobalCtx.currentName])

  // render each shabad inside of flatlist
  const renderItem = ({ item }) => {
    let lines = [];
    lines = item.map(line => {
      return <Text>{line.Gurmukhi}</Text>
    })
    return (
      <View>
        {lines}
      </View>
    )
  }
  return (
    <View style={styles.View}>
      {GutkaCtx.isDataReady &&
        GutkaCtx.currentItems.length != undefined &&
        shabads.length != 0 &&
        <FlatList
          data={shabads}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      }
      {
        !GutkaCtx.isDataReady &&
        <Text>Loading...</Text>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  View: {
    flex: 1,
  }
})
export default Gutka;
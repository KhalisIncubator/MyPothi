import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import { GutkaContext, GlobalContext, ViewerContext } from '../contexts/Contexts';
import { loadShabad, remapLine } from '../config/database/database';
import LineBlock from '../Components/Main/LineBlock';

// { navigation }
const Gutka = () => {
  const GutkaCtx = useContext(GutkaContext);
  const [shabads, updateShabads] = useState([]);

  //when items update, load their shabads
  useEffect(() => {
    const getLines = async () => {
      let newItems = []
      for (const item of GutkaCtx.currentItems) {
        const shabad = await loadShabad(item.id);
        newItems.push(shabad);
      }
      updateShabads(newItems);
    }
    getLines();
  }, [GutkaCtx.currentItems.length, GutkaCtx.isDataReady, GutkaCtx.currentName, GutkaCtx.gutkaNames.length]);
  //[GutkaCtx.currentItems.length, GutkaCtx.isDataReady, GutkaCtx.currentName]
  // render each shabad inside of flatlist
  const renderItem = ({ item }) => {
    let lines = [];
    lines = item.map(line => {
      const normalized = remapLine(line);
      return <LineBlock key={normalized.ID} line={normalized} />
    })
    return (
      <View key='Viewer'>
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
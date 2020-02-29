import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import { getCurrentItems } from '../config/database/local_database';

import { GutkaContext } from '../contexts/Contexts';
import { loadShabad, remapLine } from '../config/database/database';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';

const Gutka = () => {
  const GutkaCtx = useContext(GutkaContext);
  const [shabads, updateShabads] = useState([]);
  const [dataLoading] = useState(GutkaCtx.isDataReady);
  //when items update, load their shabads
  useEffect(() => {
    const getLines = async () => {
      let newItems = [];
      for (const item of GutkaCtx.currentItems) {
        const shabad = await loadShabad(item.id);
        newItems.push(shabad);
      }
      updateShabads(newItems);
    }
    if (GutkaCtx.isDataReady && GutkaCtx.currentItems.length > 0) {
      getLines();
    } else if (GutkaCtx.isDataReady && GutkaCtx.currentItems.length === 0) {
      updateShabads([]);
    }

  }, [GutkaCtx.currentItems, GutkaCtx.isDataReady, GutkaCtx.currentName]);
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
      {
        dataLoading &&
        <>
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
        </>
      }
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
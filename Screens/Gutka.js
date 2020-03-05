import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import { GutkaContext } from '../contexts/Contexts';
import { loadShabad } from '../config/database/banidb_api';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';

const Gutka = () => {
  const GutkaCtx = useContext(GutkaContext);
  const [shabads, updateShabads] = useState([]);
  const [dataLoading, updateLoading] = useState(true);
  //when items update, load their shabads
  const net = useNetInfo();
  useEffect(() => {
    const getLines = async () => {
      let newItems = [];
      for (const item of GutkaCtx.currentItems) {
        const shabad = await loadShabad(item.id);

        newItems.push(shabad);
      }
      updateShabads(newItems);
      updateLoading(false);
    }
    if (GutkaCtx.isDataReady && GutkaCtx.currentItems.length > 0) {
      getLines();
    } else if (GutkaCtx.isDataReady && GutkaCtx.currentItems.length === 0) {
      updateShabads([]);
      updateLoading(false);
    }
  }, [GutkaCtx.currentItems, GutkaCtx.isDataReady, GutkaCtx.currentName]);
  const renderItem = ({ item }) => {
    let lines = [];
    lines = item.map(line => {
      return <LineBlock key={line.id} line={line} />
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
        (dataLoading && GutkaCtx.isDataReady) &&
        <>
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
          <ShimmeringLine />
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
    </View>
  );
}
const styles = StyleSheet.create({
  View: {
    flex: 1,
  }
})
export default Gutka;
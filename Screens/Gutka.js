import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
// import { useNetInfo } from '@react-native-community/netinfo';

import { GutkaContext, EditContext } from '../contexts/Contexts';
import { loadShabad } from '../config/database/banidb_api';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';
import Toolbar from '../Components/Main/Toolbar';

const Gutka = () => {
  const GutkaCtx = useContext(GutkaContext);
  const { isEditMode, updateEditMode, updateLineID } = useContext(EditContext);
  const [shabads, updateShabads] = useState([]);
  const [dataLoading, updateLoading] = useState(true);

  useEffect(() => { updateLoading(true) }, [GutkaCtx.currentName]);

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
      <View style={styles.Footer}>
        <Toolbar showMain={isEditMode} updateMode={updateEditMode} updateLine={updateLineID} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
  Footer: {
    width: '100%',
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  }
})
export default Gutka;
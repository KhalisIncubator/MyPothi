import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import ShabadButton from '../Components/Main/ShabadButton';
import MainHeader from '../Components/navigation/MainHeader';

import { GutkaContext, GlobalContext, ViewerContext } from '../contexts/Contexts';
import { loadShabad } from '../config/database/database';

const Gutka = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  const GlobalCtx = useContext(GlobalContext);
  const [shabads, updateShabads] = useState([]);
  useEffect(() => {
    const getLines = async () => {
      for (const item of GutkaCtx.currentItems) {
        const shabad = await loadShabad(item.id);
        updateShabads(prevArr => [...prevArr, shabad]);
      }
    }
    getLines();
    console.log(GutkaCtx.currentItems.length)
  }, [GutkaCtx.currentItems]);
  useEffect(() => {
    updateShabads([]);
  }, [GlobalCtx.currentName])
  return (
    <View style={styles.View}>
      <MainHeader navigation={navigation} />
      {GutkaCtx.isDataReady &&
        GutkaCtx.currentItems.length != undefined &&
        shabads.length != 0 &&
        shabads.map((item, index) => {
          return (
            // <ShabadButton title={item.mainLine} id={index} key={index} navigation={navigation} />
            <Text>{shabads[index][0].Gurmukhi}</Text>
          )
        })
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
    backgroundColor: '#f5f5f5',
    flex: 1,
  }
})
export default Gutka;
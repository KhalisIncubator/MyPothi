import React, { useContext, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import { GutkaContext, GlobalContext, ViewerContext } from '../Contexts/Contexts';
import ShabadButton from '../Components/Main/ShabadButton';
import MainHeader from '../Components/navigation/MainHeader';
const Gutka = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  const GlobalCtx = useContext(GlobalContext);
  const ViewerCtx = useContext(ViewerContext);

  if (!GutkaCtx.isDataReady) {
    return (
      <View style={styles.View}>
        <MainHeader navigation={navigation} tempHeading="Loading..." />
      </View>
    );
  }
  return (
    <View style={styles.View}>
      <MainHeader navigation={navigation} />
      {GutkaCtx.isDataReady &&
        GutkaCtx.currentItems.length != undefined &&
        GutkaCtx.currentItems.map((item, index) => {
          return (
            <ShabadButton title={item.id} id={index} key={index} navigation={navigation} />
          )
        })
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
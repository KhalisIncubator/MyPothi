import React, { useContext, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import ShabadButton from '../Components/Main/ShabadButton';
import MainHeader from '../Components/navigation/MainHeader';

import { GutkaContext, GlobalContext, ViewerContext } from '../Contexts/Contexts';

const Gutka = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
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
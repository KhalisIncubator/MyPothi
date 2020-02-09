import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import { Header } from 'react-native-elements';
import { GutkaContext, GlobalContext, ViewerContext } from '../Contexts/Contexts';
import HeaderIcon from '../Components/navigation/HeaderIcon';
import { fetchGukas } from '../Config/GutkaStorage';
import ShabadButton from '../Components/Main/ShabadButton';
import MainHeader from '../Components/navigation/MainHeader';
import LoadingItems from '../Components/Drawer/LoadingItems';
import { FlatList } from 'react-native-gesture-handler';
import Shabad from './Shabad';
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
        GutkaCtx.currentItems.map(item => {
          return (
            <View>
              <ShabadButton title={item.id} navigation={navigation} />
            </View>
          )
        })}
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
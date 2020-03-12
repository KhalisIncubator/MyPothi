import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import { useMainStoreState } from '../config/app_state/easy-peasy/hooks';

import shallowEqual from 'shallowequal';
import { loadShabad } from '../config/database/banidb_api';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';
import Toolbar from '../Components/Main/Toolbar';
import { EditCtx } from '../config/app_state/easy-peasy/models';

const Gutka = () => {
  const [shabads, updateShabads] = useState([]);
  const [dataLoading, updateLoading] = useState(true);
  // const { isEditMode, updateEditMode, selectedLineID, removeSelection } = useContext(EditContext);
  const [isEditMode, selectedInfo] = EditCtx.useStoreState(store => [
    store.isEditMode,
    store.selectedInfo
  ], shallowEqual);

  const [currentName, currentItems] = useMainStoreState(store => [
    store.currentModel.currentName,
    store.currentModel.currentItems
  ], shallowEqual);

  const isDataReady = useMainStoreState(store => store.gutkaModel.isDataReady);

  const [updateEditMode, updatedSelectedInfo] = EditCtx.useStoreActions(actions => [
    actions.updateEditMode,
    actions.updatedSelectedInfo
  ], shallowEqual)

  useEffect(() => { updateLoading(true) }, [currentName[0]]);
  useEffect(() => {
    const getLines = async () => {
      let newItems = [];
      for (const item of currentItems) {
        const shabad = await loadShabad(item.shabadId);
        newItems.push(shabad);
      }
      updateShabads(newItems);
      updateLoading(false);
    }
    if (isDataReady && currentItems.length > 0) {
      getLines();
    } else if (isDataReady && currentItems.length === 0) {
      updateShabads([]);
      updateLoading(false);
    }
  }, [currentItems, isDataReady, currentName[0]]);
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
        (dataLoading && isDataReady) &&
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
      {isDataReady &&
        currentItems.length != undefined &&
        shabads.length != 0 &&
        <FlatList
          data={shabads}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      }
      <View style={styles.Footer}>
        <Toolbar showMain={isEditMode} updateMode={updateEditMode} currentLine={selectedInfo} />
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
  },
})

const withEditCtx = () => (<EditCtx.Provider><Gutka /></EditCtx.Provider>);
export default withEditCtx;
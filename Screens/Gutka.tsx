import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useMainStoreState } from '../app_config/app_state/easy-peasy/hooks';

import { loadShabad } from '../app_config/database/banidb_api';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';
import Toolbar from '../Components/Main/Toolbar';
import { EditCtx } from '../app_config/app_state/easy-peasy/models';
import { useValues } from '../app_config/app_state/state_hooks';

const Gutka = () => {
  const theme = useTheme();
  const [ shabads, updateShabads ] = useState( [] );
  const [ dataLoading, updateLoading ] = useState( true );
  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );

  const { currentName, currentItems } = useValues( 'currentModel' );

  const isDataReady = useMainStoreState(
    ( store ) => store.gutkaModel.isDataReady,
  );

  const { updateEditMode } = EditCtx.useStoreActions( ( actions ) => ( { ...actions } ) );
  useEffect( () => {
    updateLoading( true );
  }, [ currentName[0] ] );

  useEffect( () => {
    const getLines = async () => {
      // if currentItems has a length greater than 0, get all the lines, otherwise set the array to empty
      const newItems = currentItems ? await Promise.all( currentItems.map( ( item ) => loadShabad( item.shabadId ) ) ) : [ ];
      updateShabads( newItems );
      updateLoading( false );
    };
    if ( isDataReady && currentItems.length > 0 ) {
      getLines();
    } else if ( isDataReady && currentItems.length === 0 ) {
      updateShabads( [] );
      updateLoading( false );
    }
  }, [ currentItems, isDataReady, currentName[0] ] );

  const renderItem = ( { item, index } ) => {
    const mods = currentItems[index]?.mods ?? null;
    const lines = item.map( ( line ) => <LineBlock key={line.id} line={line}
    // if currentItems is not length of 0, and if the item at the index has a entryID (need to check because is null when item is deleted and state is
    // uodated). Otherwise if currentItems has length of 0, then set id to null
      entryID={ currentItems[index]?.entryID ?? null}
      mods={ mods ? Object.values( mods ) : null }/> );
    return <View key="Viewer">{lines}</View>;
  };
  return (
        <View style={[ styles.View, { backgroundColor: theme.colors.background } ]}>
            {dataLoading && isDataReady && (
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
            )}
            {isDataReady
                && currentItems.length !== undefined
                && shabads.length !== 0 && (
                    <FlatList
                        data={shabads}
                        keyExtractor={( item, index ) => index.toString()}
                        renderItem={renderItem}
                    />
            )}
            <View style={styles.Footer}>
                <Toolbar
                    showMain={isEditMode}
                    updateMode={updateEditMode}
                    currentLine={selectedInfo}
                />
            </View>
        </View>
  );
};
const styles = StyleSheet.create( {
  Footer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  View: {
    flex: 1,
  },
} );

const withEditCtx = () => (
    <EditCtx.Provider>
        <Gutka />
    </EditCtx.Provider>
);
export default withEditCtx;

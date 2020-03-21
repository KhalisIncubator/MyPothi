import React, { useState, useEffect, useMemo } from 'react';
import {
  View, FlatList, StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useMainStoreState } from '../app_config/app_state/easy-peasy/hooks';

import { loadShabad, loadBani, parseLines } from '../app_config/database/banidb_api';
import LineBlock from '../Components/Main/LineBlock';
import ShimmeringLine from '../Components/Main/ShimmeringBlock';
import Toolbar from '../Components/Main/Toolbar';
import HighlightSelector from '../Components/Main/HighlightSelector';


import { EditCtx } from '../app_config/app_state/easy-peasy/models';
import { useValues } from '../app_config/app_state/state_hooks';
import { mapModsToArray } from '../app_config/functions';

const Gutka = () => {
  const theme = useTheme();

  const [ shabads, updateShabads ] = useState( [] );
  const [ dataLoading, updateLoading ] = useState( true );
  const [ isHighlighterVis, toggleHighligher ] = useState( false );

  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );
  const { currentName, currentItems } = useValues( 'currentModel' );
  const { baniLength } = useValues( 'viewerModel' );

  const numBanis = useMemo( () => currentItems.reduce( ( count, { type } ) => ( type === 'Bani' ? count + 1 : 0 ), 0 ), [ currentItems.length ] );


  const isDataReady = useMainStoreState(
    ( store ) => store.gutkaModel.isDataReady,
  );

  const { updateEditMode } = EditCtx.useStoreActions( ( actions ) => ( { ...actions } ) );
  useEffect( () => {
    updateLoading( true );
  }, [ currentName[0], numBanis ] );

  useEffect( () => {
    const getLines = async () => {
      // if currentItems has a length greater than 0, get all the lines, otherwise set the array to empty
      const newItems = currentItems ? currentItems.map( ( item ) => parseLines( item ) ) : [];
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
    const lines = item.map( ( line ) => ( <LineBlock key={line.id} line={line}
    // if currentItems is not length of 0, and if the item at the index has a entryID (need to check because is null when item is deleted and state is
    // uodated). Otherwise if currentItems has length of 0, then set id to null
      entryID={ currentItems[index]?.entryID ?? null}
      mods={mapModsToArray( currentItems[index]?.mods )}/> ) );
    return <View key="Viewer">{lines}</View>;
  };
  return (
    <View style={styles.View}>
        <View style={{ flexGrow: 1, flexShrink: 1, backgroundColor: theme.colors.background }}>
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
                            {isHighlighterVis && (
                <HighlightSelector style={styles.Highlighter} currentLine={selectedInfo}/>
                            )}
    </View>

        <Toolbar
        toggleHighligher={() => { toggleHighligher( ( prev ) => !prev ); }}
            style={styles.Footer}
            showMain={isEditMode}
            updateMode={updateEditMode}
            currentLine={selectedInfo}
          />
    </View>
  );
};
const styles = StyleSheet.create( {
  Footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Highlighter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingBottom: 5,
    width: '100%',
  },
  View: {
    alignContent: 'space-between',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
} );

const withEditCtx = () => (
    <EditCtx.Provider>
        <Gutka />
    </EditCtx.Provider>
);
export default withEditCtx;

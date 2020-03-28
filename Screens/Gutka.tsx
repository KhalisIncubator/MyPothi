/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useEffect, useCallback, useLayoutEffect,
} from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import ShimmeringLine from '../Components/Main/ShimmeringBlock';
import Toolbar from '../Components/Main/Toolbar';
import HighlightSelector from '../Components/Main/HighlightSelector';
import Gutkas from '../app_config/defaults';

import { EditCtx } from '../app_config/app_state/easy-peasy/models';
import { useValues } from '../app_config/app_state/state_hooks';
import Viewer from '../Components/Main/Viewer';
import { parseLines } from '../app_config/database/banidb_api';
import { entryObj } from '../app_config/dev_env/types';
import Skeleton from '../Components/Main/Skeleton';
import { useLoading } from '../app_config/app_state/easy-peasy/isolated_stores';

const Gutka = () => {
  const theme = useTheme();

  const [ isHighlighterVis, toggleHighligher ] = useState( false );
  const [ loadingState, loadingUpdater ] = useLoading();
  const [ shabads, updateShabads ] = useState( [] );
  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );
  const {
    currentName, currentItems,
  } = useValues( 'currentModel' );

  const [ gutkaName ] = currentName;

  const { isLoading } = loadingState;
  const { updateLoading } = loadingUpdater;
  const { updateEditMode } = EditCtx.useStoreActions( ( actions ) => ( { ...actions } ) );
  useEffect( () => {
    updateLoading( true );
  }, [ gutkaName ] );
  useEffect( () => {
    updateShabads( ( currentItems.map( ( item ) => parseLines( item ) ) ) );
    // return ( () => false );
  }, [ currentItems ] );
  useEffect( () => { console.log( 'changed', isLoading ); }, [ isLoading ] );
  const setLoadingFalse = useCallback( () => { updateLoading( false ); }, [ updateLoading ] );
  return (
    <View style={styles.View}>
        <View style={{ flexGrow: 1, flexShrink: 1, backgroundColor: theme.colors.background }}>
        {isLoading && (
            <Skeleton />
        )}
             <Viewer currentItems={currentItems} currentLines={shabads} currentMods={[]} updateLoading={setLoadingFalse} isLoading={isLoading}/>
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

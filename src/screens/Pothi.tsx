/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import HighlightSelector from '../components/main/HighlightSelector';
import ShimmeringLine from '../components/main/ShimmeringBlock';
import Toolbar from '../components/main/Toolbar';
import Viewer from '../components/main/Viewer';
import { parseLines } from '../database/BanidbApi';
import { EditCtx, FullScreenCtx } from '../store/context_stores/Contexts';
import { useValues } from '../store/StateHooks';

const Gutka = () => {
  const theme = useTheme();
  const doubleTapRef = useRef();
  const [ shabads, updateShabads ] = useState( [] );
  const [ isHighlighterVis, toggleHighligher ] = useState( false );
  const [ isLoadingData, updateLoading ] = useState( true );

  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );
  const isFullScreen = FullScreenCtx.useStoreState( ( store ) => store.isFullScreen );
  const updateFullScreen = FullScreenCtx.useStoreActions( ( actions ) => actions.toggleMode );

  const {
    currentName, currentItems,
  } = useValues( 'currentModel' );

  const handleTap = ( e ) => {
    if ( e.nativeEvent.state === State.ACTIVE && !isEditMode ) {
      updateFullScreen();
    }
  };
  const [ gutkaName ] = currentName;
  const { updateEditMode } = EditCtx.useStoreActions( ( actions ) => ( { ...actions } ) );

  useEffect( () => {
    SplashScreen.hide();
  }, [] );
  useEffect( () => {
    updateLoading( true );
  }, [ gutkaName ] );
  useEffect( () => {
    const getLines = async () => {
      const newLines = currentItems.length ? await Promise.all( currentItems.map( ( item ) => parseLines( item ) ) ) : [];
      updateShabads( newLines );
      updateLoading( false );
    };
    setTimeout( () => getLines(), 0 );
  }, [ currentItems ] );


  return (
    <TapGestureHandler
      ref={doubleTapRef}
      onHandlerStateChange={handleTap}
      numberOfTaps={2}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.View}>
          <View style={{
            flexGrow: 1,
            flexShrink: 1,
            backgroundColor: theme.colors.background,
          }}
          >
            {isLoadingData && (
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
              <ShimmeringLine />


            </>
            )}
            {!isLoadingData
            && <Viewer currentItems={currentItems} currentLines={shabads} currentMods={[]} />}

          </View>

          {isHighlighterVis && (
          <HighlightSelector style={styles.Highlighter} currentLine={selectedInfo} />
          )}
          {!isFullScreen
         && (
         <Toolbar
           toggleHighligher={() => { toggleHighligher( ( prev ) => !prev ); }}
           isHighlighterOn={isHighlighterVis}
           style={styles.Footer}
           showMain={isEditMode}
           updateMode={updateEditMode}
           currentLine={selectedInfo}
         />
         )}
        </View>
      </View>
    </TapGestureHandler>
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

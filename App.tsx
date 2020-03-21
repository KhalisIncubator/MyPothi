/* eslint-disable quotes */
/* eslint-disable import/extensions */
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Feather';
import store from './app_config/app_state/easy-peasy/models';

import { useMainStoreActions } from './app_config/app_state/easy-peasy/hooks';
import {
  fetchAllGutkas,
  getCurrentItems,
  populateData,
  isDataEmpty,
} from './app_config/database/local_database';

import Gutkas from './app_config/defaults';

import Routes from './Routes';
import { useValues } from './app_config/app_state/state_hooks';

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2C2F33',
    accent: '#99AAB5',
    backdrop: '#FFA500',
    background: '#e7e7e7',
    surface: '#c6cfd4',
    text: '#000',
  },
};

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#2C2F33',
    backdrop: '#FFA500',
    text: '#FFFFFF',
  },
};

const App = () => {
  const rehydrated = useStoreRehydrated();
  const { isDarkMode } = useValues( 'themeModel' );
  const initCurrUpdate = useMainStoreActions(
    ( actions ) => actions.currentModel.initialUpdate,
  );
  const initialGutkaUpdate = useMainStoreActions(
    ( actions ) => actions.gutkaModel.initialUpdate,
  );

  // const netInfo = useNetInfo();

  const checkStore = async () => {
    if ( isDataEmpty() ) {
      await populateData();
    }
    console.log( );
  };
  useEffect( () => { SplashScreen.hide(); }, [] );
  useEffect( () => {
    checkStore().then( async () => {
      const names = fetchAllGutkas();
      const items = getCurrentItems( names[0][0], names[0][1] );
      initCurrUpdate( [ names[0], items ] );
      initialGutkaUpdate( [ names, true ] );
    } );
  }, [] );

  return (
    <PaperProvider
    theme={isDarkMode ? darkTheme : theme}
    settings={{
      icon: ( props ) => <Icon {...props} />,
    }}>
        {rehydrated && <Routes />}
    </PaperProvider>
  );
};
const withStore = () => (
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

export default withStore;

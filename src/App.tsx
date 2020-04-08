/* eslint-disable quotes */
/* eslint-disable import/extensions */
import 'react-native-gesture-handler';

import React, { useEffect, useMemo } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Feather';
import { View, useColorScheme } from 'react-native';
import store from './store/MainStore';


import Routes from './Routes';
import { useValues } from './store/StateHooks';

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

const trueDark = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#000000',
    backdrop: '#FFA500',
    text: '#FFFFFF',
  },
};

const App = () => {
  const rehydrated = useStoreRehydrated();
  const { isDarkMode, trueDarkMode, choseSystem } = useValues( 'themeModel' ).theme;
  const systemTheme = useColorScheme();
  // const netInfo = useNetInfo();
  const decideTheme = useMemo( () => {
    if ( choseSystem ) return systemTheme === 'dark' ? ( trueDarkMode ? trueDark : darkTheme ) : theme;
    return trueDarkMode ? trueDark : ( isDarkMode ? darkTheme : theme );
  }, [ isDarkMode, trueDarkMode, choseSystem, systemTheme ] );
  useEffect( () => {
    if ( rehydrated ) {
      SplashScreen.hide();
    }
  }, [ rehydrated ] );

  return (
    <PaperProvider
    theme={decideTheme}
    settings={{
      icon: ( props ) => <Icon {...props} />,
    }}>
       <View style={{ flex: 1, backgroundColor: '#FFA500' }}>
        {rehydrated && <Routes />}
        </View>
    </PaperProvider>
  );
};
const withStore = () => (
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

export default withStore;

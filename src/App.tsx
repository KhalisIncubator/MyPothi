/* eslint-disable react/display-name */
/* eslint-disable quotes */
/* eslint-disable import/extensions */
import 'react-native-gesture-handler';

import { StoreProvider } from 'easy-peasy';
import React, {
  lazy,
  Suspense,
  useMemo,
} from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import { MyPothiTheme } from '../types/types';
import store from './store/MainStore';
import { useValues } from './store/StateHooks';

const Routes = lazy( () => import( './Routes' ) );

const theme: MyPothiTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    backdrop: '#FFA500',
    background: '#e7e7e7',
    surface: '#c6cfd4',
    text: '#000',
    notification: '#e7e7e7',
  },
  customTypes: {
    lineHighlight: '#c6cfd4',
  },
};

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#2C2F33',
    backdrop: '#FFA500',
    text: '#FFFFFF',
    notification: '#2C2F33',
    customType: {
      lineHighlight: '#52555a',
    },


  },
};

const trueDark = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#000000',
    backdrop: '#FFA500',
    text: '#FFFFFF',
    notification: '#2C2F33',
    customType: {
      lineHightlight: '#2C2F33',
    },
  },
};

const App = () => {
  const { isDarkMode, trueDarkMode, choseSystem } = useValues( 'themeModel' ).theme;
  const systemTheme = useColorScheme();
  const decideTheme = useMemo( () => {
    if ( choseSystem ) return systemTheme === 'dark' ? ( trueDarkMode ? trueDark : darkTheme ) : theme;
    return trueDarkMode ? trueDark : ( isDarkMode ? darkTheme : theme );
  }, [ isDarkMode, trueDarkMode, choseSystem, systemTheme ] );
  return (
    <PaperProvider
      theme={decideTheme}
      settings={{
        icon: ( props ) => <Icon {...props} />,
      }}
    >

      <Suspense fallback={(
        <View style={{
          flex: 1,
          backgroundColor: '#FFA500',
        }}
        />
)}
      >
        <Routes />
      </Suspense>
    </PaperProvider>
  );
};
const withStore = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

export default withStore;

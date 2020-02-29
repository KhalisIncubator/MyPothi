import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { fetchSettings } from './config/app_state/functions';
import { downloadDB, checkIfDbExists, loadShabad, downloadProg, $dbPath } from './config/database/database';
import LocalRelam from './config/realm_schema';
import { useApi } from './config/app_state/Hooks';
import { initialGutkaState, initialGlobalState, initialViewerState, initalSearchState } from './config/app_state/initial_state';
import { GutkaContext, ViewerContext, SearchContext } from './contexts/Contexts';
import Routes from './Routes';
import {
  gutkaAPIFactory,
  viewerApiFactory,
  searchApiFactory
} from './config/app_state/api_factories';
import Gutka from './Screens/Gutka';
import { fetchAllGutkas, populateData, isDataEmpty, getCurrentItems } from './config/database/local_database';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#FFA500',
    header: "#FFA500"
  },
};

const App = () => {
  const gutkaApi = useApi(gutkaAPIFactory, initialGutkaState);
  const viewerApi = useApi(viewerApiFactory, initialViewerState);
  const searchApi = useApi(searchApiFactory, initalSearchState);

  const netInfo = useNetInfo();

  const checkDB = async () => {
    if (netInfo.isConnected && !(await checkIfDbExists())) {

      if (isDataEmpty()) {
        Promise.all([populateData(), downloadDB()]);
      } else {
        Promise.all([downloadDB()])
      }
    }

  }
  useEffect(() => {
    checkDB()
      .then(async () => {
        gutkaApi.updateGutkas();
        gutkaApi.updateItems();
        gutkaApi.updateIsReady(true);
      })

  }, [])
  // pile contexts on top of each other dynamically
  const contexts = [
    [GutkaContext.Provider, gutkaApi],
    [ViewerContext.Provider, viewerApi],
    [SearchContext.Provider, searchApi],
  ]
    .reduce((piledContexts: any, [CtxProvider, value]) => children => piledContexts(
      <CtxProvider value={value}>
        {children}
      </CtxProvider>
    ), context => context);
  return contexts(
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  )
}
export default App;
import 'react-native-gesture-handler';

import React, { useEffect, useContext } from 'react';
import { DefaultTheme, Portal, Provider as PaperProvider } from 'react-native-paper';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchSettings } from './config/app_state/functions';
import { downloadDB, checkIfDbExists, loadShabad, downloadProg } from './config/database/database';
import { useApi } from './config/app_state/Hooks';
import { initialGutkaState, initialGlobalState, initialViewerState, initalSearchState } from './config/app_state/initial_state';
import { GlobalContext, GutkaContext, ViewerContext, SearchContext } from './contexts/Contexts';
import Routes from './Routes';
import {
  gutkaAPIFactory,
  globalApiFactory,
  viewerApiFactory,
  searchApiFactory
} from './config/app_state/api_factories';
import { GutkaApi, GlobalApi, ViewerApi, SearchApi } from './config/dev_env/types';
import Gutka from './Screens/Gutka';
import { fetchAllGutkas, getCurrentItems } from './config/database/local_database';

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
  const gutkaApi: GutkaApi = useApi(gutkaAPIFactory, initialGutkaState);
  const globalApi: GlobalApi = useApi(globalApiFactory, initialGlobalState);
  const viewerApi: ViewerApi = useApi(viewerApiFactory, initialViewerState);
  const searchApi: SearchApi = useApi(searchApiFactory, initalSearchState);

  useEffect(() => {
    const checkDB = async () => {
      NetInfo.fetch().then(async state => {
        if (state.isConnected && !(await checkIfDbExists())) {
          await downloadDB();
        }
      });
    }
    checkDB();
    const gutkas = fetchAllGutkas();
    const currentName = gutkas[0];

    gutkaApi.updateCurrentName(currentName);
    gutkaApi.gutkaNames = gutkas;
    gutkaApi.currentItems = getCurrentItems(currentName);
  }, [])
  // pile contexts on top of each other dynamically
  const contexts = [
    [GutkaContext.Provider, gutkaApi],
    [GlobalContext.Provider, globalApi],
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
      <Gutka />
    </PaperProvider>
  )
}
export default App;
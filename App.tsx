import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import NetInfo from '@react-native-community/netinfo';
import { fetchSettings } from './config/app_state/functions';
import { downloadDB, checkIfDbExists, loadShabad, downloadProg } from './config/database/database';
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
import { fetchAllGutkas, getCurrentItems, populateData } from './config/database/local_database';

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

  useEffect(() => {
    const checkDB = async () => {
      NetInfo.fetch().then(async state => {
        if (state.isConnected && !(await checkIfDbExists())) {
          await downloadDB();
        }
      });
    }
    checkDB();
    populateData();
    const gutkas = fetchAllGutkas();
    const currentName = gutkas[0];

    const items = getCurrentItems(currentName)
    gutkaApi.updateCurrentName(currentName);
    gutkaApi.updateItems(items);
    gutkaApi.updateIsReady(true);
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
      <Gutka />
    </PaperProvider>
  )
}
export default App;
/* eslint-disable import/extensions */
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { StoreProvider } from 'easy-peasy';
import Icon from 'react-native-vector-icons/Feather';
import store from './config/app_state/easy-peasy/models';

import { useMainStoreActions } from './config/app_state/easy-peasy/hooks';
import {
  fetchAllGutkas,
  getCurrentItems,
  populateData,
  isDataEmpty,
} from './config/database/local_database';

// import { useNetInfo } from '@react-native-community/netinfo';

import { useApi } from './config/app_state/hooks';

import {
  initialGutkaState,
  initialViewerState,
  initalSearchState,
  initialEditState,
} from './config/app_state/initial_state';
import {
  GutkaContext,
  ViewerContext,
  SearchContext,
  EditContext,
} from './contexts/Contexts';
import Routes from './Routes';
import {
  gutkaAPIFactory,
  viewerApiFactory,
  searchApiFactory,
  editApiFactory,
} from './config/app_state/api_factories';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#FFA500',
    surface: '#FFA500',
  },
};

const App = () => {
  const gutkaApi = useApi( gutkaAPIFactory, initialGutkaState );
  const viewerApi = useApi( viewerApiFactory, initialViewerState );
  const editApi = useApi( editApiFactory, initialEditState );
  const searchApi = useApi( searchApiFactory, initalSearchState );

  const initCurrUpdate = useMainStoreActions(
    ( actions ) => actions.currentModel.initialUpdate,
  );
  const initialGutkaUpdate = useMainStoreActions(
    ( actions ) => actions.gutkaModel.initialUpdate,
  );

  // const netInfo = useNetInfo();

  const checkDB = async () => {
    if ( isDataEmpty() ) {
      await populateData();
    }
  };
  useEffect( () => {
    checkDB().then( async () => {
      gutkaApi.updateGutkas();
      gutkaApi.updateItems();
      gutkaApi.updateIsReady( true );

      const names = fetchAllGutkas();
      const items = getCurrentItems( names[0][0], names[0][1] );
      initCurrUpdate( [ names[0], items ] );
      initialGutkaUpdate( [ names, true ] );
    } );
  }, [] );
  // pile contexts on top of each other dynamically
  const contexts = [
    [ GutkaContext.Provider, gutkaApi ],
    [ ViewerContext.Provider, viewerApi ],
    [ SearchContext.Provider, searchApi ],
    [ EditContext.Provider, editApi ],
  ].reduce(
    ( piledContexts: any, [ CtxProvider, value ] ) => ( children ) => piledContexts( <CtxProvider value={value}>{children}</CtxProvider> ),
    ( context ) => context,
  );

  return contexts(
        <PaperProvider
            theme={theme}
            settings={{
              icon: ( props ) => <Icon {...props} />,
            }}>
            <Routes />
        </PaperProvider>,
  );
};
const withStore = () => (
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

export default withStore;

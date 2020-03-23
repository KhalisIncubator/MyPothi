import shallowEqual from 'shallowequal';
import { useMainStoreState, useMainStoreActions } from './easy-peasy/hooks';

const useValues = ( model: string ) => useMainStoreState( ( store ) => ( { ...store[model] } ), shallowEqual );
const useUpdaters = ( model: string ) => useMainStoreActions( ( actions ) => ( actions[model] ) );

export { useValues, useUpdaters };

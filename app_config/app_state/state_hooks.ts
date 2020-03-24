import _ from 'lodash';
import { useMainStoreState, useMainStoreActions } from './easy-peasy/hooks';

const useValues = ( model: string ) => useMainStoreState( ( store ) => ( { ...store[model] } ), _.isEqual );
const useUpdaters = ( model: string ) => useMainStoreActions( ( actions ) => ( actions[model] ) );

export { useValues, useUpdaters };

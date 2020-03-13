import { useMemo, useState } from 'react';
import shallowEqual from 'shallowequal';
import { useMainStoreState, useMainStoreActions } from './easy-peasy/hooks';
/**
 *
 * @param apiFactory a factory that produces all the functions for an 'api' (container for context values)
 * @param initialState state to be used on first app load
 */
const useApi = (apiFactory, initialState) => {
    let [state, setState] = useState(initialState);
    // only regenerate the factory when the state changes
    return useMemo(() => apiFactory({ state, setState }), [
        state,
        setState,
        apiFactory,
    ]);
};

const useValues = (model: string) =>
    useMainStoreState(store => {
        // console.log('ur values rerendered');
        return { ...store[model] };
    }, shallowEqual);
const useUpdaters = (model: string) =>
    useMainStoreActions(actions => {
        return { ...actions[model] };
    });

export { useApi, useValues, useUpdaters };

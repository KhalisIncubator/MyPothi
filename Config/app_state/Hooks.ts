import { useMemo, useState, useEffect } from 'react';

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
    apiFactory
  ]);
};

const useMountEffect = (fn) => useEffect(fn, []);
export {
  useApi,
  useMountEffect
}
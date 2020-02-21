import { useMemo, useState } from 'react';
const useApi = (apiFactory, initialState) => {
  let [state, setState] = useState(initialState);
  // return useMemo(() => gutkaApiFactory({ state, setState }), [
  //   state,
  //   setState,
  //   apiFactory
  // ]);
};

export {
  useApi
}
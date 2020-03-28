import {
  action, createContextStore, createComponentStore, Action,
} from 'easy-peasy';

interface LoadingModel {
  isLoading: boolean;
  updateLoading: Action<LoadingModel, boolean>
}
const loadingModel: LoadingModel = {
  isLoading: true,
  updateLoading: action( ( state, payload ) => { state.isLoading = payload; } ),
};

const useLoading = createComponentStore( loadingModel );

export { useLoading };

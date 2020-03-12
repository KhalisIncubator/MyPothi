import { createTypedHooks } from 'easy-peasy'
import { StoreModel } from './interfaces'


const StoreHooks = createTypedHooks<StoreModel>();

const useMainStoreActions = StoreHooks.useStoreActions;
const useMainStoreDispatch = StoreHooks.useStoreDispatch;
const useMainStoreState = StoreHooks.useStoreState;

export {
  useMainStoreActions,
  useMainStoreDispatch,
  useMainStoreState
}
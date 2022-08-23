import { createStore, createTypedHooks, action, persist, PersistStorage } from 'easy-peasy';
import storeModel, { StoreModel } from '../model';

interface storageType  {
    storage :'localStorage' | 'sessionStorage' | PersistStorage;
}
let StorageValue :storageType = {
    storage: 'localStorage'
}
const store = createStore<StoreModel,storageType>(persist(storeModel,StorageValue));

export default store

const typedHooks = createTypedHooks<StoreModel>();

// We export the hooks from our store as they will contain the
// type information on them
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
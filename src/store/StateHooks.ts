import { ActionCreator } from 'easy-peasy';
import _ from 'lodash';

import { Element, entryObj, pothiEntry } from '../../types/types';
import { EditCtx } from './context_stores/Contexts';
import { Info } from './Interfaces';
import { useMainStoreActions, useMainStoreState } from './TsHooks';

const useValues = ( model: string ) => useMainStoreState( ( store ) => ( { ...store[model] } ), _.isEqual );
const useUpdaters = ( model: string ) => useMainStoreActions( ( actions ) => ( actions[model] ) );

export { useValues, useUpdaters };

// EDIT CONTEXT
const useEditMode = () => [ EditCtx.useStoreState( ( store ) => store.isEditMode ) ];

const useSelectionInfo = ():[[number, Element, string], ActionCreator<[number, Element, string]>] => {
  const selectionInfo = EditCtx.useStoreState( ( store ) => store.selectedInfo );
  const updateSelectedInfo = EditCtx.useStoreActions( ( actions ) => actions.updatedSelectedInfo );

  return [
    selectionInfo,
    updateSelectedInfo,
  ];
};


// CURRENT MODEL

const useCurrent = (): [string[], entryObj[]] => {
  const currentName = useMainStoreState( ( store ) => store.currentModel.currentName );
  const currentItems = useMainStoreState( ( store ) => store.currentModel.currentItems );

  return [ currentName, currentItems ];
};

// (ActionCreator<[number, string, string[], pothiEntry, Info]> | ActionCreator<void> | ActionCreator<[string, number]>)[]
const useEntry = ():
    [ActionCreator<[number, string, string[], pothiEntry, Info]>, ActionCreator<void>,
    ActionCreator<[string, number]>] => {
  const addEntry = useMainStoreActions( ( actions ) => actions.currentModel.addedEntry );
  const undoCreate = useMainStoreActions( ( actions ) => actions.currentModel.undoCreation );
  const removeEntry = useMainStoreActions( ( actions ) => actions.currentModel.removeEntry );


  return [ addEntry, undoCreate, removeEntry ];
};

export {
  useEditMode, useSelectionInfo, useCurrent, useEntry,
};

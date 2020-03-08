import produce from 'immer';
import { SearchType, QueryType, gutkaEntry, Element } from '../dev_env/types';
import { createNewGukta, fetchAllGutkas, getCurrentItems, deleteGukta, addToGutka, removeFromGutka } from '../database/local_database';

import _ from 'lodash';

const gutkaAPIFactory = ({ state, setState }) => {

  const createGutka = (newName: string) => {
    createNewGukta(newName);
    updateGutkas();
  }
  const updateGutkas = () => {
    const names = fetchAllGutkas();
    setState(
      produce(draftState => {
        draftState.gutkaNames = names;
        if (state.currentName === "") {
          draftState.currentName = names[0];
        }
      })
    )
  }
  const updateItems = (altName?: string) => {
    const items = getCurrentItems(state.currentName || altName);
    // use _.isEquals to compare the modified lines
    setState(
      produce(draftState => {
        draftState.currentItems = items;
      })
    )
  }
  const updateIsReady = (newVal: boolean) => {
    setState(
      produce(draftState => {
        draftState.isDataReady = newVal;
      })
    )
  }
  const updateCurrentName = (newName: string) => {
    const newitems = getCurrentItems(newName);
    setState(
      produce(draftState => {
        draftState.currentName = newName;
        draftState.currentItems = newitems;
      })
    )
  }
  const deleteAGutka = (name: string, index: number) => {
    deleteGukta(name, index);
    updateGutkas();
  }
  const addEntry = (id: number, mainLine: string, type: gutkaEntry) => {
    addToGutka(state.currentName, id, mainLine, type);
    updateItems(state.currentName);
  }
  const removeEntry = (id: number) => {
    removeFromGutka(state.currentName, id);
    updateItems(state.currentName);
  }
  const { gutkaNames, currentName, currentItems, isDataReady } = state;
  return {
    gutkaNames,
    currentName,
    currentItems,
    isDataReady,

    createGutka,
    updateItems,
    updateGutkas,
    updateIsReady,
    updateCurrentName,
    deleteAGutka,
    addEntry,
    removeEntry
  }
}
const editApiFactory = ({ state, setState }) => {
  const {
    isEditMode,
    selectedLineID,
    selectedElement,
  } = state;


  const updateEditMode = () => {
    setState(produce(draftState => {
      draftState.isEditMode = !draftState.isEditMode
    }))
  }
  const updateLineID = (id: number | null) => {
    setState(produce(draftState => {
      draftState.selectedLineID = id
    }))
  }
  const updateSelectedE = (element: Element) => {
    setState(produce(draftState => {
      draftState.selectedElement = element
    }))
  }

  return {
    isEditMode,
    selectedLineID,
    selectedElement,

    updateEditMode,
    updateLineID,
    updateSelectedE,
  }
}
const viewerApiFactory = ({ state, setState }) => {
  const {
    gurmukhiSize,
    translSize,
    translitSize,
    displayEngTransl,
    displayPunTansl,
    displayTranslit,
  } = state;

  const updateElementDisplay = (newVal: number, element: string) => {
    const displaySetting = `display${element}`;
    setState(prevState =>
      ({
        ...prevState,
        [displaySetting]: newVal,
      })
    )
  }
  const updateFontSize = (newSize: number, element: number) => {
    const fontSetting = `${element}Size`;
    setState(prevState =>
      ({
        ...prevState,
        [fontSetting]: newSize,
      })

    )
  }
  return {
    gurmukhiSize,
    translSize,
    translitSize,
    displayEngTransl,
    displayPunTansl,
    displayTranslit,

    updateElementDisplay,
    updateFontSize,
  }
}
const searchApiFactory = ({ state, setState }) => {
  const { searchType, queryType } = state;
  const updateSearchType = (newType: SearchType) => {
    setState(
      produce(draftState =>
        draftState.searchType = newType
      ));
  }
  const updateQueryType = (newType: QueryType) => {
    setState(produce(draftState => draftState.queryType = newType));
  }
  return {
    searchType,
    queryType,
    updateSearchType,
    updateQueryType,
  }
}
export {
  gutkaAPIFactory,
  viewerApiFactory,
  editApiFactory,
  searchApiFactory
}
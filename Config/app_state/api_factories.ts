import produce from 'immer';

const gutkaAPIFactory = ({ state, setState }) => {
  const createGutka = (newName: string) => {
    // saveGutkaToRealm(newName);
    setState(
      produce(draftState =>
        draftState.gutkaNames.push(newName)));
  }
  const { gutkaNames, currentName, currentItems, isDataReady } = state;
  return {
    gutkaNames,
    currentName,
    currentItems,
    isDataReady,

    createGutka,
  }
}
export {
  gutkaAPIFactory
}
const initialGutkaState = {
  gutkaNames: [],
  currentName: [ '', '' ],
  currentItems: [],
  isDataReady: false,
};
const initialViewerState = {
  gurmukhiSize: 30,
  translSize: 16,
  translitSize: 16,
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,
};
const initialEditState = {
  isEditMode: true,
  selectedLineID: 40935,
  selectedElement: 'Pangtee',
};
const initalSearchState = {
  searchType: 0,
  queryType: 'Shababd',
};
export {
  initialGutkaState,
  initialEditState,
  initialViewerState,
  initalSearchState,
};

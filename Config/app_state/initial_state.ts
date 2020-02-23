const initialGutkaState = {
  gutkaNames: [],
  currentName: "",
  currentItems: [],
  isDataReady: false,
}
const initialGlobalState = {
  currentName: '',
}
const initialViewerState = {
  gurmukhiSize: 12,
  translSize: 12,
  translitSize: 12,
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,
}
const initalSearchState = {
  searchType: 0,
  queryType: 'Shababd'
}
export {
  initialGutkaState,
  initialGlobalState,
  initialViewerState,
  initalSearchState
}
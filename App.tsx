import 'react-native-gesture-handler';

import React from 'react';
import { DefaultTheme, Portal, Provider as PaperProvider } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import { storedGutka, entryObj, gutkaEntry, SearchType, QueryType } from './config/dev_env/types';
import { fetchGutkas, saveGutkas, fetchSettings, findCurrentGutka, getGutkaItems, findCurrentGutkaIndex, findEntry } from './config/app_state/functions';
import { downloadDB, checkIfDbExists, loadShabad, downloadProg, query, testSchemas } from './config/database/database';

import { GlobalContext, GutkaContext, ViewerContext, SearchContext } from './contexts/Contexts';
import Routes from './Routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#FFA500',
    header: "#FFA500"
  },
};

interface IProps { };
interface IState {
  gutkas: storedGutka[],
  currentName: string,
  currentItems: entryObj[],
  isDataReady: boolean,
  isEditMode: boolean,
  searchType: SearchType,
  queryType: QueryType,
  modalVisible: boolean,

  gurmukhiSize: number,
  translSize: number,
  translitSize: number,
  displayEngTransl: boolean,
  displayPunTansl: boolean,
  displayTranslit: boolean,
}
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // init values
      gutkas: [],
      currentName: "",
      currentItems: [],
      isDataReady: false,
      isEditMode: false,
      searchType: 0,
      queryType: 'Shabad',
      modalVisible: false,
      //display settings
      gurmukhiSize: 12,
      translSize: 12,
      translitSize: 12,
      displayEngTransl: true,
      displayPunTansl: true,
      displayTranslit: true,
    }
  }
  async componentDidMount() {
    NetInfo.fetch().then(async state => {
      if (state.isConnected && !(await checkIfDbExists())) {
        await downloadDB();
      }
    });
    const gutkasFetched = await fetchGutkas(this.state.currentName);
    const { $isDataReady, $stored, $currentName, $currentItems } = gutkasFetched;
    this.setState({ isDataReady: $isDataReady, gutkas: $stored, currentName: $currentName, currentItems: $currentItems });

    const settingsFetched = await fetchSettings();
    const { $displayEngTransl, $displayPunTansl, $displayTranslit, $gurmukhiSize, $translSize, $translitSize } = settingsFetched;
    this.setState({ displayEngTransl: $displayEngTransl, displayPunTansl: $displayPunTansl, displayTranslit: $displayTranslit, gurmukhiSize: $gurmukhiSize, translSize: $translSize, translitSize: $translitSize });
  }
  toggleModal = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))
  }
  updateSearchType = (type: SearchType) => { this.setState({ searchType: type }) }
  updateQueryType = (type: QueryType) => this.setState({ queryType: type })
  toggleEditMode = () => { this.setState((prevState) => ({ isEditMode: !prevState.isEditMode })); }

  updateCurrentGutka = (newGutka: string) => {
    const gutka = findCurrentGutka(this.state.gutkas, newGutka);
    this.setState({ currentName: newGutka, currentItems: getGutkaItems(gutka) });
  }

  updateFontSize = (element: string, size: number) => {
    const fontSetting = `${element}Size`;
    this.setState(prevState => ({
      ...prevState,
      [fontSetting]: size,
    }));
  }
  updateDisplay = (element: string, value: boolean) => {
    const displaySetting = `display${element}`;
    this.setState(prevState => ({
      ...prevState,
      [displaySetting]: value,
    }));
  }
  removeFromGutka = (id: number) => {
    const { gutkas, currentName } = this.state;
    const indexOf = findCurrentGutkaIndex(gutkas, currentName);
    const entryIndex = findEntry(gutkas[indexOf], id);
    gutkas[indexOf].items.splice(entryIndex, 1);
    this.setState({ gutkas: gutkas, currentItems: _.values(gutkas[indexOf].items) });
    saveGutkas(gutkas);
  }
  addToGutka = (entryid: number, mainLine: string, entrytype: gutkaEntry) => {
    const newEntry: entryObj = {
      id: entryid,
      mainLine: mainLine,
      type: entrytype,
      parentGutka: this.state.currentName
    }
    const { gutkas, currentName } = this.state;
    const allGutkas = gutkas;
    const indexOfCurrent = findCurrentGutkaIndex(allGutkas, currentName);

    allGutkas[indexOfCurrent].items = [...allGutkas[indexOfCurrent].items, newEntry];

    this.setState({ gutkas: allGutkas, currentItems: _.values(allGutkas[indexOfCurrent].items) });
    saveGutkas(allGutkas);
  }
  createGutka = (gutkaName: string) => {
    const newGutka: storedGutka = {
      name: gutkaName,
      items: [],
    }
    const { gutkas } = this.state;
    this.setState(prevState => ({
      gutkas: [...prevState.gutkas, newGutka]
    }));
    saveGutkas([...gutkas, newGutka]);
  }
  render() {
    // variables to init contexts with
    const {
      gutkas,
      currentName,
      currentItems,
      isDataReady,
      isEditMode,
      searchType,
      queryType,
      modalVisible,

      gurmukhiSize,
      translSize,
      translitSize,
      displayEngTransl,
      displayPunTansl,
      displayTranslit,
    } = this.state;

    return (
      <GlobalContext.Provider value={{
        currentName,
        updateCurrentGutka: this.updateCurrentGutka,
        isEditMode,
        toggleEditMode: this.toggleEditMode,
      }} >
        <GutkaContext.Provider value={{
          gutkas,
          createGutka: this.createGutka,
          currentItems,
          removeFromGutka: this.removeFromGutka,
          addToGutka: this.addToGutka,
          isDataReady,
          modalVisibile: false,
          toggleModal: this.toggleModal,
        }} >
          <SearchContext.Provider value={{
            searchType,
            updateSearchType: this.updateSearchType,
            queryType,
            updateQueryType: this.updateQueryType
          }}>
            <ViewerContext.Provider value={{
              gurmukhiSize,
              translSize,
              translitSize,
              updateFontSize: this.updateFontSize,
              displayEngTransl,
              displayPunTansl,
              displayTranslit,
              updateDisplay: this.updateDisplay,
            }}>
              <PaperProvider theme={theme}>
                <Portal.Host>
                  <Routes />
                </Portal.Host>
              </PaperProvider>
            </ViewerContext.Provider>
          </SearchContext.Provider>
        </GutkaContext.Provider>
      </GlobalContext.Provider>
    );
  }
}
export default App;
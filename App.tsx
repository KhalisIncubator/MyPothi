import React from 'react';
import Routes from './Routes';
import _ from 'lodash';

import { storedGutka, entryObj, gutkaEntry } from './Config/types';
import { fetchGutkas, saveGutkas, fetchSettings, findCurrentGutka, getGutkaItems, findCurrentGutkaIndex } from './functions';

import { GlobalContext, GutkaContext, ViewerContext } from './Contexts/Contexts';



interface IProps { };
interface IState {
  gutkas: storedGutka[],
  currentName: string,
  currentItems: entryObj[],
  isDataReady: boolean,
  isEditMode: boolean,
  currShabadID: number,

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
      currShabadID: 0,

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
    const gutkasFetched = await fetchGutkas(this.state.currentName);
    const { $isDataReady, $stored, $currentName, $currentItems } = gutkasFetched;
    this.setState({ isDataReady: $isDataReady, gutkas: $stored, currentName: $currentName, currentItems: $currentItems });

    const settingsFetched = await fetchSettings();
    const { $displayEngTransl, $displayPunTansl, $displayTranslit, $gurmukhiSize, $translSize, $translitSize } = settingsFetched;
    this.setState({ displayEngTransl: $displayEngTransl, displayPunTansl: $displayPunTansl, displayTranslit: $displayTranslit, gurmukhiSize: $gurmukhiSize, translSize: $translSize, translitSize: $translitSize });
  }

  toggleEditMode = () => { this.setState((prevState) => ({ isEditMode: !prevState.isEditMode })); }

  updateCurrentGutka = (newGutka: string) => {
    const gutka = findCurrentGutka(this.state.gutkas, newGutka);
    this.setState({ currentName: newGutka, currentItems: getGutkaItems(gutka) });
  }
  updateCurrShabadID = (newID: number) => this.setState({ currShabadID: newID });

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
  removeFromGutka = (id: any) => {
    const { gutkas, currentName } = this.state;
    const indexOf = findCurrentGutkaIndex(gutkas, currentName);
    gutkas[indexOf].items.splice(id, 1);
    console.log(gutkas[indexOf]);
    this.setState({ gutkas: gutkas, currentItems: _.values(gutkas[indexOf].items) });
    saveGutkas(gutkas);
  }
  addToGutka = (entryid: any, entrytype: gutkaEntry) => {
    const newEntry: entryObj = {
      id: entryid,
      type: entrytype
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
      currShabadID,

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
        currShabadID,
        updateCurrShabadID: this.updateCurrShabadID
      }} >
        <GutkaContext.Provider value={{
          gutkas,
          createGutka: this.createGutka,
          currentItems,
          removeFromGutka: this.removeFromGutka,
          addToGutka: this.addToGutka,
          isDataReady
        }} >

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
            <Routes />
          </ViewerContext.Provider>
        </GutkaContext.Provider>
      </GlobalContext.Provider>
    );
  }
}
export default App;
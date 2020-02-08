import React from 'react';
import Routes from './Routes';
import _ from 'lodash';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { fetchGutkas, fetchSettings, findCurrentGutka, getGutkaItems } from './functions';
import { storedGutka, itemsObj } from './Config/types';


interface IProps { };
interface IState {
  gutkas: storedGutka[],
  currentName: string,
  currentItems: itemsObj[],
  isDataReady: boolean,
  isEditMode: boolean,
  currShabadID: number,

  gurmukhiSize: number,
  translSize: number,
  translitSize: number,
  displayEngTransl: boolean,
  displayPunTrasl: boolean,
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
      displayPunTrasl: true,
      displayTranslit: true,
    }
  }
  async componentDidMount() {
    const gutkasFetched = await fetchGutkas(this.state.currentName);
    const { $isDataReady, $stored, $currentName, $currentItems } = gutkasFetched;
    this.setState({ isDataReady: $isDataReady, gutkas: $stored, currentName: $currentName, currentItems: $currentItems });

    const settingsFetched = await fetchSettings();
    const { $displayEngTransl, $displayPunTrasl, $displayTranslit, $gurmukhiSize, $translSize, $translitSize } = settingsFetched;
    this.setState({ displayEngTransl: $displayEngTransl, displayPunTrasl: $displayPunTrasl, displayTranslit: $displayTranslit, gurmukhiSize: $gurmukhiSize, translSize: $translSize, translitSize: $translitSize });
  }
  toggleEditMode = (): void => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }))
  }
  updateCurrentGutka = (newGutka: string) => {
    const gutka = findCurrentGutka(this.state.gutkas, this.state.currentName) !== undefined ? findCurrentGutka(this.state.gutkas, this.state.currentName) : this.state.currentItems;
    this.setState({ currentName: newGutka, currentItems: _.values(gutka) });

  }
  // }
  // updateCurrShabadID = (newID) => this.setState({ currShabadID: newID });
  // updateDisplay = (element) => {
  //   const displaySetting = `display${element}`;
  //   this.setState(prevState => ({
  //     [displaySetting]: !prevState[displaySetting]
  //   }));
  // }
  // updateFontSize = (element, size) => {
  //   const fontSetting = `${element}Size`;
  //   this.setState({ [fontSetting]: size })
  // }


  // removeFromGutka = (id) => {
  //   let arr = this.state.currentGutka;
  //   const allGutkas = this.state.gutkas;
  //   arr.splice(id, 1);
  //   this.setState({ currentGutka: arr });
  //   allGutkas.find(g => g.name === this.state.currentGutkaName).items = arr;
  //   this.setState({ gutkas: allGutkas });
  //   AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(allGutkas));
  // }
  // addToGutka = (entryid, entrytype) => {
  //   const newObj = {
  //     id: entryid,
  //     type: entrytype
  //   }
  //   const allGutkas = this.state.gutkas;
  //   const gutka = allGutkas.find(g => g.name === this.state.currentGutkaName);
  //   if (gutka.items.length == undefined) {
  //     this.state.gutkas.find(g => g.name === this.state.currentGutkaName).items = [newObj];
  //     this.setState(() => ({ currentGutka: [newObj] }));
  //   } else {
  //     this.state.gutkas.find(g => g.name === this.state.currentGutkaName).items = []
  //     this.setState(prevState => ({
  //       currentGutka: [...prevState.currentGutka, newObj]
  //     }))
  //   }
  //   AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(this.state.gutkas));
  // }
  // createGutka = (gutkaName) => {
  //   const newGutka = {
  //     name: gutkaName,
  //     items: [],
  //   }
  //   const allGutkas = this.state.gutkas;
  //   this.setState(prevState => ({
  //     gutkas: [...prevState.gutkas, newGutka]
  //   }));
  //   AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(allGutkas));
  // }
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
      displayPunTrasl,
      displayTranslit,
    } = this.state;

    return (
      // <GlobalContext.Provider value={{
      //   currentGutkaName,
      //   updateCurrentGutka: this.updateCurrentGutka,
      //   isEditMode,
      //   toggleEditMode: this.toggleEditMode,
      //   currShabadID,
      //   updateCurrShabadID: this.updateCurrShabadID
      // }} >
      //   <GutkaContext.Provider value={{
      //     gutkas,
      //     createGutka: this.createGutka,
      //     currentGutka,
      //     removeFromGutka: this.removeFromGutka,
      //     addToGutka: this.addToGutka,
      //     isDataReady
      //   }} >

      //     <ViewerContext.Provider value={{
      //       gurmukhiSize,
      //       translSize,
      //       translitSize,
      //       updateFontSize: this.updateFontSize,
      //       displayEngTransl,
      //       displayPunTrasl,
      //       displayTranslit,
      //       updateDisplay: this.updateDisplay,
      //     }}>
      //       <Routes />
      //     </ViewerContext.Provider>
      //   </GutkaContext.Provider>
      // </GlobalContext.Provider>
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}
export default App;
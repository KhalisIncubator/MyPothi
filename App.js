import React from 'react';
import Routes from './Routes';
import _ from 'lodash';
import { GutkaContext, GlobalContext, ViewerContext } from './Contexts/Contexts.js';
import AsyncStorage from '@react-native-community/async-storage';
import { Gutkas, Settings } from './Config/defaults';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { fetchGutkas } from './functions';

const GUTKAS_KEY = 'Gutkas';
const SETTINGS_KEY = 'Settings';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // init values
      gutkas: [],
      currentGutkaName: null,
      currentGutka: [],
      isDataReady: false,
      isEditMode: false,
      currShabadID: null,

      //display settings
      gurmukhiSize: null,
      translSize: null,
      translitSize: null,
      displayEngTransl: null,
      displayPunTrasl: null,
      displayTranslit: null,
      element: 'EngTransl',
    }
  }
  // fetchGutkas = async () => {
  //   try {
  //     let getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
  //     if (getGutkas === null) {
  //       await AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(Gutkas));
  //       getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
  //     }
  //     const normalized = JSON.parse(getGutkas);
  //     let currGutka;
  //     if (this.state.currentGutkaName === null) {
  //       currGutka = normalized[0].name;
  //     }
  //     const filteredItems = _.values(normalized.find(gutka => gutka.name === currGutka).items);
  //     this.setState({ isDataReady: true, gutkas: normalized, currentGutkaName: currGutka, currentGutka: filteredItems });


  //   } catch (e) {
  //     alert('Error occured and nothing could be fetched');
  //   }
  // }
  fetchSettings = async () => {
    let getSettings = await AsyncStorage.getItem(`${SETTINGS_KEY}`);
    if (getSettings === null) {
      await AsyncStorage.setItem(`${SETTINGS_KEY}`, JSON.stringify(Settings));
      getSettings = await AsyncStorage.getItem(`${SETTINGS_KEY}`);
    }
    const normalized = JSON.parse(getSettings);
    const arr = _.values(normalized);
    this.setState({
      displayEngTransl: arr[0],
      displayPunTrasl: arr[1],
      displayTranslit: arr[2],
      gurmukhiSize: arr[3],
      translSize: arr[4],
      translitSize: arr[5]
    });


  }
  componentDidMount() {
    console.log(this.state.currentGutkaName);
    const { dataReady, stored, currentName, currentItems } = fetchGutkas(this.state.currentGutkaName);
    this.setState({ isDataReady: dataReady, gutkas: stored, currentGutkaName: currentName, currentGutka: currentItems });
    console.log(currentItems)
    this.fetchSettings();
  }
  toggleEditMode = () => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }))
  }
  updateCurrentGutka = (newGutka) => {
    const gutka = this.state.gutkas.find(g => g.name === newGutka);
    this.setState({ currentGutkaName: newGutka, currentGutka: gutka })


  }
  updateCurrShabadID = (newID) => this.setState({ currShabadID: newID });
  updateDisplay = (element) => {
    const displaySetting = `display${element}`;
    this.setState(prevState => ({
      [displaySetting]: !prevState[displaySetting]
    }));
  }
  updateFontSize = (element, size) => {
    const fontSetting = `${element}Size`;
    this.setState({ [fontSetting]: size })
  }


  removeFromGutka = (id) => {
    let arr = this.state.currentGutka;
    const allGutkas = this.state.gutkas;
    arr.splice(id, 1);
    this.setState({ currentGutka: arr });
    allGutkas.find(g => g.name === this.state.currentGutkaName).items = arr;
    this.setState({ gutkas: allGutkas });
    AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(allGutkas));
  }
  addToGutka = (entryid, entrytype) => {
    const newObj = {
      id: entryid,
      type: entrytype
    }
    const allGutkas = this.state.gutkas;
    const gutka = allGutkas.find(g => g.name === this.state.currentGutkaName);
    if (gutka.items.length == undefined) {
      this.state.gutkas.find(g => g.name === this.state.currentGutkaName).items = [newObj];
      this.setState(() => ({ currentGutka: [newObj] }));
    } else {
      this.state.gutkas.find(g => g.name === this.state.currentGutkaName).items = []
      this.setState(prevState => ({
        currentGutka: [...prevState.currentGutka, newObj]
      }))
    }
    AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(this.state.gutkas));
  }
  createGutka = (gutkaName) => {
    const newGutka = {
      name: gutkaName,
      items: [],
    }
    const allGutkas = this.state.gutkas;
    this.setState(prevState => ({
      gutkas: [...prevState.gutkas, newGutka]
    }));
    AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(allGutkas));
  }
  render() {
    // variables to init contexts with
    const {
      gutkas,
      currentGutkaName,
      currentGutka,
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
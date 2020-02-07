import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import { Gutkas, Settings } from './Config/defaults';
import { storedGutka } from './Config/types';

const GUTKAS_KEY = 'Gutkas';
const SETTINGS_KEY = 'Settings';


const fetchGutkas = async (currentGutkaName: string) => {
  try {
    let getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
    if (getGutkas === null) {
      await AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(Gutkas));
      getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
    }
    const normalized = getGutkas !== null ? JSON.parse(getGutkas) : [];
    let currGutka: string = currentGutkaName;
    if (currentGutkaName === null) {
      currGutka = normalized[0].name;
    }
    const filter =
      normalized.find((gutka: storedGutka) => (gutka.name === currGutka));
    return {
      isDataReady: true,
      stored: normalized,
      currentName: currGutka,
      currentItems: filter.items
    }

  } catch (e) {
    console.log(e);
  }
}

export {
  fetchGutkas,
}
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import { Gutkas, Settings } from '../defaults';
import { storedGutka, entryObj } from '../types';
import { gutkaFetched, setttingsFetched } from '../interfaces'
const GUTKAS_KEY = 'Gutkas';
const SETTINGS_KEY = 'Settings';


const fetchGutkas = async (currentGutkaName: string): Promise<gutkaFetched> => {
  try {
    let getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
    // if (getGutkas === null) {
    await AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(Gutkas));
    getGutkas = await AsyncStorage.getItem(`${GUTKAS_KEY}`);
    // }
    const normalized = getGutkas !== null ? JSON.parse(getGutkas) : [];
    let currGutka: string = currentGutkaName;
    if (currentGutkaName === "" || currentGutkaName === undefined) {
      currGutka = normalized[0].name;
    }
    const filter =
      normalized.find((gutka: storedGutka) => (gutka.name === currGutka));
    return {
      $isDataReady: true,
      $stored: normalized,
      $currentName: currGutka,
      $currentItems: _.values(filter.items)
    }
  } catch (e) {
    throw new Error("Something went wrong and nothing could be fetched");
  }
}
const saveGutkas = async (gutkas: storedGutka[]) => {
  AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(gutkas));
}
const fetchSettings = async (): Promise<setttingsFetched> => {
  let getSettings = await AsyncStorage.getItem(`${SETTINGS_KEY}`);
  if (getSettings === null) {
    await AsyncStorage.setItem(`${SETTINGS_KEY}`, JSON.stringify(Settings));
    getSettings = await AsyncStorage.getItem(`${SETTINGS_KEY}`);
  }
  const normalized = getSettings !== null ? JSON.parse(getSettings) : [];
  const arr = _.values(normalized);
  return {
    $displayEngTransl: arr[0],
    $displayPunTansl: arr[1],
    $displayTranslit: arr[2],
    $gurmukhiSize: arr[3],
    $translSize: arr[4],
    $translitSize: arr[5]
  }

}

const findCurrentGutka = (gutkas: storedGutka[], name: string) => {
  const filtered = gutkas.find((gutka: storedGutka) => (gutka.name === name));
  return filtered || gutkas[0];
}
const findCurrentGutkaIndex = (gutkas: storedGutka[], name: string) => {
  const index = gutkas.findIndex((gutka: storedGutka) => gutka.name === name) | 0;
  return index;
}
const findEntry = (currentGutka: storedGutka, id: number) => {
  const index = currentGutka.items.findIndex((entry: entryObj) => entry.id === id) | 0;
  return index;
}
const getGutkaItems = (gutka: storedGutka) => {
  return _.values(gutka.items);
}
export {
  fetchGutkas,
  saveGutkas,
  fetchSettings,
  findCurrentGutka,
  findCurrentGutkaIndex,
  findEntry,
  getGutkaItems,
}
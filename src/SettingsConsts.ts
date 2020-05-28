import {
  SettingArray,
  SettingsConsts,
  SettingSection,
  SettingType,
} from '../types/types';
import { wrappedModifiers } from './components/main/SettingsComponents';

const mapToComponent = ( type: SettingType ) => wrappedModifiers[type];

export default mapToComponent;


const ThemeSettings: SettingArray[] = [
  {
    title: 'Theme',
    values: 'theme',
    updater: 'updateTheme',
    type: 'switch',
  },
];
// stuff relating to viewerModel (excludes stuff from themeModel)
// fontSizes, displayElements, baniLength, sources => values related to each section
const ViewerSettings: SettingArray[] = [
  {
    title: 'Font Size',
    values: 'fontSizes',
    updater: 'updateFontSize',
    type: 'font',
  },
  {
    title: 'Display',
    values: 'displayElements',
    updater: 'updateDisplayElement',
    type: 'switch',
  },
  {
    title: 'Sources',
    values: 'sources',
    type: 'menu',
    updater: 'updateSource',
  },
  {
    title: 'Search Preferences',
    values: 'searchPreferences',
    type: 'menu',
    updater: 'updateSearch',
  },
];

const Settings: SettingSection[] = [
  {
    setting: ThemeSettings,
    values: 'themeValues',
    updaters: 'themeUpdaters',
  },
  {
    setting: ViewerSettings,
    values: 'viewerValues',
    updaters: 'viewerUpdaters',
  },
];
const baniList = {
  short: 'Short',
  medium: 'Medium',
  long: 'Long',
  extralong: 'Extra Long',
};
const vishraamList = {
  sttm: 'BaniDB (default)',
  sttm2: 'Legacy STTM',
  ig: 'iGurbani',
};
const translList = {
  English: 'English',
  Spanish: 'Spanish',
};
const translitList = {
  English: 'English',
  Hindi: 'Hindi',
  IPA: 'IPA',
};
const teekaList = {
  SS: 'Prof. Sahib Singh',
  FT: 'Fareedkot Teeka',
};
const GlobalConsts: SettingsConsts = {
  theme: {
    choseSystem: { title: 'Use System Appearance' },
    isDarkMode: {
      title: 'Dark Mode',
      parent: 'choseSystem',
      parentValue: false,
    },
    trueDarkMode: {
      title: 'True Dark Mode',
      subheading: '* If System Appearance has been chosen, this will only apply if dark mode is applied system-wide',
    },
  },
  fontSizes: {
    gurmukhi: { title: 'Gurmukhi' },
    eng: { title: 'English' },
    teeka: { title: 'Teeka' },
    translit: { title: 'Transliteration' },
  },
  displayElements: {
    displayEng: { title: 'English' },
    displayTeeka: { title: 'Teeka' },
    displayTranslit: { title: 'Transliteration' },
    displayVishraams: {
      title: 'Vishraams',
      separator: true,
    },
  },
  sources: {
    vishraamSource: {
      title: 'Vishraams Source',
      menu: vishraamList,
    },
    translationLang: {
      title: 'Translation',
      menu: translList,
    },
    teekaSource: {
      title: 'Teeka Source',
      menu: teekaList,
    },
    translitLang: {
      title: 'Transliteration',
      menu: translitList,
    },
  },
  searchPreferences: {
    baniLength: {
      title: 'Bani Length',
      menu: baniList,
      subheading: '*Note: This will not affect the length of banis already added',
    },
  },
};

export {
  ViewerSettings,
  Settings,
  GlobalConsts,
};

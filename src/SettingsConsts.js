import { wrappedModifiers } from './components/main/SettingsComponents';


const mapToComponent = ( type ) => wrappedModifiers[type];

export default mapToComponent;


const ThemeSettings = [
  {
    title: 'Theme',
    values: 'theme',
    updater: 'updateTheme',
    type: 'switch',
  },
];
// stuff relating to viewerModel (excludes stuff from themeModel)
// fontSizes, displayElements, baniLength, sources => values related to each section
const ViewerSettings = [
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

const Settings = [ { setting: ThemeSettings, values: 'themeValues', updaters: 'themeUpdaters' },
  { setting: ViewerSettings, values: 'viewerValues', updaters: 'viewerUpdaters' } ];
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

const GlobalConsts = {
  theme: {
    isDarkMode: { title: 'Dark Mode', parent: 'choseSystem', parentValue: false },
    trueDarkMode: { title: 'True Dark Mode' },
    choseSystem: { title: 'Use System Appearance' },
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
    displayVishraams: { title: 'Vishraams', separator: true },
  },
  sources: {
    vishraamSource: { title: 'Vishraams Source', menu: vishraamList },
  },
  searchPreferences: {
    baniLength: { title: 'Bani Length', menu: baniList, subheading: '*Note: This will not affect the length of banis already added' },
  },
};

export {
  ViewerSettings, Settings, GlobalConsts,
};

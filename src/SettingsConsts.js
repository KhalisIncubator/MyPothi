import { wrappedModifiers } from './components/main/SettingsComponents';
import { vishraamSources } from './database/DatabaseConts';


const mapToComponent = ( type ) => wrappedModifiers[type];

export default mapToComponent;

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
const BaniMenu = {
  short: 'Short',
  medium: 'Medium',
  long: 'Long',
  extralong: 'Extra Long',
};

const MenuItems = {
  vishraamSource: vishraamSources,
  baniLength: BaniMenu,
};

const TextConsts = {
  fontSizes: {
    gurmukhi: 'Gurmukhi',
    eng: 'English',
    teeka: 'Teeka',
    translit: 'Transliteration',
  },
  displayElements: {
    displayEng: 'English',
    displayTeeka: 'Teeka',
    displayTranslit: 'Transliteration',
  },
  sources: {
    vishraamSource: 'Vishraams Source',
  },
  searchPreferences: {
    baniLength: 'Bani Length',
  },
};
export { ViewerSettings, MenuItems, TextConsts };

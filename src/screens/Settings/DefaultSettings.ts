import { ThemeNames } from "utils/Themes"

export enum GurbaniKeys {
  GurbaniFont = 'gurbani.font'
}
export enum TranslationKeys {
  BanidbEng = 'en.bdb',
  ManmohanSinghEng = 'en.ms',
  SahibSinghEng = 'en.ssk',
  Spanish = 'es',
  TranslationFont = 'translation.font'
}
export enum TranslitKeys {
  English = 'en',
  Hindi = 'hi',
  Urdu = 'ur',
  TranslitFont = 'translit.font'
}
export enum TeekaKeys {
  SahibSingh = 'pu.ss',
  Faridkot = 'pu.ft',
  Banidb = 'pu.bdb',
  ManmohanSingh = 'pu.ms',
  TeekaFont = 'teeka.font'
}
export enum SourceKeys {
  BaniLen = 'banilen',
  Vishraams = 'vishraams'
}
export enum ThemeKeys {
  Theme = "theme"
}

export enum SettingTypes {
  Picker = 'Picker',
  Stepper = 'Stepper',
  Toggle = 'Toggle'
}

const BaniLenValues = [ 'Short', 'Medium', 'Long', 'Extra Long' ]
const VishraamValues = [ 'STTM 2', 'iGurbani', 'Default' ]
const ThemeValues = ThemeNames

const DefaultGurbaniSettings = {
  [ GurbaniKeys.GurbaniFont ]: 16
}
const DefaultTranslationSettings = {
  English: {
    [ TranslationKeys.BanidbEng ]: true,
    [ TranslationKeys.ManmohanSinghEng ]: false,
    [ TranslationKeys.SahibSinghEng ]: false,
  },
  Other: {
    [ TranslationKeys.Spanish ]: false,
  },
  [ TranslationKeys.TranslationFont ]: 12
}

const DefaultTranslitSettings = {
  [ TranslitKeys.English ]: true,
  [ TranslitKeys.Hindi ]: false,
  [ TranslitKeys.Urdu ]: false,
  [ TranslitKeys.TranslitFont ]: 12
}

const DefaultTeekaSettings = {
  [ TeekaKeys.Banidb ]: false,
  [ TeekaKeys.Faridkot ]: false,
  [ TeekaKeys.ManmohanSingh ]: false,
  [ TeekaKeys.SahibSingh ]: false,
  [ TeekaKeys.TeekaFont ]: 12
}

const DefaultSourceSettigns = {
  [ SourceKeys.BaniLen ]: 'Long',
  [ SourceKeys.Vishraams ]: 'Default'
}

const DefaultThemeSettings = {
  [ ThemeKeys.Theme ]: 'light'
}
// ok below this is configuration for dynamic settings

const GurbaniMap = {
  [ GurbaniKeys.GurbaniFont ]: { title: 'Gurbani Size', type: SettingTypes.Stepper }
}
const TranslationMap = {
  English: {
    [ TranslationKeys.BanidbEng ]: { title: 'Default', type: SettingTypes.Toggle },
    [ TranslationKeys.ManmohanSinghEng ]: { title: 'Manmohan Singh', type: SettingTypes.Toggle },
    [ TranslationKeys.SahibSinghEng ]: { title: 'Prof Sahib Singh', type: SettingTypes.Toggle }
  },
  Other: {
    [ TranslationKeys.Spanish ]: { title: 'Spanish', type: SettingTypes.Toggle },
  },
  [ TranslationKeys.TranslationFont ]: { title: 'Translation Font Size', type: SettingTypes.Stepper }
}

const TranslitMap = {
  [ TranslitKeys.English ]: { title: 'English', type: SettingTypes.Toggle },
  [ TranslitKeys.Hindi ]: { title: 'Hindi', type: SettingTypes.Toggle },
  [ TranslitKeys.Urdu ]: { title: 'Urdu', type: SettingTypes.Toggle },
  [ TranslitKeys.TranslitFont ]: { title: 'Transliteration Size', type: SettingTypes.Stepper }
}

const TeekaMap = {
  [ TeekaKeys.Banidb ]: { title: 'Default', type: SettingTypes.Toggle },
  [ TeekaKeys.Faridkot ]: { title: 'Faridkot', type: SettingTypes.Toggle },
  [ TeekaKeys.ManmohanSingh ]: { title: 'Manmohan Singh', type: SettingTypes.Toggle },
  [ TeekaKeys.SahibSingh ]: { title: 'Prof Sahib Singh', type: SettingTypes.Toggle },
  [ TeekaKeys.TeekaFont ]: { title: 'Teeka Size', type: SettingTypes.Stepper },
}

const SourceMap = {
  [ SourceKeys.BaniLen ]: { title: 'Bani Length', type: SettingTypes.Picker, pickerValues: BaniLenValues },
  [ SourceKeys.Vishraams ]: { title: 'Vishraams', type: SettingTypes.Picker, pickerValues: VishraamValues }
}
const ThemeMap = {
  [ ThemeKeys.Theme ]: { title: 'Theme', type: SettingTypes.Picker, pickerValues: ThemeValues }
}

const SettingsMap = {
  ...GurbaniMap,
  ...TranslationMap,
  ...TeekaMap,
  ...TranslitMap,
  ...SourceMap,
  ...ThemeMap
}

const WebviewKeys = [
  ...Object.keys( TranslationMap.English ),
  ...Object.keys( TranslationMap.Other ),
  ...Object.keys( TeekaMap ).filter( key => key !== TeekaKeys.TeekaFont ),
  ...Object.keys( TranslitMap ).filter( key => key !== TranslitKeys.TranslitFont )
]

const SectionMap = [
  {
    title: 'Gurbani',
    values: Object.keys( GurbaniMap ),
    valueSource: 'gurbaniSettings'
  },
  {
    title: 'Translations',
    values: Object.keys( TranslationMap ).filter( ( key ) => typeof DefaultTranslationSettings[ key as keyof typeof TranslationMap ] !== 'object' ),
    valueSource: 'translationSettings',
    subsections: {
      English: {
        title: 'English',
        values: Object.keys( TranslationMap.English )
      },
      Other: {
        title: 'Others',
        values: Object.keys( TranslationMap.Other )
      }
    }
  },
  {
    title: 'Teeka',
    values: Object.keys( TeekaMap ),
    valueSource: 'teekaSettings'
  },
  {
    title: 'Transliteration',
    values: Object.keys( TranslitMap ),
    valueSource: 'translitSettings',
  },
  {
    title: 'Sources',
    subtitle: '*Note: Bani Length setting does not apply to already added Banis',
    values: Object.keys( SourceMap ),
    valueSource: 'sourceSettings'
  },
  {
    title: 'Themes',
    values: Object.keys( ThemeMap ),
    valueSource: 'themeSettings'
  }
]

export { DefaultGurbaniSettings, DefaultTeekaSettings, DefaultTranslationSettings, DefaultTranslitSettings, DefaultSourceSettigns, DefaultThemeSettings, SettingsMap, SectionMap, WebviewKeys }
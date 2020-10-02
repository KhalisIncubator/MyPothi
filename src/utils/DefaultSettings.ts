export enum GurbaniKeys {
  GurbaniFont = 'gurbani'
}
export enum TranslationKeys {
  BanidbEng = 'en.bdb',
  ManmohanSinghEng = 'en.ms',
  SahibSinghEng = 'en.ssk',
  Spanish = 'es',
  TranslationFont = 'translation'
}
export enum TranslitKeys {
  English = 'en',
  Hindi = 'hi',
  Urdu = 'ur',
  TranslitFont = 'translit'
}
export enum TeekaKeys {
  SahibSingh = 'pu.ss',
  Faridkot = 'pu.ft',
  Banidb = 'pu.bdb',
  ManmohanSingh = 'pu.ms',
  TeekaFont = 'teeka'
}
export enum SourceKeys {
  BaniLen = 'banilen',
  Vishraams = 'vishraams'
}

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
    [ TranslationKeys.TranslationFont ]: 12
  }
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

export { DefaultGurbaniSettings, DefaultTeekaSettings, DefaultTranslationSettings, DefaultTranslitSettings, DefaultSourceSettigns }
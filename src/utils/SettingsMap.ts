const SectionsMap = {
  displaySettings: {
    title: 'Display',
    valueSource: 'displaySettings',
  },
  fontSettings: {
    title: 'Fonts',
    valueSource: 'fontSettings',
  },
  sourceSettings: {
    title: 'Source',
    valueSource: 'sourceSettings',
  }
}
const BaniLengths = [
  'short',
  'medium',
  'long (default)',
  'extra long'
]
const VishraamsSources = [
  'Old STTM',
  'BaniDB',
  'iGurbani'
]

type SettingMap = {
  [key in 'displaySettings' | 'fontSettings' | 'sourceSettings']: {
    [key: string]: {title: string, type: 'checkbox' | 'stepper' | 'picker', pickerValues?: string[]}
  }
}
const SettingsMap: SettingMap = {
  displaySettings: {
    'en.bdb': { title: 'English (Default)', type: 'checkbox' },
    'en.ms': { title: 'English (Manmohan Singh)', type: 'checkbox' },
    'en.ssk': { title: 'English (Sahib Singh)', type: 'checkbox' },
    'es': { title: 'Spanish', type: 'checkbox' },
    'en': { title: 'English', type: 'checkbox' },
    'hi': { title: 'Hindi', type: 'checkbox' },
    'ipa': { title: 'IPA', type: 'checkbox' },
    'ur': { title: 'Urdu', type: 'checkbox' },
    'pu.ss': { title: 'Sahib Singh', type: 'checkbox' },
    'pu.ft': { title: 'Faridkot', type: 'checkbox' },
    'pu.ms': { title: 'Manmohan Singh', type: 'checkbox' },
    'pu.bdb': { title: 'Default', type: 'checkbox' }
  },
  fontSettings: {
    gurmukhi: { title: 'Gurmukhi', type: 'stepper' },
    translation: { title: 'Translation', type: 'stepper' },
    translit: { title: 'Transliteration', type: 'stepper' },
    teeka: { title: 'Teeka', type: 'stepper' },
  },
  sourceSettings: {
    vishraams: { title: 'Vishraams Source', pickerValues: VishraamsSources, type: 'picker' },
    baniLen: { title: 'Bani Length', pickerValues: BaniLengths, type: 'picker' },
  }
}



export { SettingsMap, SectionsMap }

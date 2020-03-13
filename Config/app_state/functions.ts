import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import { Settings } from '../defaults';
import { setttingsFetched } from '../dev_env/interfaces';
const SETTINGS_KEY = 'Settings';

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
        $translitSize: arr[5],
    };
};

export { fetchSettings };

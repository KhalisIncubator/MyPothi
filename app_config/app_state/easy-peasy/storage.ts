
import AsyncStorage from '@react-native-community/async-storage';

const AsyncStore = {
  async getItem( key ) {
    return JSON.parse( await AsyncStorage.getItem( key ) );
  },
  setItem( key, data ) {
    AsyncStorage.setItem( key, JSON.stringify( data ) );
  },
  removeItem( key ) {
    AsyncStorage.removeItem( key );
  },
};

export default AsyncStore;

import AsyncStorage from '@react-native-community/async-storage';

const GUTKAS_KEY = 'Gutkas';



const updateGutkas = () => {
}
const fetchGukas = async () => {
  await AsyncStorage.setItem();
  const result = await AsyncStorage.getItem();


  return JSON.parse(result);
}
export {
  fetchGukas,
}
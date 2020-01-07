import AsyncStorage from '@react-native-community/async-storage';

const GUTKAS_KEY = 'Gutkas';
import { Gutkas } from '../Config/defaults';


const updateGutkas = () => {
}
const fetchGukas = async () => {
  await AsyncStorage.setItem(`${GUTKAS_KEY}`, JSON.stringify(Gutkas));
  const result = await AsyncStorage.getItem(`${GUTKAS_KEY}`);


  return JSON.parse(result);
}
export {
  fetchGukas,
}
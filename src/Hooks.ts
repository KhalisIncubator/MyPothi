import { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { MyPothiTheme } from '../types/types';
import { LineContext } from './components/main/LineBlock';


const useLine = () => {
  const LineCtx = useContext( LineContext );

  return LineCtx?.line;
};
const useMPTheme = (): MyPothiTheme => {
  const theme = useTheme();
  return theme;
};

export { useLine, useMPTheme };

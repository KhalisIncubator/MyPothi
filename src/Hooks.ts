import { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { ActionCreator } from 'easy-peasy';
import { MyPothiTheme, Element } from '../types/types';
import { LineContext } from './components/main/LineBlock';


const useLine = () => {
  const LineCtx = useContext( LineContext );

  return LineCtx.line;
};
const useMPTheme = (): MyPothiTheme => {
  const theme = useTheme();
  return theme;
};

export { useLine, useMPTheme };

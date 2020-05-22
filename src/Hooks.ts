import { useContext, createContext } from 'react';
import { useTheme } from 'react-native-paper';
import { MyPothiTheme } from '../types/types';


const LineContext = createContext( { line: '' } );

export { LineContext };


const useLine = () => {
  const LineCtx = useContext( LineContext );

  return LineCtx.line;
};
const useMPTheme = (): MyPothiTheme => {
  const theme = useTheme();
  return theme;
};

export { useLine, useMPTheme };

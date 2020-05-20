import React from 'react';
import { useTheme } from 'react-native-paper';
import { MyPothiTheme } from '../types/types';

const useMPTheme = (): MyPothiTheme => {
  const theme = useTheme();
  return theme;
};

export { useMPTheme };

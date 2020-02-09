import React, { useState } from 'react';
import { IGutkaCtx, IGlobalCtx, IViewerCtx } from '../Config/interfaces';

export const GutkaContext = React.createContext<IGutkaCtx>({
  gutkas: [],
  createGutka: () => { },
  currentItems: [],
  removeFromGutka: () => { },
  addToGutka: () => { },
  isDataReady: false,
})
export const GlobalContext = React.createContext<IGlobalCtx>({
  currentName: 'Loading...',
  updateCurrentGutka: () => { },
  isEditMode: false,
  toggleEditMode: () => { },
  currShabadID: 0,
  updateCurrShabadID: () => { }
});
export const ViewerContext = React.createContext<IViewerCtx>({
  gurmukhiSize: 12,
  translSize: 12,
  translitSize: 12,
  updateFontSize: () => { },
  displayEngTransl: true,
  displayPunTansl: true,
  displayTranslit: true,
  updateDisplay: () => { },
})
# Contexts
This file provides all the contexts that are used in the app. These contexts are provided at the the top level in `app.tsx` as parents for the app. 

These contexts don't use custom providers so that their values can be initialized in `app.tsx` when app mounts. This is done so that all functions regarding gutkas, their state, and their storage is handled from one top level component instead of spread out across the app.

For this reason these contexts are instead provided with default values before being initialized in `app.tsx`

### 1. Gutka Context
holds all functions and variables that have to do with modification of gutkas
```javascript
export const GutkaContext = React.createContext<IGutkaCtx>({
  gutkas: [],
  createGutka: () => { },
  currentItems: [],
  removeFromGutka: () => { },
  addToGutka: () => { },
  isDataReady: false,
})
```
new context created with type of `IGutkaCtx`. [View properties](/docs/files/config/types.ts).

Defaults: 
- `gutkas`: empty array
- `createGutka`: empty function
- `currentItems`: empty array
- `removeFromGutka`: emtpy function
- `addToGutka`: empty function
- `isDataReady`: false

## 2. Global Context
Contains all the global app state variables that define things such as edit mode and current gutka name (for headers etc)
```javascript
export const GlobalContext = React.createContext<IGlobalCtx>({
  currentName: 'Loading...',
  updateCurrentGutka: () => { },
  isEditMode: false,
  toggleEditMode: () => { },
  currShabadID: 0,
  updateCurrShabadID: () => { }
});
```
type: `IGlobalCtx`. [View properties](/docs/files/config/types.ts).

Defaults: 
- `currentName`: Loading...
- `updateCurrentGutka`: empty function
- `isEditMode`: false
- `toggleEditMode`: emtpy function
- `currentShabadID`: 0
- `updateCurrShabadID`: empty function

## 3. Viewer Context
variables to do with viewer state, such as font sizes, and toggling elements (translit etc)
```javascript
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
```
type: `IViewerCtx`. [View Properties](/docs/files/config/types.ts).

Defaults: 
- `gurmukhiSize`: 12
- `translSize`: 12
- `translitSize`: 12
- `updateFontSize`: emtpy function
- `displayEngTransl`: true
- `displayPunTransl`: true
- `displayTranslit`: true
- `updateDisplay`: emtpy function

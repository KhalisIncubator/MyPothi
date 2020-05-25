# Hooks.ts

This page is the Documentation for `src/Hooks.ts`

There are two Hooks in this file: `useLine()` and `useMPTheme()`. 

## UseMPTheme
```js
const useMPTheme = (): MyPothiTheme => {
  const theme = useTheme();
  return theme;
};
```
useMPTheme is a monkey patch to allow custom properties to [react-native-paper](https://reactnativepaper.com/) theme, which has limited theme properties that we can include, documented [here](https://callstack.github.io/react-native-paper/theming.html). In `App.tsx`, I have declared a [custom types](https://github.com/KhalisIncubator/MyPothi/blob/dev/src/App.tsx#L33) property that includes some other styles that I want. This function takes that theme and applies it to a custom type that I have declared so that Typescript will calm down when I try to access this custom field. There is an [issue open](https://github.com/callstack/react-native-paper/issues/1929) in the RN Paper repo to support custom properties so that this monkey patch is no longer needed .

## Line Context and useLine

This hook is more complicated to explain because it requires knowledge of the way text is laid out in MyPothi. Before continuing on in this sections, please read [this section]() of the Text documentation where this problem is described in detail. 

``` js
const LineContext = createContext( { line: '' } );

export { LineContext };
```
Here the LineContext is declared. To prevent issues where the line property is null on reload of the app, its line property has been declared to an empty string. This will prevent a crash on reload of the app (since text and text menus depend on this line property, if it is ever null, the functions that parse text will cause an error and crash the app).

`useLine` simply exports the line property from the LineContext.

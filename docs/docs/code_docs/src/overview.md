# Overview

The root files inside the `src` (source) folder contain the entry point into the app and some default settings for the app. 


## Files

**App.tsx** 

This is the entry point into the app. Themes are also declared here; however there is an [open proposal](https://github.com/KhalisIncubator/MyPothi/issues/91) to move them.  

The Redux Store (from [easy peasy](https://easy-peasy.now.sh/)) and the Theme Provider are connected here and decisions on what theme to provide are executed here. 

This file is essentially a wrapper for the `Routes` navagation component to provide state to the application.


**Routes.tsx**

This is the React Navigation 5.x component for the App. It contains a Drawer Navigation (there is a [proposal](https://github.com/KhalisIncubator/MyPothi/issues/99) right now to remove it), and a stack navigator that represents the main screens of the app. 

**Defaults.js**

This file defines the default Pothi Sahib that is loaded for the user on the first initialization, and Banis order for the Search screen.


**SettingsConsts.js**

Provides state and data mappings for dynamically generated settings. 

**Functions.ts**

These are functions that have been pulled out of Components to ease testing. While some of these functions have been moved to other areas of the code, these have been kept in the root folder because they deal with Pangtees (which are the base of the app). 


**Hooks.ts**

There are many Hooks.ts files in this app, which provide hooks based off the context that they are included in (ie `Hooks.ts` in the `store` subfolder provide hooks for the state of the app). This file provides hooks for theme and Pangtees.
# Dependencies

This page goes over the major dependencies of the application.

## Easy-Peasy
Link: https://easy-peasy.now.sh/

This provides a redux-based store that removes the boilerplate and keeps the stability of Redux for large stores (like MyPothi)
## RN Community/Async-Storage
This package provides the persistence of the app store (from Easy Peasy). 
## Realm
This Database solution is used for the local storage that MyPothi uses. All Pothis, Shabads, and modifications are stored in this database. 

There is an [open proposal]() to replace this database solution
## Nanoid
This package is used to generate a unique, 20 character id for each addition into the local database (Pothis, shabads, mods, etc).

## React Native Paper
This package provides the theming capabilities as well as components that are hooked into the theme.
## React Navigation
This package is used for navigation within the app (Drawer Navigation and normal page navigation)
## React Native Vector Icons
This provides the icons for the app. The app currently uses the Feather Icons from this package.
## React Native Modal
This provides the downloading modal shown when a shabad/bani is being downloaded to the user’s device, using clean, native 60 fps animations (as the base react native modal and animations were not good enough).

## RN Community/Clipboard
This package is used for the copy function for Pangtees.


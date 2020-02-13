# Codebase Structure
The My Pothi codebase is divided into these main sections (not including the folders created by react-native init): 
1. Configuration Files
2. Context files
3. Screens
4. Components

## Configuration Files
`./config `

Files that set up configuration for either: 
- the application on startup
- the codebase (primarily typescript)



Files: 
   - [defaults.js](/)
   - [types.ts](/)
   - [interfaces.ts](/)


## Context Files
Path `.contexts`

All the contexts to manage state inside the app. 
Files:
- [Context.ts](/docs/files/contexts/contexts_ts.md)

## Screens
Path `./screens`

All the screens involved in the app: 
- gutka.tsx
- add.js
- settings.js
- viewer.js

## Components
Path `./components`

All the components that are used in the app

Paths: 
- Drawer
- Main
- Navigation

### Drawer
all the items to create the custom drawer component
- CustomDrawerComponent.js
- CustomDrawerItems.js

### Main
main component used on main screens (gutka, viewer, add)
- AddShabadButton.js
- LineBlock.js
- ShabadButton.js

### Navigation (TO BE DEPRECATED when React Navigation is updated to 5.x)
navigation items for headers
- Icon.js
- MainHeader.js

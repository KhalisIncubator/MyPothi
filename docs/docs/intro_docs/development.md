# Development
This document is for developers interested in helping out the development of this app. If you wish to contribute in other ways, please see the Contributing page.

## Overview
This [React Native](https://github.com/facebook/react-native) project is setup using the [react-native-cli](https://github.com/react-native-community/cli) and the react native [typescript template](https://github.com/react-native-community/react-native-template-typescript/tree/master/template). 

MacOS is recommended for developing this application, as you will then have access to XCode and Android studio. While developing this application, it is recommended that you use the XCode simulator, as it is faster and less strenuous than the Android Studio counterpart. 

## Getting Started
### Prerequisites
Before beginning the startup for react-native configuration, there are a few tools that must be installed before hand.

1. ` NodeJS`, preferably version 10.15.3 and above. 
While Version 8 of Node should work, v8 has reached its end of support and many tools  and projects will stop supporting it. 

2. `Git` 

If you are on MacOS, and have Xcode installed, you will need to install tools that are required by Xcode to run. To access the download button for these tools, simply open Xcode and you will be prompted to install them.

Notes: 
 
 For NodeJS, if you have multiple versions installed via Node Version Manager (NVM), you can use these commands to set a specific verion: 
 
##### Change version for current terminal session: 
 run `nvm use 10`. This will reset back to your default Node version in all other terminal sessions
 
##### Change global default


rn `nvm alias default 10`. This will set your global default version in all future terminal sessions (don't forget to restart your terminal if you do this!). 

### Reat Native Setup

This project is not managed by Expo, and instead uses vanilla React Native (called the 'bare workflow in the Expo documentation). 

To complete this part of the setup, please follow [this guide](https://reactnative.dev/docs/environment-setup) under `React Native CLI Quickstart` for Android if you are on Windows, and both iOS and Android if you are on MacOS.


### IDE

Although there is no limitation on what IDE you can use, it is recommended that you use [Visual Studio Code (VSCode)](https://code.visualstudio.com/Download)

##### Here are some extensions that you can use for VSCode: 
 1. [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
3. [NPM Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

### ESlint: 
This project uses Eslint instead of Prettier, as some prettier configurations conflict with Eslint settings, and it was decided to keep one formatter. 

 `Enable Eslint format on save.`

 This will enable auto format on save so that all of your code is up to standard with this projects’s Eslint setup.
To enable this setting: 

1. Open VSCode and execute the following keyboard shortcut: `cmd+shift+p` on mac and `ctrl+shift+p` on windows. This will open up the command palette
2. Once the command palette is open, search for the option : `Preferences: Open Settings (JSON)`. This will open up your editor Settings in a JSON format
3. Paste this line at the end of your document: 
```
”editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```


Congratulations! Now you do not need to worry about how you write you code; Eslint will fix it for you! :)

## Adding Code
This will now guide you through the process of contributing changes to the codebase. 

### Issues
Please see the Contributing doc
### Commits

Commits consist of a title and body, separated by one line. 
```
[Identifier]: title

// body, write smaller notes here that are elaboration on the title or elaborates items that were omitted from the title
```

##### Commit Identifiers

 - _feat_ introduces a new feature
- _fix_ fix a bug introduced in previous commits
- _cleanup_ clean up the code, usually used at the end of a pr (removing temporary monkey-patches, updating variable names to a more descriptive name etc)
- _ref_ refactor code 
- _docs_ documentation changes


It is recommended to commit early and often ( do not follow in my footsteps - @AkalUstat) so that when people go over your PR, it is easier to track changes.

### PR (Pull Requests)
Please open up a pull request soon after you start committing, so that your changes and work remains visible. This is so that maintainers can keep up on your work, on any device.
##### Merging
Once your PR passes the `LGTM` test for code quality and a reviewer has approved your changes, your commits will be `squashed and merged` into dev.

Even if you are the sole developer of MyPothi, it would be nice to open a PR to add visibility to your work. 

Please do not open PRs to the master branch, as it is protected and only maintainers can push to master. 





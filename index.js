/* eslint-disable import/extensions */
/**
 * @format
 */

import { AppRegistry } from 'react-native'
import 'react-native-get-random-values'

import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent( appName, () => App )

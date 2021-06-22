import Reactotron from 'reactotron-react-native'
import ReactotronFlipper from 'reactotron-react-native/dist/flipper'
import AsyncStorage from '@react-native-async-storage/async-storage'

Reactotron
  .setAsyncStorageHandler( AsyncStorage ) 
  .configure( {
    name: 'MyPothi',
    createSocket: ( path ) => new ReactotronFlipper( path )
  } ) 
  .useReactNative() 
  .connect()

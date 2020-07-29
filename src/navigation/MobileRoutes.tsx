import React from 'react'
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FullScreenCtx } from '../store/context_stores/Contexts'
import Edit from '../screens/Edit'
import Pothi from '../screens/Pothi'
import Search from '../screens/Search'
import SettingsScreen from '../screens/Settings'
import { MainRouteParams } from './'
import { Homescreen } from '../screens/Homescreen'
const Main = createStackNavigator<MainRouteParams>()

const MobileRoutes = () => (
  <NavigationContainer>
  <FullScreenCtx.Provider>
    <Main.Navigator
      initialRouteName="Home"
      headerMode="float"
    >
      <Main.Screen name="Pothi" component={Pothi} options={{ headerRight: ( { navigation } ) => (
        <Button
              onPress={() => navigation.navigate( 'Settings' )}
              title="Info"
              color="#fff"
            /> ) }} />
      <Main.Screen name="Settings" component={SettingsScreen} />
      <Main.Screen name="Search" component={Search} />
      <Main.Screen name="Edit" component={Edit} />
      <Main.Screen name="Home" component={Homescreen} options={{ headerShown: false }}/>
    </Main.Navigator>
  </FullScreenCtx.Provider>
  </NavigationContainer>
)


export { MobileRoutes }

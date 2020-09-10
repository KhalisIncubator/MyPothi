import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Edit from '../screens/Edit'
import Pothi from '../screens/Pothi'
import Search from '../screens/Search'
import SettingsScreen from '../screens/Settings'

import { Homescreen } from '../screens/Homescreen'
const Main = createStackNavigator<MainRouteParams>()

type MainRouteParams = {
  Pothi: {pothiName: string},
  Settings: null,
  Search: null,
  Home: null
}

const MobileRoutes = () => (
  <NavigationContainer >
    <Main.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004c87'
      },
      headerTitleStyle: {
        color: '#FFF'
      },
      headerBackTitleStyle: {
        color: '#FFF',
      },
      }}
    >
      <Main.Screen  
        name="Pothi"  
        component={Pothi}  
        options={( { route } ) => ( {
          title: route.params.pothiName
        } )}
        //options={( { navigation } ) => (  
        //   { headerRight: () => <Button title="yo" onPress={()=> navigation.navigate( "Settings" )}></Button> }  
      // )} />
      />
      <Main.Screen name="Settings" component={SettingsScreen} />
      <Main.Screen name="Search" component={Search} />
      <Main.Screen name="Home" component={Homescreen} options={{ headerShown: false }}/>
    </Main.Navigator>
  </NavigationContainer>
)
export { MobileRoutes }

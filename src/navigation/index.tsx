import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Viewer } from 'screens/Viewer'
import { Search } from 'screens/Search'
import { Homescreen } from 'screens/Homescreen'
import SettingsScreen from '../screens/Settings/Settings'


export type MainRouteParams = {
  Viewer: {pothiName: string},
  Settings: undefined,
  Search: undefined,
  Home: undefined
}
const Main = createStackNavigator<MainRouteParams>()

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
        name="Viewer"  
        component={Viewer}  
        options={( { route } ) => ( {
          title: route.params.pothiName
        } )}
        //options={( { navigation } ) => (  
        //   { headerRight: () => <Button title="yo" onPress={()=> navigation.navigate( "Settings" )}></Button> }  
      // )} />
      />
      <Main.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Main.Screen name="Search" component={Search} />
      <Main.Screen name="Home" component={Homescreen} options={{ headerShown: false }}/>
    </Main.Navigator>
  </NavigationContainer>
)
export { MobileRoutes }

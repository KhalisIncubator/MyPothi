import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Viewer } from 'screens/Viewer'
import { Search } from 'screens/Search'
import { Homescreen } from 'screens/Homescreen'
import SettingsScreen from '../screens/Settings/Settings'
import { useTheme } from 'store/Theme'
import Icon from 'react-native-vector-icons/Feather'
import { useCurrentState } from 'store/Current'
import { Colors } from 'utils/Themes'


export type MainRouteParams = {
  Viewer: undefined,
  Settings: undefined,
  Search: undefined,
  Home: undefined
}
const Main = createStackNavigator<MainRouteParams>()
const MobileRoutes = () => {
  const [ theme ] = useTheme()
  const [ currentPothi ] = useCurrentState()
  return (
    <NavigationContainer >
      <Main.Navigator
        initialRouteName="Home"
        headerMode="float"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: '#FFF'
          },
          headerBackTitleStyle: {
            color: '#FFF',
          },
          headerBackTitleVisible: false,
          headerBackImage: () => <Icon name="arrow-left" size={25} style={{ color: Colors.White, marginLeft: 10 }} />
        }}
      >
        <Main.Screen
          name="Viewer"
          component={Viewer}
          options={{ title: currentPothi }}
        //options={( { navigation } ) => (  
        //   { headerRight: () => <Button title="yo" onPress={()=> navigation.navigate( "Settings" )}></Button> }  
        // )} />
        />
        <Main.Screen name="Settings" component={SettingsScreen} />
        <Main.Screen name="Search" component={Search} />
        <Main.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
      </Main.Navigator>
    </NavigationContainer>
  )
}
export { MobileRoutes }

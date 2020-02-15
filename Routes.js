import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Gutka from './Screens/Gutka';
import Shabad from './Screens/Shabad';
import CustomDrawerComponent from './Components/Drawer/CustomDrawer';
import SettingsScreen from './Screens/Settings';
import AddScreen from './Screens/Add';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gutka" component={Gutka} />
      <Stack.Screen name="ShabadViewer" component={Shabad} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  )
}
const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerComponent {...props} />}>
      <Drawer.Screen name="Stack" component={ScreenStack} />
    </Drawer.Navigator>
  )
}

// const DrawerNav = createDrawerNavigator(
//   {
//     Gutka: Gutka,
//     ShabadViewer: Shabad,
//     Settings: SettingsScreen,
//     Add: AddScreen
//   },
//   {
//     contentComponent: CustomDrawerComponent,
//   },
// );

const Routes = () => {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
export default Routes;

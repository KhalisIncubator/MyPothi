/* eslint-disable import/extensions */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from './Components/navigation/Drawer';
import Gutka from './Screens/Gutka';
import SettingsScreen from './Screens/Settings';
import Edit from './Screens/Edit';
import { Header } from './Components/navigation/Headers';
import Search from './Screens/Search';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ScreenStack = () => (
        <Stack.Navigator
            initialRouteName="Gutka"
            headerMode="screen"
            screenOptions={{
              header: ( { previous, navigation } ) => (
                    <Header previous={previous} navigation={navigation} />
              ),
            }}>
            <Stack.Screen name="Gutka" component={Gutka} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
);

const DrawerNav = () => (
        <AppDrawer.Navigator drawerContent={( props ) => <Drawer {...props} />}>
            <AppDrawer.Screen name="Stack" component={ScreenStack} />
        </AppDrawer.Navigator>
);

const Routes = () => (
        <NavigationContainer>
            <DrawerNav />
        </NavigationContainer>
);
export default Routes;

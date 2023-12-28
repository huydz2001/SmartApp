import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import Verification from '../screens/Verification';
import routes from '../constants/routes'
import BottomNavigator from './BottomNavigator';
import JoinFamilyScreen from '../screens/family/JoinFamilyScreen';
import CreateFamilyHome from '../screens/family/CreateFamilyScreen';
import { Provider } from "react-redux";
import store from '../data/redux/store'
import DetailsFamilyScreen from '../screens/family/DetailsFamilyScreen';
import EditProfileScreen from '../screens/home/EditProfileScreen';
import AddNewTask from '../screens/home/AddScheduleScreen';

const Stack = createNativeStackNavigator();

function AppNaviagtion() {
    return (
        <Provider store={store}>
            <Stack.Navigator initialRouteName={routes.SPLASH} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={routes.SPLASH} component={SplashScreen} />
                <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
                <Stack.Screen name={routes.SIGNUP} component={SignUpScreen} />
                <Stack.Screen name={routes.VERIFY} component={Verification} />
                <Stack.Screen name={routes.JOINHOME} component={JoinFamilyScreen} />
                <Stack.Screen name={routes.CREATEHOME} component={CreateFamilyHome} />
                <Stack.Screen name={routes.HOMEDETAILS} component={DetailsFamilyScreen} />
                <Stack.Screen name={routes.BTNBOTTOM} component={BottomNavigator} />
                <Stack.Screen name={routes.EDITPROFILE} component={EditProfileScreen} />
                <Stack.Screen name={routes.ADDTASK} component={AddNewTask} />
            </Stack.Navigator>
        </Provider>
    );
}

export default AppNaviagtion;
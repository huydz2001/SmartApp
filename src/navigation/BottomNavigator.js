import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/home/ChatScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import TasksScreen from '../screens/home/TasksScreen';
import HomeScreen from '../screens/home/HomeScreen';
import routes from '../constants/routes';
import { Message, Profile, Home, TaskSquare } from 'iconsax-react-native';
import BtnBottomComponent from '../components/btnBottomComponent';
import { styles } from '../assets/styles/global';
import NotjoinComponent from '../components/NotjoinComponent';
import JoindedComponent from '../components/JoindedComponent';
import { getUserById } from "../api/userAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from "base-64";
global.atob = decode;
import { setUser, fetchUsers } from '../data/redux/actions/userActions'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";



export default function BottomNavigator() {

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [])


    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    alignItems: 'center',
                    height: 80,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    justifyContent: 'space-between'
                },
                tabBarIcon: ({ focused, color, size, variant }) => {
                    if (route.name === routes.HOME) {
                        return (
                            <BtnBottomComponent localStyles={{ backgroundColor: focused ? '#c6e3eb' : '#fff' }}>
                                <Home size={size} color={focused ? "#4c4d4d" : "#676767"} />
                                {focused && <Text style={styles.tabLabel}>Home</Text>}
                            </BtnBottomComponent>
                        )
                    }
                    else if (route.name === routes.TASK) {
                        return (
                            <BtnBottomComponent localStyles={{ backgroundColor: focused ? '#c6e3eb' : '#fff' }}>
                                <TaskSquare size={size} color={focused ? "#4c4d4d" : "#676767"} />
                                {focused && <Text style={styles.tabLabel}>Tasks</Text>}
                            </BtnBottomComponent>
                        )
                    }
                    else if (route.name === routes.CHAT) {
                        return (
                            <BtnBottomComponent localStyles={{ backgroundColor: focused ? '#c6e3eb' : '#fff' }}>
                                <Message size={size} color={focused ? "#4c4d4d" : "#676767"} />
                                {focused && <Text style={styles.tabLabel}>Chat</Text>}
                            </BtnBottomComponent>
                        )
                    }
                    else if (route.name === routes.PROFILE) {
                        return (
                            <BtnBottomComponent localStyles={{ backgroundColor: focused ? '#c6e3eb' : '#fff' }}>
                                <Profile size={size} color={focused ? "#4c4d4d" : "#676767"} />
                                {focused && <Text style={styles.tabLabel}>Profile</Text>}
                            </BtnBottomComponent>
                        )
                    }
                }
            })}>
            <Tabs.Screen name={routes.HOME} component={HomeScreen} options={{ headerTitle: "Home" }} />
            <Tabs.Screen name={routes.TASK} component={TasksScreen} options={{ headerTitle: "Tasks" }} />
            <Tabs.Screen name={routes.CHAT} component={ChatScreen} options={{ headerTitle: "Chat" }} />
            <Tabs.Screen name={routes.PROFILE} component={ProfileScreen} options={{ headerTitle: "Profile" }} />
        </Tabs.Navigator>
    )
}

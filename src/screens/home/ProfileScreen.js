
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { decode } from "base-64";
global.atob = decode;
import routes from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Calendar, Logout, Messages3, Mobile, Profile, UserEdit } from 'iconsax-react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '../../data/redux/actions/userActions';
import { deleteHome } from '../../data/redux/actions/homeActions';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const user = useSelector((state) => state.userInfor.user)
  const [imageUrl, setImageUrl] = useState(`${routes.URL_IMAGE_USER}${user.image}`);

  const logOut = async () => {
    await AsyncStorage.clear()
    const token = await AsyncStorage.getItem("AccessToken")
    if(!token){
      dispatch(deleteHome())
      dispatch(deleteUser())
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routes.LOGIN }],
        })
      );
    }
  }

  useEffect(() => {
    setImageUrl(`${routes.URL_IMAGE_USER}${user.image}`)
  }, [user.image])

  return (
    <GestureHandlerRootView className="w-full h-full m-0 flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="px-8 pb-5 flex justify-between flex-row items-center">
          <View className="flex-row mt-4">
            <Avatar.Image
              source={{
                uri: imageUrl,
              }}
              size={80}
            />
            <View className="ml-5">
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}></Title>
              <Caption style={styles.caption}>@{user.name}</Caption>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(routes.EDITPROFILE)}>
            <UserEdit size="30" color="#FF8A65" />
          </TouchableOpacity>
        </View>

        <View className="px-8 pb-7">
          <View style={styles.row}>
            <Profile color="#777777" size={23}></Profile>
            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.id}</Text>
          </View>
          <View style={styles.row}>
            <Mobile color="#777777" size={23}></Mobile>
            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
          </View>
          <View style={styles.row}>
            <Messages3 color="#777777" size={23}></Messages3>
            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email ? user.email : "---"}</Text>
          </View>
          <View style={styles.row}>
            <Calendar color="#777777" size={23}></Calendar>
            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.dob ? user.dob : "---"}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={logOut}>
            <View style={styles.menuItem}>
              <Logout size="32" color="#FF8A65" />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
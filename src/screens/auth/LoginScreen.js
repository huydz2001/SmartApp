import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import routes from '../../constants/routes'
import AsyncStorage from "@react-native-async-storage/async-storage";
import userAPI, { user_login, getUserById } from "../../api/userAPI";
import { decode } from "base-64";
global.atob = decode;
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../data/redux/actions/userActions";
import placeholder from "../../assets/images/avatar.jpg"
import { fetchHome } from "../../data/redux/actions/homeActions";





export default function LoginScreen() {
  const navigation = useNavigation();


  const [inputs, setInputs] = useState({
    phone: "",
    password: ""
  });

  const handleOnchange = (text, input) => {
    setInputs((prev) => ({ ...prev, [input]: text }));
  };

  const dispatch = useDispatch();


  const Login = async () => {
    try {
      await user_login(inputs)
        .then((result) => {
          if (result.status == 200) {
            AsyncStorage.setItem("AccessToken", result.data.data.accessToken)
            AsyncStorage.setItem("RefreshToken", result.data.data.refreshToken)
            dispatch(fetchUsers())
            dispatch(fetchHome())
            alert("Login Success")
            setTimeout(() => {
              navigation.navigate(routes.BTNBOTTOM)
            },1000)
          }
          else {
            alert("Sai tai khoan hoac mat khau")
          }
        })
    }
    catch (error) {
      console.log("err:", error);
    }
  }
  

  return (
    <View className="flex-1 m-0 bg-white" style={{ backgroundColor: "red" }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <KeyboardAvoidingView>
            <Animated.View
              entering={FadeInDown.delay(200).duration(100).springify()}
            >
              <Text className="ml-4 text-gray-700 mb-2">Số điện thoại</Text>
              <TextInput
                onChangeText={(text) => handleOnchange(text, "phone")}
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Nhập số điện thoại"
              />
            </Animated.View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <Animated.View
              entering={FadeInDown.delay(300).duration(1000).springify()}
            >
              <Text className="ml-4 text-gray-700 mb-2">Mật khẩu</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                onChangeText={(text) => handleOnchange(text, "password")}
                secureTextEntry
                returnKeyType="done"
                placeholder="Nhập mật khẩu"
              />
            </Animated.View>
          </KeyboardAvoidingView>
          <Animated.View
            entering={FadeInDown.delay(300).duration(1000).springify()}
          >
            <TouchableOpacity className="flex items-end mt-2 mb-5">
              <Text>Quên mật khẩu ?</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-2xl"
              onPress={Login}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* 
        <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()}>
          <Text className="text-l text-gray-700 font-bold text-center py-2 mt-3 mb-2">
            Or
          </Text>
        </Animated.View> */}

        {/* <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/images/google.png')} className="w-8 h-8" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/images/facebook.png')} className="w-8 h-8" />
          </TouchableOpacity>
        </Animated.View> */}
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Không có tài khoản ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-400"> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

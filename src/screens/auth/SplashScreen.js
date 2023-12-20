import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from '../../constants/routes';
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getDataToken from "../../utilies/GetDataToken";
import { decode } from "base-64";
global.atob = decode;
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../api/userAPI";


const SplashScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            handleGetToken();
        }, 3000);
    }, []);

    const handleGetToken = async () => {
        AsyncStorage.clear()
        const dataToken = await AsyncStorage.getItem("AccessToken")
        if (!dataToken) {
            axios.defaults.headers.common['Authorization'] = "";
            navigation.navigate(routes.LOGIN)
        }
        else {
            axios.defaults.headers.common['Authorization'] = `Bear ${dataToken}`;
            const user = await AsyncStorage.getItem("User");
            console.log(user)
            navigation.navigate(routes.BTNBOTTOM, {user: user})
        }
    }

    return (
        <View className="flex-1 bg-white m-0 ">
            <LottieView
                className="h-auto"
                source={require("../../assets/animations/start.json")}
                autoPlay={true}
                loop={true}
                speed={1.5}
            />
        </View>
    );
};

export default SplashScreen;

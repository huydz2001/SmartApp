import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    SafeAreaView
} from "react-native";

import { CloudChange, Notification } from "iconsax-react-native";
import JoindedComponent from "../../components/JoindedComponent";
import NotjoinComponent from "../../components/NotjoinComponent";
import { decode } from "base-64";
global.atob = decode;
import routes from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../data/redux/actions/userActions";
import placeholder from "../../assets/images/avatar.jpg"
import { fetchHome } from "../../data/redux/actions/homeActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function HomeScreen() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userInfor.user);
    const home = useSelector((state) => state.homeInfor.home);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchHome())
    }, [])

    useEffect(() => {
        if (user) {
            setImageUrl(`${routes.URL_IMAGE_USER}${user.image}`);
        }
    }, [user]);

    return (
        <View className="flex-1 m-0 bg-white px-3">
            <SafeAreaView className="flex container">
                <View className="flex-row items-center justify-between px-2">
                    <View className="mt-3 flex-row items-center">
                        <Image
                            className="rounded-2xl"
                            source={user.image ? { uri: imageUrl } : placeholder}
                            style={{ width: 60, height: 60 }}
                        />
                        <View className="ml-4">
                            <Text className="text-base">Hi,</Text>
                            <Text className="text-lg font-medium">{user.name}</Text>
                        </View>
                    </View>
                    <View className="pr-3">
                        <Notification size="28" color="#676767" />
                    </View>
                </View>
            </SafeAreaView>
            <View className="">
                {user.role != 0 && home.members ? <JoindedComponent home={home} /> : <NotjoinComponent />}
            </View>
        </View>
    )

}

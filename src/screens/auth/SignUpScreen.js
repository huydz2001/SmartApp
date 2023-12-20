import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    FlatList,
    ScrollView,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

import { isValidNumberPhone, isValidPass } from "../../utilies/validation";


export default function SignUpScreen() {

    const navigation = useNavigation();

    const [inputs, setInputs] = React.useState({
        fullName: "",
        phone: "",
        password: "",
        rePassword: "",
    });

    let isValid = false;

    const handleOnchange = (text, input) => {
        setInputs((prev) => ({ ...prev, [input]: text }));
    };

    const [errors, setErr] = React.useState("");

    const validate = () => {
        Keyboard.dismiss();
        isValid = false;
        if (!inputs.fullName) {
            isValid = true;
            handleError("Please input fullname", "fullName");
        }
        if (!inputs.phone) {
            isValid = true;
            handleError("Please input phone number", "phone");
        } else if (isValidNumberPhone(inputs.phone) == false) {
            isValid = true;
            handleError("Please input correct format phone number", "phone");
        }
        if (!inputs.password) {
            isValid = true;
            handleError("Please input password", "password");
        } else if (isValidPass(inputs.password) == false) {
            isValid = true;
            handleError("Please input at least 6 characters", "password");
        }
        if (!inputs.rePassword) {
            isValid = true;
            handleError("Please input confirm password", "rePassword");
        } else if (inputs.rePassword != inputs.password) {
            isValid = true;
            handleError("Confirm password not match", "rePassword");
        }
    };

    const register = async () => {
        const user = {
            name: inputs.fullName,
            phone: inputs.phone,
            password: inputs.password
        }

        validate();

        // navigation.navigate("Verification", { phone: inputs.phone });

        if (!isValid) {

        }
    };

    const handleError = (errorMess, input) => {
        setErr((prev) => ({ ...prev, [input]: errorMess }));
    };

    return (
        <View className="flex-1 m-0 bg-white" style={{ backgroundColor: "red" }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-center">
                    <Image
                        source={require("../../assets/images/signup.png")}
                        style={{ width: 165, height: 110 }}
                    />
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView
                className="flex-1"
                style={{
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    overflow: "hidden",
                }}
                backgroundColor="white"
                keyboardVerticalOffset={50}
                behavior="padding"
            >
                <ScrollView className="flex-1">
                    <View
                        className="flex-1 bg-white px-8 pt-8"
                        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                    >
                        <View className="form mt-0">
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(1000).springify()}
                            >
                                <Text className="ml-4 text-gray-700 mb-2">Họ và tên</Text>
                                <TextInput
                                    returnKeyType="done"
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    placeholder="Nhập họ tên"
                                    onFocus={() => {
                                        handleError(null, "fullName");
                                    }}
                                    onChangeText={(text) => handleOnchange(text, "fullName")}
                                />
                                <Text className="text-red-500 text-xs px-5">
                                    {errors.fullName}
                                </Text>
                            </Animated.View>
                            <Animated.View
                                entering={FadeInDown.delay(300).duration(1000).springify()}
                            >
                                <Text className="ml-4 mt-3 text-gray-700 mb-2">
                                    Số điện thoại
                                </Text>
                                <TextInput
                                    returnKeyType="done"
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    onFocus={() => {
                                        handleError(null, "phone");
                                    }}
                                    onChangeText={(text) => {
                                        handleOnchange(text, "phone");
                                    }}
                                />
                                <Text className="text-red-500 text-xs px-5">
                                    {errors.phone}
                                </Text>
                            </Animated.View>
                            <Animated.View
                                className=""
                                entering={FadeInDown.delay(300).duration(1000).springify()}
                            >
                                <Text className="ml-4 mt-3 text-gray-700 mb-2">Mật khẩu</Text>
                                <TextInput
                                    returnKeyType="done"
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    secureTextEntry
                                    placeholder="Nhập mật khẩu"
                                    onFocus={() => {
                                        handleError(null, "password");
                                    }}
                                    onChangeText={(text) => {
                                        handleOnchange(text, "password");
                                    }}
                                />
                                <Text className="text-red-500 text-xs px-5 mb-2">
                                    {errors.password}
                                </Text>
                            </Animated.View>
                            <Animated.View
                                className="mb-5 mt-2"
                                entering={FadeInDown.delay(300).duration(1000).springify()}
                            >
                                <Text className="ml-4 text-gray-700 mb-2">
                                    Nhập lại mật khẩu
                                </Text>
                                <TextInput
                                    returnKeyType="done"
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    secureTextEntry
                                    placeholder="Nhập lại mật khẩu"
                                    onFocus={() => {
                                        handleError(null, "rePassword");
                                    }}
                                    onChangeText={(text) => {
                                        handleOnchange(text, "rePassword");
                                    }}
                                />
                                <Text className="text-red-500 text-xs px-5 mb-2">
                                    {errors.rePassword}
                                </Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(400).duration(1000).springify()}
                            >
                                <TouchableOpacity
                                    className="py-3 bg-yellow-400 rounded-2xl"
                                    onPress={register}
                                >
                                    <Text className="font-xl font-bold text-center text-gray-700">
                                        Đăng ký
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <View className="flex-row justify-center mt-7">
                            <Text className="text-gray-500 font-semibold">
                                Bạn đã có tài khoản ?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text className="font-semibold text-yellow-400">
                                    {" "}
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

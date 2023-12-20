import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function Verification({ route }) {
    const navigation = useNavigation();

    const [OTPArrCode, setOTPArrCode] = useState(["", "", "", "", "", ""]);

    const disable = OTPArrCode.join("").length != 6;
    const inputRefs = useRef([]);

    const onChangeValue = (text, index) => {
        const newValue = OTPArrCode.map((item, valueIndex) => {
            if (valueIndex === index) {
                return text;
            }
            return item;
        });

        setOTPArrCode(newValue);
    };

    const handleChange = (text, index) => {
        onChangeValue(text, index);
        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus();
        }
        return inputRefs?.current[index - 1]?.focus();
    };

    const verifyCode = () => {
        const otpCode = OTPArrCode.join("");
        alert(otpCode.length);
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex">
                <View className="flex-row justify-start mt-2 ml-2">
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 rounded-2xl"
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeftIcon size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image
                        source={require("../assets/images/signup.png")}
                        style={{ width: 300, height: 250 }}
                    />
                </View>
            </SafeAreaView>
            <View className="flex-1 text-xs px-10">
                <Text className="text-start text-xl">
                    Enter the OTP number just sent you at {route.params.phone}
                </Text>
                <View className="w-full flex-row justify-between mt-10">
                    {Array(6)
                        .fill()
                        .map((data, index) => (
                            <TextInput
                                ref={(ref) => {
                                    if (ref && !inputRefs.current.includes(ref)) {
                                        inputRefs.current = [...inputRefs.current, ref];
                                    }
                                }}
                                className="text-center w-11 rounded-xl h-14 text-2xl bg-slate-400"
                                key={index}
                                maxLength={1}
                                contextMenuHidden
                                selectTextOnFocus
                                editable={true}
                                keyboardType="decimal-pad"
                                returnKeyType="done"
                                onChangeText={(text) => handleChange(text, index)}
                            />
                        ))}
                </View>
                <TouchableOpacity
                    className="py-3 mt-10 bg-yellow-400 rounded-2xl"
                    disabled={disable}
                    onPress={verifyCode}
                >
                    <Text className="font-xl font-bold text-center text-gray-700">
                        Verify
                    </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Didn't recive code ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text className="font-semibold text-yellow-400"> Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

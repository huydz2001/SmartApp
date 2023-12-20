import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft2 } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

export default function JoinFamilyScreen({ route }) {
    const { homeId } = route.params;
    const navigation = useNavigation();

    return (
        <View className="flex-1 m-0 mt-3 bg-white px-3">
            <SafeAreaView className="flex">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="p-2 border-cyan-700 rounded-full border"
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeft2 size="20" color="#676767" />
                    </TouchableOpacity>

                    <View className="w-full -ml-8 justify-center items-center">
                        <Text className="">{homeId}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

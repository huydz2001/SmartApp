import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Add, ArrowLeft2 } from "iconsax-react-native";
import AddUserComponent from "../../components/AddUserComponent";
import {
    BottomSheetModalProvider,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

export default function CreateFamilyHome() {
    const navigation = useNavigation();
    const [familyName, setFamilyName] = useState("");
    const [listUser, setListUser] = useState([]);

    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["85%"];

    const handleChange = (name) => {
        setFamilyName(name);
    };

    const addMember = () => {
        sheetRef.current && sheetRef.current.present();
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 100);
    };

    const addUser = (userId) => {
        const list = [...listUser];
        list.push(user)
    }

    const handlePressOutside = () => {
        if (isOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 100);
            sheetRef.current && sheetRef.current.close();
        }
    };

    return (
        <GestureHandlerRootView className="flex-1 ">
            <BottomSheetModalProvider>
                <SafeAreaView
                    className="flex-1 m-0 bg-white px-3"
                    style={{ backgroundColor: isOpen ? "rgb(203 213 225)" : "white" }}
                >
                    <TouchableWithoutFeedback onPress={handlePressOutside}>
                        <View className="flex">
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    className="p-2 border-slate-300 rounded-full border"
                                    onPress={() => navigation.goBack()}
                                >
                                    <ArrowLeft2 size="20" color="#676767" />
                                </TouchableOpacity>

                                <View className="w-full -ml-8 justify-center items-center">
                                    <Text className="font-semibold text-base">New Family</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <View className="mt-5">
                        <Text className="font-semibold text-xl">Family Name</Text>
                        <TextInput
                            className="p-4 rounded-xl mt-3 w-full border border-slate-300"
                            clearButtonMode="always"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Family name"
                            onChangeText={(name) => handleChange(name)}
                        />
                    </View>

                    <View className="mt-5 flex">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={addMember}
                        >
                            <View className=" mr-2 rounded-full border border-slate-300">
                                <Add className="" size="32" color="#FF8A65" />
                            </View>
                            <Text>Add member</Text>
                        </TouchableOpacity>

                        <View className="">

                        </View>
                    </View>

                    <BottomSheetModal
                        ref={sheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onDismiss={() => setIsOpen(false)}
                        backgroundStyle={{ borderRadius: 30 }}
                    >
                        <View className="w-full h-full flex relative">
                            <AddUserComponent addUserToList={addUser} />
                        </View>
                    </BottomSheetModal>
                </SafeAreaView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    );
}

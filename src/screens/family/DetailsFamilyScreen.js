import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft2 } from 'iconsax-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import AddUserComponent from '../../components/AddUserComponent'
import { Add } from 'iconsax-react-native'
import DisplayUserComponent from '../../components/DisplayUserComponent'
import { fetchHome } from "../../data/redux/actions/homeActions";
import { useDispatch, useSelector } from "react-redux";




const DetailsFamilyScreen = () => {

    const home = useSelector((state) => state.homeInfor.home)
    const user = useSelector((state) => state.userInfor.user)
    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["85%"];
    console.log(home.members.length
    )

    useEffect(() => {
        dispatch(fetchHome())
    }, [])

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack()
    }

    const addMember = () => {
        sheetRef.current && sheetRef.current.present();
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 100);
    };

    const closeBottomSheet = () => {
        sheetRef.current && sheetRef.current.close()
        setTimeout(() => {
            setIsOpen(isOpen);
        }, 100);
    }

    return (
        <GestureHandlerRootView className="flex-1">
            <BottomSheetModalProvider>
                <SafeAreaView className="flex-1 h-full bg-white container px-3">
                    <View className="flex mt-2">
                        <View className="flex-row items-center mb-5 mt-2 w-full">
                            <View className="mr-auto">
                                <TouchableOpacity
                                    className="p-2"
                                    onPress={goBack}
                                >
                                    <ArrowLeft2 size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className=" mr-auto ml-[-28px]">
                                <Text className="text-xl font-semibold">{home.name}</Text>
                            </View>
                        </View>
                    </View>


                    <View className="flex justify-between items-center flex-row px-4">
                        <Text>Home members</Text>
                        <View className="">
                            {
                                user.role == 3 &&
                                (
                                    <TouchableOpacity
                                        className="flex-row items-center"
                                        onPress={addMember}
                                    >
                                        <View className=" mr-2">
                                            <Add className="" size="32" color="#FF8A65" />
                                        </View>
                                        <Text>Add member</Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    </View>

                    <FlatList
                        data={home.members}
                        renderItem={(item, index) => {
                            return (
                                <DisplayUserComponent homeId={home.id} user={item.item}></DisplayUserComponent>
                            )
                        }}

                    >

                    </FlatList>

                    <BottomSheetModal
                        ref={sheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onDismiss={() => setIsOpen(false)}
                        backgroundStyle={{ borderRadius: 30 }}
                    >
                        <View className="w-full h-full flex relative">
                            <AddUserComponent homeId={home.id} closeBottomSheet={closeBottomSheet} />
                        </View>
                    </BottomSheetModal>
                </SafeAreaView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default DetailsFamilyScreen
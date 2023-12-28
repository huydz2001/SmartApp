import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Image,
    StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Add, ArrowLeft2 } from "iconsax-react-native";
import { Camera } from "iconsax-react-native";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../../data/redux/actions/userActions';
import { createHome } from "../../api/homeAPI";


import placeholder from "../../assets/images/avatar.jpg"
import routes from "../../constants/routes";

export default function CreateFamilyHome() {
    const navigation = useNavigation();
    const [familyName, setFamilyName] = useState("");
    const [img, setImg] = useState('')
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userInfor.user)

    const [home, setHome] = useState({
        name: "",
        slogan: "",
        members: [
            {
                userId: user.id,
                userName: user.name,
                imageUser: user.image,
                roleHome: 99,
                status: 2
            }
        ],
        createdBy: user.id,

    });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    const handleChangeName = (newName) => {
        setHome(prevState => ({
            ...prevState,
            name: newName
        }));
    };

    const create = async () => {
        await createHome(home,img).then((result) => {
            if(result.data === "success"){
                alert("Create Success")
                dispatch(fetchUsers())
                setTimeout(() => {
                    navigation.navigate(routes.HOME)
                },1000)
            }
        })
    }

    const handleChangeSlogan = (newSologan) => {
        setHome(prevState => ({
            ...prevState,
            slogan: newSologan
        }));
    }



    // Select image from library or camera
    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            setImg(result.assets[0].uri)
        }
    };



    return (

        <SafeAreaView
            className="flex-1 m-0 bg-white px-3"
            style={{ backgroundColor: "white" }}
        >

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

            <View className="mt-8 items-center w-full h-60 ml-auto mr-auto">
                <TouchableOpacity className="w-full h-full relative " onPress={selectImage}>
                    <Image
                        style={styles.image}
                        source={img ? { uri: img } : placeholder}
                    />

                    <TouchableOpacity TouchableOpacity className="absolute p-1 bottom-3 right-5 border-1 bg-red-200 rounded-full"
                        onPress={selectImage}>
                        <Camera size="28" color="#FF8A65"
                        />
                    </TouchableOpacity>

                </TouchableOpacity>
            </View>


            <View className="mt-5">
                <TextInput
                    className="p-4 rounded-xl mt-3 w-full border border-slate-300"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Family name"
                    onChangeText={(name) => handleChangeName(name)}
                />
            </View>

            <View className="mt-1">
                <TextInput
                    className="p-4 rounded-xl mt-3 w-full border border-slate-300"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Sologan"
                    onChangeText={(sologan) => handleChangeSlogan(sologan)}
                />
            </View>


            <TouchableOpacity style={styles.commandButton} onPress={create}>
                <Text style={styles.panelButtonTitle}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        borderWidth: 4,
        borderColor: '#bcf6f7',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
})

import { View, Text, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddCircle, TickCircle, Trash } from 'iconsax-react-native';
import routes from '../constants/routes';
import placeholder from "../assets/images/avatar.jpg"
import { addMemberApi } from '../api/homeAPI';
import { useNavigation } from '@react-navigation/native';



const DisplayUserAddComponent = (props) => {
    const addMember = props.addMember
    const item = props.user;
    const [imageUrl, setImageUrl] = useState()
    const member = {
        userName: item.name,
        userId: item.userId,
        status: 0,
        roleHome: 0,
        imageUser: item.image
    }

    useEffect(() => {
        setImageUrl(`${routes.URL_IMAGE_USER}${item.image}`)
    })

    const add = () => {
        addMember(member)
    }

    return (
        <View className="flex flex-row items-center justify-between px-3 mt-5">
            <View className="flex-row items-center">
                <Image
                    className="w-12 h-12 rounded-3xl mr-3"
                    source={item.image ? { uri: imageUrl } : placeholder}
                />
                <View>
                    <Text>
                        {item.name}
                    </Text>
                    <Text>{item.userId}</Text>
                </View>
            </View>
            {item.role == 0 && (
                <View className="">
                    <TouchableOpacity onPress={add}>
                        <AddCircle size="32" color="#676767"/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default DisplayUserAddComponent
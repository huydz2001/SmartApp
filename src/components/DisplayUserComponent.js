import { View, Text, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Add, Logout, TickCircle, Trash } from 'iconsax-react-native';
import routes from '../constants/routes';
import { useSelector } from 'react-redux';

const DisplayUserComponent = (props) => {
    const item = props.user;
    const homeId = props.homeId;
    const [added, setAdded] = useState(false);
    const [status, setStatus] = useState(item.status)
    const [roleHome, serRoleHome] = useState(item.roleHome)
    const user = useSelector((state) => state.userInfor.user);

    const Delete = (userId) => {
    }

    const Confirm = (userId) => {
        setStatus(2)
    }

    const NotConfirm = (userId) => {
    }

    return (
        <View className="flex flex-row items-center justify-between px-3 mt-5">
            <View className="flex-row items-center">
                <Image
                    className="w-12 h-12 rounded-3xl mr-2"
                    source={{ uri: `${routes.URL_IMAGE_USER}${item.imageUser}` }}
                />
                <View>
                    <Text>
                        {item.userName}
                    </Text>
                    <Text>{item.userId}</Text>
                </View>
            </View>
            <View className="">
                {
                    status == 0 && (
                        <View className="p-2 bg-red-50 flex items-center rounded-xl">
                            <Text disabled className="font-semibold">Cho xac nhan</Text>
                        </View>
                    )
                }
                {
                    status == 1 && (
                        <View className="flex flex-row items-center">
                            <TouchableOpacity
                                className=" mr-4"
                                onPress={() => { NotConfirm(item.userId) }}
                            >
                                <Trash size={32} color='#676767' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className=""
                                onPress={() => { Confirm(item.userId) }}
                            >
                                <TickCircle size="32" color="#FF8A65" />
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    status == 2 && roleHome != 99 && user.role == 3 && (
                        <TouchableOpacity
                            className=""
                            onPress={() => { Delete(item.userId) }}
                        >
                            <Trash size={32} color='#676767' />
                        </TouchableOpacity>
                    )
                }
                {
                    status == 2 && roleHome != 99 && item.userId == user.id && (
                        <TouchableOpacity
                            className=""
                            onPress={() => { Delete(item.userId) }}
                        >
                            <Logout size={32} color='#676767' />
                        </TouchableOpacity>
                    )
                }
                {
                    roleHome == 99 && (
                        <View className="p-2 bg-red-50 flex items-center rounded-xl">
                            <Text disabled className="font-semibold">Admin</Text>
                        </View>
                    )
                }

            </View>
        </View>
    )
}

export default DisplayUserComponent
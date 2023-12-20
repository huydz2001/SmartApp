import { View, Text, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Add, TickCircle } from 'iconsax-react-native';

const DisplayUserComponent = (props) => {
    const item = props.user;
    const { addUser } = props;
    const [added, setAdded] = useState(false);

    AddToListTempMember = (userId) => {
        addUser(userId);
        setAdded(true);
    }

    return (
        <View className="flex flex-row items-center justify-between">
            <View className="flex-row mt-5 items-center">
                <Image
                    className="w-12 h-12 rounded-3xl mr-2"
                    source={{ uri: item.picture.thumbnail }}
                />
                <View>
                    <Text>
                        {item.name.first} {item.name.last}
                    </Text>
                    <Text>{item.id.value}</Text>
                </View>
            </View>
            <View className="mt-2">

                <TouchableOpacity
                    className="p-1 border-slate-300 rounded-full border"
                    onPress={() => { AddToListTempMember(item.id.value) }}
                >
                    <Add size={25} color='#676767' />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default DisplayUserComponent
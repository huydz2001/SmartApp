import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Notification } from "iconsax-react-native";
import filter from "lodash.filter";
import routes from "../constants/routes";

const API_ENDPOINT = `https://randomuser.me/api/?results=20`;
const NotjoinComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);

    const navigation = useNavigation();

    const JoinHome = (item) => {
        console.log(item.id.value);
        let homeId = item.id.value;
        navigation.navigate(routes.JOINHOME, { homeId: homeId });
    };

    useEffect(() => {
        fetechData(API_ENDPOINT);
    }, []);

    // call api get data
    const fetechData = async (url) => {
        try {
            const reponse = await fetch(url);
            const json = await reponse.json();
            setData(json.results);
            setFullData(json.results);
        } catch (error) {
            console.log(error);
        }
    };

    // handle input search
    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filterData = filter(fullData, (user) => {
            return contains(user.name.first, formattedQuery);
        });
        setData(filterData);
    };

    // check query to search
    const contains = (name, query) => {
        if (name.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    };
    return (
        <View>
            <View className="mt-5">
                <Text className="text-l text-gray-700 font-bold py-2 mt-3 ">
                    Join your family
                </Text>
                <TextInput
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="p-3 rounded-lg mt-3 w-full"
                    style={{ borderColor: "#ccc", borderWidth: 1 }}
                    placeholder="Search your home"
                    value={searchQuery}
                    onChangeText={(query) => handleSearch(query)}
                />

                {searchQuery != "" && (
                    <View className="max-h-80">
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.login.username}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="flex"
                                    onPress={() => JoinHome(item)}
                                >
                                    <View className="flex-row mt-5">
                                        <Image
                                            className="w-12 h-12 rounded-3xl mr-2"
                                            source={{ uri: item.picture.thumbnail }}
                                        />
                                        <View>
                                            <Text>
                                                {item.name.first} {item.name.last}
                                            </Text>
                                            <Text>{item.email}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
            <View className="mt-5">
                <Text className="text-l text-gray-700 font-bold text-center py-2 mt-3 mb-2">
                    Or
                </Text>

                <TouchableOpacity
                    className="py-3 bg-yellow-400 rounded-2xl"
                    onPress={() => navigation.navigate(routes.CREATEHOME)}
                >
                    <Text className="font-xl font-bold text-center text-gray-700">
                        Create your home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NotjoinComponent
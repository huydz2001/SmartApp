import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../data/redux/actions/homeActions";
import routes from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Key } from "iconsax-react-native";



const JoindedComponent = ({home}) => {
  const navigation = useNavigation();

  console.log(home.members)
  const homeDetails = () => {
    navigation.navigate(routes.HOMEDETAILS, { home: home })
  }

  const member = (id) => {
    return (
      <View>
        <Text>{id}</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View className="flex bg-white">
          <TouchableOpacity onPress={homeDetails}>
            <View className="h-48 rounded-2xl bg-red-100 px-5  py-3">
              <Text className="text-xl font-semibold ">{home.name}</Text>
              <Text className="text-md">{home?.slogan}</Text>
              <View className="h-10 mt-5 flex flex-row items-center">
                {home.members.map((item, index) =>
                  index < 3 && (
                    <Image
                      key={index}
                      className="h-10 w-10 rounded-full ml[-2px]"
                      source={{ uri: `${routes.URL_IMAGE_USER}${item.imageUser}` }}
                      style={{ marginLeft: index > 0 ? -10 : 0 }}
                    />
                  )
                )}

                {home?.members.length > 3 && (
                  <View className="h-10 w-10 rounded-full flex items-center justify-center bg-red-300 ml-[-10]">
                    <Text>+{home?.members?.length - 3}</Text>
                  </View>
                )}

                <Text className="float-right ml-auto">All members: {home?.members?.length} </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default JoindedComponent
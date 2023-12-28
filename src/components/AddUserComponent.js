import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import filter from "lodash.filter";
import { SafeAreaView } from 'react-native-safe-area-context'
import DisplayUserComponent from "./DisplayUserComponent";
import DisplayUserAddComponent from "./DisplayUserAddComponent";
import { getUsers } from "../api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { addMemberStore } from "../data/redux/actions/homeActions";

const AddUserComponent = (props) => {
  const {homeId,closeBottomSheet} = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    fetechData();
  }, []);

  const addMember = async (member) => {
    dispatch(addMemberStore(homeId, member))
    closeBottomSheet()
  }

  // call api get data
  const fetechData = async () => {
    try {
      await getUsers().then((result => {
        setData(result.data);
        setFullData(result.data);
      }))

    } catch (error) {
      console.log(error);
    }
  };

  // handle input search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filterData = filter(fullData, (user) => {
      return contains(user.contact.phone, query);
    });
    setData(filterData);
  };

  // check query to search
  const contains = (phone, query) => {
    if(phone.includes(query)) {
      return true;
    }

    return false;
  };

  return (
    <View className="m-0 w-full h-full absolute flex pt-6 px-6">
      <Text className="font-semibold text-xl mt-2">New member</Text>
      <View className="mt-2">
        <TextInput
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          className="p-3 rounded-lg mt-3 w-full"
          style={{ borderColor: "#ccc", borderWidth: 1 }}
          placeholder="Search by phone"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />

        {searchQuery != "" && (
          <View className="mt-3 max-h-[350px] h-[350px]">
            <FlatList
              className="max-h-[350px]"
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item,index) => item.userId}
              renderItem={({ item }) => (
                <View>
                  <DisplayUserAddComponent homeId={homeId} user={item} addMember={addMember}/>
                </View>
              )}
            />
          </View>
        )}
      </View>

    </View>
  )
}

export default AddUserComponent
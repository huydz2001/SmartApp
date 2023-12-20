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

const AddUserComponent = (props) => {
  const {addUserToList} = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const API_ENDPOINT = `https://randomuser.me/api/?results=20`;

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


  const addUser = (userId) =>{
    addUserToList(userId);
  }


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
          placeholder="Search your home"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />

        {searchQuery != "" && (
          <View className="mt-3 max-h-100">
            <FlatList
              className="max-h-40"
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => item.login.username}
              renderItem={({ item }) => (
                <View>
                  <DisplayUserComponent user={item} addUser={addUser} />
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
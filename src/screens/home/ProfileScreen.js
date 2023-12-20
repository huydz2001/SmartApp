import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { Camera, Profile, Mobile, Message2, Calendar, CalendarEdit, ArrowLeft2, Edit2 } from 'iconsax-react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { decode } from "base-64";
global.atob = decode;
const imgDir = FileSystem.documentDirectory + 'images/';
import routes from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../../assets/images/avatar.jpg"
import { updateImage } from '../../data/redux/actions/userActions';
import { fetchUsers } from '../../data/redux/actions/userActions';
import DateTimePicker from '@react-native-community/datetimepicker';


export default ProfileScreen = () => {

  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const user = useSelector((state) => state.userInfor.user)
  const [imageUrl, setImageUrl] = useState();
  const [canEdit, setCanEdit] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user)
    dispatch(fetchUsers());
    setImageUrl(`${routes.URL}${user.image}`)
  }, [user.image])

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate)
    }
    else {
      toggleDatePicker();
    }
  }

  const goBack = () => {
    FileSystem.deleteAsync(imgDir);
    setImages([])
    navigation.goBack()
  }

  const saveInfor = async () => {

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
      // saveImage(result.assets[0].uri);
      dispatch(updateImage(result.assets[0].uri))
    }
  };

  const Edit = () => {
    setCanEdit(!canEdit)
  }


  const confirmDate = () => {
    setDate(date)
    toggleDatePicker()
  }


  return (
    <GestureHandlerRootView className="w-full h-full m-0 flex-1 bg-white">
      <SafeAreaView className="flex">

        <View className="container px-8 items-center">
          <View className="flex-row items-center mb-5 mt-2 w-full">
            <View className="mr-auto">
              <TouchableOpacity
                className="bg-yellow-400 p-2 rounded-full"
                onPress={goBack}
              >
                <ArrowLeft2 size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View className=" mr-auto ml-[-28px]">
              <Text className="text-xl font-semibold">Your Profile</Text>
            </View>
          </View>

          <View className="mt-2 items-center w-32 h-32">
            <TouchableOpacity className="w-full h-full relative " onPress={selectImage}>
              <Image
                style={styles.image}
                source={!imageUrl ? placeholder : { uri: imageUrl }}
              />

              <TouchableOpacity TouchableOpacity className="absolute p-1 bottom-2 right-0 border-1 bg-red-200 rounded-full"
                onPress={selectImage}>
                <Camera size="28" color="#FF8A65"
                />
              </TouchableOpacity>

            </TouchableOpacity>
          </View>


          <KeyboardAvoidingView className="mt-3 w-full h-100" behavior={Platform.OS === "ios" ? "padding" : ""}>
            <ScrollView className="">
              <TouchableOpacity className="flex ml-auto mb-5" onPress={Edit}>
                <Edit2 size="28" color='#697689'></Edit2>
              </TouchableOpacity>
              <View style={[styles.action, { backgroundColor: canEdit ? "white" : '#e6e3e3' }]}>
                <Profile size="28" color="#697689" />
                <TextInput
                  value={user.name}
                  placeholder="Name"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  onChangeText={(text) => handleOnchange(text, "phone")}
                  editable={canEdit}
                  style={[
                    styles.textInput
                  ]}
                />
              </View>
              <View style={[styles.action, { backgroundColor: '#e6e3e3' }]}>
                <Mobile size="28" color="#697689" />
                <TextInput
                  value={user.phone}
                  placeholder="Phone Number"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  editable={false}
                  style={[
                    styles.textInput
                  ]}
                />

              </View>


              <View style={[styles.action, { backgroundColor: canEdit ? "white" : '#e6e3e3' }]}>
                <Calendar size="32" color="#697689" />
                {!showPicker && (
                  <Pressable
                    className="w-full flex"
                    onPress={toggleDatePicker}
                  >
                    <TextInput
                      placeholder="Birth Day"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={date.toLocaleDateString()}
                      style={[
                        { width: "200" },
                        styles.textInput
                      ]}
                      editable={false}
                      onPressIn={toggleDatePicker}
                    />
                  </Pressable>
                )}

                {showPicker && (
                  <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    // editable={canEdit}
                    style={styles.datePicker}
                    onChange={onChange}
                  />
                )}

              </View>
              {showPicker && Platform.OS === "ios" &&
                (
                  <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
                    <TouchableOpacity
                      style={[
                        styles.pickerButton,
                        styles.button,
                        { backgroundColor: "#11182711" },
                      ]}
                      onPress={toggleDatePicker}
                    >
                      <Text style={{ color: "#075985" }}>Cancle</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.pickerButton,
                        styles.button,
                        { backgroundColor: "#075985" },
                      ]}
                      onPress={confirmDate}
                    >
                      <Text style={{ color: "#ffffff" }}>Save</Text>

                    </TouchableOpacity>
                  </View>
                )}

              <TouchableOpacity style={styles.commandButton} onPress={() => saveInfor()}>
                <Text style={styles.panelButtonTitle}>Save</Text>
              </TouchableOpacity>
            </ScrollView>

          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView >
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 9999, // Giá trị lớn để tạo hình dạng tròn
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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  datePicker: {
    width: "100%",
    marginTop: -10,
    height: 150,
    marginLeft: -10

  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0dede',
    padding: 10,
    borderRadius: 7
  },

  textInput: {
    width: "100%",
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
  }
});
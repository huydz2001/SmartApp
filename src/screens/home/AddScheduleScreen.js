import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowDown2, ArrowLeft2, ArrowUp2, Calendar } from 'iconsax-react-native';
import { KeyboardAvoidingView, ScrollView, Pressable, View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const priority = [{
    priorityValue: 0,
    priority: "Normal"
},
{
    priorityValue: 1,
    priority: "Medium"
},
{
    priorityValue: 2,
    priority: "Hight"
}]




const AddNewTask = ({ route }) => {

    const { user } = route.params;
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showTimeEnd, setShowTimeEnd] = useState(false);
    const [showTimeStart, setShowTimeStart] = useState(false);
    const [activePriory, setActivePriority] = useState(0)
    const [selectedTimeStart, setSelectedTimeStart] = useState(date);
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(date);


    const getTimeFromDateTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const initData = {
        taskId: "string",
        taskType: 0,
        taskName: "",
        startDate: date,
        startTime: getTimeFromDateTime(date),
        endTime: getTimeFromDateTime(date),
        priority: 0,
        status: 0,
        owner: "",
        description: "",
        createDate: date,
        createBy: user.id,
        updateBy: null,
        updateDate: null
    }

    const [task, setTask] = useState(initData)

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const toggleTimeEnd = () => {
        setShowTimeEnd(!showTimeEnd)
    }

    const toggleTimeStart = () => {
        setShowTimeStart(!showTimeStart)
    }


    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            setDate(selectedDate)
        }
        else {
            toggleDatePicker();
        }
    }

    const setPropirity = (item) => {
        setActivePriority(item.priorityValue)
        handleChangeValue("priority", item.priorityValue)
    }

    const handleChangeValue = (id, value) => {
        const updatedTask = {
            ...task,
            [id]: value
        };
        setTask(updatedTask);
    };

    const saveTask = async () => {
        if(task.startTime === task.endTime){
            handleChangeValue("taskType", 0 )
        }
        else handleChangeValue("taskType", 1)
        console.log(task);
    };

    const confirmDate = () => {
        setDate(date)
        handleChangeValue("startDate", date)
        toggleDatePicker()
    }

    

    const goBack = () => {
        navigation.goBack()
    }



    const onChangeTimeStart = (event, selected) => {
        if (event.type === 'set') {
            setSelectedTimeStart(selected);
        }
        const timeStart = getTimeFromDateTime(selected)
        handleChangeValue("startTime", timeStart)
    };
    const onChangeTimeEnd = (event, selected) => {
        if (event.type === 'set') {
            setSelectedTimeEnd(selected);
        }
        const timeEnd = getTimeFromDateTime(selected)
        handleChangeValue("endTime", timeEnd)
    };

    return (
        <GestureHandlerRootView className="w-full h-full m-0 flex-1 bg-white">
            <SafeAreaView className="flex">
                <View className="container px-8 items-center">
                    <View className="flex-row items-center mb-5 mt-2 w-full">
                        <View className="mr-auto">
                            <TouchableOpacity
                                onPress={goBack}
                            >
                                <ArrowLeft2 size={28} color="#777777" />
                            </TouchableOpacity>
                        </View>
                        <View className=" mr-auto ml-[-28px]">
                            <Text className="text-lg font-semibold">Create New Task</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView className="mt-3 w-full h-100" behavior={Platform.OS === "ios" ? "padding" : ""}>
                        <ScrollView className="">
                            <Text className="font-semibold text-md">Task Name</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="Task Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    editable={true}
                                    onChange={e => handleChangeValue("taskName", e.nativeEvent.text)}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View>

                            <Text className="font-semibold text-md">Description</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="Description"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    multiline={true}
                                    style={[
                                        styles.textInput,
                                        {
                                            alignItems: "flex-start",
                                            minHeight: 50,
                                            maxHeight: 50
                                        }
                                    ]}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    onChange={e => handleChangeValue("description", e.nativeEvent.text)}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>


                            <Text className="font-semibold text-md">Priority</Text>
                            <View className="mt-3">
                                <FlatList
                                    data={priority}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setPropirity(item)}
                                            className="p-2 w-20 rounded-xl flex items-center mr-4"
                                            style={{
                                                opacity: activePriory == item.priorityValue ? 3 : 0.3,
                                                backgroundColor:
                                                    item.priorityValue === 0
                                                        ? "rgb(163 230 53)"
                                                        : item.priorityValue === 1
                                                            ? "rgb(253 224 71)"
                                                            : "rgb(248 113 113)",
                                            }}>
                                            <Text className="font-semibold"
                                                style={{ color: activePriory == item.priorityValue ? "white" : "black" }}
                                            >{item.priority}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.priorityValue}
                                    horizontal
                                />
                            </View>

                            <Text className="font-semibold text-md mt-5">Date & Time</Text>
                            <View style={styles.action}>
                                {!showPicker && (
                                    <View className="flex-1 flex-row justify-between">
                                        <TextInput
                                            placeholder="Birth Day"
                                            placeholderTextColor="#666666"
                                            autoCorrect={false}
                                            value={date.toLocaleDateString()}
                                            style={[
                                                { width: 200 },
                                            ]}
                                            editable={false}
                                            onPressIn={toggleDatePicker}
                                        />

                                        <TouchableOpacity onPress={toggleDatePicker}>
                                            <Calendar size={25} />
                                        </TouchableOpacity>

                                    </View>
                                )}

                                {showPicker && (
                                    <DateTimePicker
                                        mode='date'
                                        display='spinner'
                                        value={date}
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

                            <View className="flex flex-row justify-between">
                                <View className="flex-1">
                                    <Text className="font-semibold text-md">Start Time</Text>
                                    <View style={styles.action}>
                                        <TouchableOpacity onPress={toggleTimeStart} className="flex flex-row justify-between w-full">
                                            <TextInput
                                                className="mr-2"
                                                placeholder={getTimeFromDateTime(selectedTimeStart)}
                                                placeholderTextColor="#666666"
                                                autoCorrect={false}
                                                editable={false}
                                                value={getTimeFromDateTime(selectedTimeStart)}
                                                style={[
                                                    styles.textInput
                                                ]}
                                            />
                                            {showTimeStart ? (<ArrowUp2 />) : (<ArrowDown2 />)}
                                        </TouchableOpacity>
                                    </View>
                                    {showTimeStart && (
                                        <DateTimePicker
                                            mode='time'
                                            display='spinner'
                                            value={selectedTimeStart}
                                            style={styles.datePicker}
                                            maximumDate={selectedTimeEnd}
                                            onChange={onChangeTimeStart}

                                        />
                                    )}
                                </View>
                                <View className="ml-5 flex-1">
                                    <Text className="font-semibold text-md">End Time</Text>
                                    <View style={styles.action}>
                                        <TouchableOpacity onPress={toggleTimeEnd} className="flex w-full flex-row justify-between">
                                            <TextInput
                                                className="mr-2"
                                                placeholder={getTimeFromDateTime(selectedTimeEnd)}
                                                placeholderTextColor="#666666"
                                                autoCorrect={false}
                                                editable={false}
                                                value={getTimeFromDateTime(selectedTimeEnd)}
                                                style={[
                                                    styles.textInput
                                                ]}
                                            />
                                            {showTimeEnd ? (<ArrowUp2 />) : (<ArrowDown2 />)}
                                        </TouchableOpacity>

                                    </View>
                                    {showTimeEnd && (
                                        <DateTimePicker
                                            mode='time'
                                            display='spinner'
                                            value={selectedTimeEnd}
                                            style={styles.datePicker}
                                            minimumDate={selectedTimeStart}
                                            onChange={onChangeTimeEnd}
                                        />
                                    )}

                                </View>

                            </View>


                            <Text className="font-semibold text-md">Members</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="Task Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    editable={true}
                                    onChange={e => handleChangeValue("taskName", e.nativeEvent.text)}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View>


                            <TouchableOpacity className=" p-3 bg-red-300 w-full flex justify-center items-center rounded-2xl mt-3 " onPress={saveTask}>
                                <Text className="text-white font-semibold">Save</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
};

const styles = StyleSheet.create({
    datePicker: {
        marginTop: -10,
        height: 150,
        marginLeft: -10

    },
    textInput: {
        width: "100%",
        flex: 1,
        paddingLeft: 5,
        color: '#05375a',
    },
    action: {
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0dede',
        padding: 13,
        borderRadius: 10
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    button: {
        padding: 10,
        borderRadius: 10,
    }
})

export default AddNewTask;
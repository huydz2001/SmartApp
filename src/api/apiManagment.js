import axios from "axios";
import { interceptors } from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import routes from "../constants/routes";




const ApiManagment = axios.create({
    baseURL: `${routes.URL}/api`,
    responseEncoding: 'json',
    withCredentials: true,
})

ApiManagment.interceptors.request.use(
    async function (config) {
        const accessToken = await AsyncStorage.getItem("AccessToken")
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    function (error) {
        // Handle request error here
        return Promise.reject(error);
    }
);

ApiManagment.interceptors.response.use(
    function (response) {
        // Return the response if it is successful

        return response;
    },
    async function (error) {
        // Handle response error here
        if (error.response.status === 401) {
            const accesTokenOld = await AsyncStorage.getItem("AccessToken")
            const refreshTokenOld = await AsyncStorage.getItem("RefreshToken")

            const newData = { accessToken: accesTokenOld, refreshToken: refreshTokenOld }

            const result = await ApiManagment.post("User/renewToken", newData, {
                headers: {
                  'Content-Type': "application/json"
                }
            });
            
            AsyncStorage.setItem("AccessToken", result.data.data.accessToken)
            AsyncStorage.setItem("RefreshToken", result.data.data.refreshToken)

            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${result.data.data.accessToken}`;
            return axios(originalRequest);

        }
        return Promise.reject(error);
    }
);


export default ApiManagment;
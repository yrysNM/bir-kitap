import { Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"

export const Home = () => {
    useEffect(() => {
        // AsyncStorage.clear();
        getToken(); 
    }, []);


    async function getToken() {
        const  token = await AsyncStorage.getItem('token'); 
        console.log(token);
    }

    return <Text>Hello WORLD </Text>
}
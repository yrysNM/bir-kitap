import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { WebView } from 'react-native-webview';

const prefix = Linking.createURL("exp://192.168.1.139:16002/");
export default function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Text>

        Hello World
        </Text>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoadingPage from "./src/components/loadingpage";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import PickRemindTime from "./src/components/pickremindtime";
import SignIn from "./src/components/signin";
import SignUp from "./src/components/signup";
import Training from "./src/components/traning";
import Vocabulary from "./src/components/vocabulary";
import { Part01 } from "./src/View/Part01";
import { Part02 } from "./src/View/Part02";
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Part02" component={Part02} />
                <Stack.Screen name="Part01" component={Part01} />
                <Stack.Screen name="Vocabulary" component={Vocabulary} />
                <Stack.Screen name="Training" component={Training} />
                <Stack.Screen name="LoadingPage" component={LoadingPage} />
                <Stack.Screen name="PickRemindTime" component={PickRemindTime} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

import "react-native-gesture-handler";
import LoadingPage from "./src/components/loadingpage";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import PickRemindTime from "./src/components/pickremindtime";
import SignIn from "./src/components/signin";
import SignUp from "./src/components/signup";
import Training from "./src/components/traning";
import Vocabulary from "./src/components/vocabulary";
import { PartItem } from "./src/View/PartItem";
import TrainingPart1 from "./src/components/training_part1";
import { AppRegistry, Pressable } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { View } from "react-native";
import { Text } from "react-native";
import StatisticTraining from "./src/components/statistic_training";
const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}
                    initialRouteName="Training"
                >
                    <Stack.Screen name="Training" component={Training} />
                    <Stack.Screen name="partItem" component={PartItem} />
                    <Stack.Screen name="Vocabulary" component={Vocabulary} />
                    <Stack.Screen name="LoadingPage" component={LoadingPage} />
                    <Stack.Screen name="PickRemindTime" component={PickRemindTime} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="TrainingPart1" component={TrainingPart1}/>
                    <Stack.Screen name="StatisticTraining" component={StatisticTraining}
                        options={{headerShown: true, headerTitle: "Kết quả", }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

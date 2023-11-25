import "react-native-gesture-handler";
import LoadingPage from "./src/components/loadingpage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PickRemindTime from "./src/components/pickremindtime";
import SignIn from "./src/components/signin";
import SignUp from "./src/components/signup";
import Training from "./src/components/traning";
import Vocabulary from "./src/components/vocabulary";
import { PartItem } from "./src/View/PartItem";
import TrainingPart1 from "./src/components/training_part1";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import StatisticTraining from "./src/components/statistic_training";
import TrainingPart2 from "./src/components/training_part2";
import TrainingPart3 from "./src/components/training_part3";
import TrainingPart4 from "./src/components/training_part4";
import TrainingPart5 from "./src/components/training_part5";
import TrainingPart6 from "./src/components/training_part6";
import TrainingPart7 from "./src/components/training_part7";
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
                    <Stack.Screen name="TrainingPart2" component={TrainingPart2}/>
                    <Stack.Screen name="TrainingPart3" component={TrainingPart3}/>
                    <Stack.Screen name="TrainingPart4" component={TrainingPart4}/>
                    <Stack.Screen name="TrainingPart5" component={TrainingPart5}/>
                    <Stack.Screen name="TrainingPart6" component={TrainingPart6}/>
                    <Stack.Screen name="TrainingPart7" component={TrainingPart7}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

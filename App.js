import 'react-native-gesture-handler';
import LoadingPage from './src/components/loadingpage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PickRemindTime from './src/components/pickremindtime';
import SignIn from './src/components/signin';
import SignUp from './src/components/signup';
import Training from './src/components/traning';
import Vocabulary from './src/components/vocabulary';
import { PartItem } from './src/View/PartItem';
import TrainingPart1 from './src/components/training_part1';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import StatisticTraining from './src/components/statistic_training';
import TrainingPart2 from './src/components/training_part2';
import TrainingPart3 from './src/components/training_part3';
import TrainingPart4 from './src/components/training_part4';
import TrainingPart5 from './src/components/training_part5';
import TrainingPart6 from './src/components/training_part6';
import TrainingPart7 from './src/components/training_part7';
import LoadingOverLay from './src/components/loadingoverlay';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TabVocabulary } from './src/View/TabVocabulary/TabVocabulary';
import { Toppic } from './src/View/Toppic/Toppic';
import { WordDetail } from './src/View/WordDetail/WordDetail';
import { HeaderWord } from './src/components/HeaderWord/HeaderWord';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator initialRouteName='Training' screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Training'
                component={Training}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, sizem, focused }) => (
                        <Entypo name='home' size={24} color={focused ? '#1DB954' : '#666'} />
                    ),
                    tabBarLabel: navigation.isFocused() ? 'Trang chủ' : '',
                    tabBarActiveTintColor: '#1DB954',
                    tabBarInactiveTintColor: '#666',
                })}
            />
            <Tab.Screen
                name='Vocabulary'
                component={TabVocabulary}
                options={({ navigation }) => ({
                    headerShown: true,
                    tabBarIcon: ({ color, sizem, focused }) => (
                        <MaterialIcons
                            name='translate'
                            size={24}
                            color={focused ? '#1DB954' : '#666'}
                        />
                    ),
                    tabBarLabel: navigation.isFocused() ? 'Từ vựng' : '',
                    tabBarActiveTintColor: '#1DB954',
                    tabBarInactiveTintColor: '#666',
                })}
            />
        </Tab.Navigator>
    );
}

// function TraningStack(){
//     return (
//         <Stack.Navigator initialRouteName="Training" screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="Training" component={Training}/>
//                 <Stack.Screen name="partItem" component={PartItem} />
//                 <Stack.Screen name="TrainingPart1" component={TrainingPart1}/>
//                 <Stack.Screen name="TrainingPart2" component={TrainingPart2}/>
//                 <Stack.Screen name="TrainingPart3" component={TrainingPart3}/>
//                 <Stack.Screen name="TrainingPart4" component={TrainingPart4}/>
//                 <Stack.Screen name="TrainingPart5" component={TrainingPart5}/>
//                 <Stack.Screen name="TrainingPart6" component={TrainingPart6}/>
//                 <Stack.Screen name="TrainingPart7" component={TrainingPart7}/>
//                 <Stack.Screen name="StatisticTraining" component={StatisticTraining}
//                     options={{headerShown: true, headerTitle: "Kết quả", }}
//                 />
//         </Stack.Navigator>
//     )
// }

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeTabs'>
                    <Stack.Screen name='LoadingPage' component={LoadingPage} />
                    <Stack.Screen name='PickRemindTime' component={PickRemindTime} />
                    <Stack.Screen name='SignIn' component={SignIn} />
                    <Stack.Screen name='SignUp' component={SignUp} />
                    <Stack.Screen name='HomeTabs' component={HomeTabs} />

                    <Stack.Screen name='Training' component={Training} />
                    <Stack.Screen name='partItem' component={PartItem} />
                    <Stack.Screen name='TrainingPart1' component={TrainingPart1} />
                    <Stack.Screen name='TrainingPart2' component={TrainingPart2} />
                    <Stack.Screen name='TrainingPart3' component={TrainingPart3} />
                    <Stack.Screen name='TrainingPart4' component={TrainingPart4} />
                    <Stack.Screen name='TrainingPart5' component={TrainingPart5} />
                    <Stack.Screen name='TrainingPart6' component={TrainingPart6} />
                    <Stack.Screen name='TrainingPart7' component={TrainingPart7} />
                    <Stack.Screen
                        name='StatisticTraining'
                        component={StatisticTraining}
                        options={{ headerShown: true, headerTitle: 'Kết quả' }}
                    />
                    <Stack.Screen
                        name='Toppic'
                        component={Toppic}
                        options={{
                            headerShown: true,
                            header: () => <HeaderWord />,
                        }}
                    />
                    <Stack.Screen
                        name='WordDetail'
                        component={WordDetail}
                        options={{
                            headerShown: true,
                            header: () => (
                                <HeaderWord
                                    url={useSelector(
                                        (state) =>
                                            state.vocabulary.toppicSelect.uri ||
                                            'https://hrchannels.com/uptalent/attachments/images/20230417/112610454_TOEIC-la-gi-1.jpg'
                                    )}
                                />
                            ),
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

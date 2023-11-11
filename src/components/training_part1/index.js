import { View, Text, StatusBar, SafeAreaView, ScrollView, Pressable, Image, Animated, LayoutAnimation, Modal, Alert } from 'react-native'
import styles from './styles'
import { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AudioCustom from '../audio_speaker';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Question from '../question';
import { useSelector } from 'react-redux';
import ResultModal from '../result_modal';
import { dataViewPart01 } from '../../data/dataViewPart1';



export default function TrainingPart1({navigation, route}) {
    const {name, elementIndex, header} = route.params;
    const [data, setData] = useState(null);
    const questions = useSelector(state => state.part1Training.questions)
    const [questionOneSelected, setQuestionOneSelected] = useState(false)
    const [isPause, setIsPause] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        if (elementIndex != null && elementIndex >= 0 && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
    }, [elementIndex])

    function handleNextQuestion(){
        setIsPause(true);
        if (elementIndex == questions.length-1){
            
            Alert.alert("Bạn có muốn nộp bài?", "Bạn đang ở câu hỏi cuối cùng.",
                [
                    {
                        text: "Hủy",
                        style: "cancel",
                        onPress: ()=> console.log("Cancel")
                    },
                    {
                        text: "OK",
                        onPress: ()=>{
                            navigation.navigate("StatisticTraining", {
                                results: questions,
                            })
                        }
                    }
                ]
            )
        } else {
            navigation.push("TrainingPart1",{
                name: name,
                header: header,
                elementIndex: questions.length > elementIndex+1 ? elementIndex+1 : null,
                
            })
        }
    }
    function handlePreviousQuestion(){
        setIsPause(true);
        if (elementIndex == 0){
            return;
        }
        navigation.push("TrainingPart1",{
            name: name,
            header: header,
            elementIndex: elementIndex-1 >= 0 ? elementIndex-1 : null,
            
        })
    }

    return (
        <View style={{flex: 1, position: "relative"}}>   

            <StatusBar/>
            {
                data
                ?
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                    >
                        
                        <View style={{backgroundColor: "#fff"}}>
                                        <View style={{ flexDirection: "row",alignItems: "center", paddingVertical: 10}}>
                                            <Pressable style={{width: "20%"}}
                                               onPress={()=>{
                                                    setIsPause(true)
                                                    navigation.navigate("partItem", {
                                                        name: "Part 1",
                                                        title: "Mô tả hình ảnh",
                                                        data: dataViewPart01
                                                    })
                                               }}
                                            >
                                                <Ionicons name="arrow-back" size={24} color="black" 
                                                    style={{paddingHorizontal: 20}}
                                                />
                                            </Pressable>
                                            <View style={{flexGrow: 1}}>
                                                <Text style={{fontSize: 17, fontWeight: "500"}}>{header}</Text>
                                                <Text style={{color: "#20BB55"}}>Câu hỏi {elementIndex+1} / {elementIndex+1}-{questions.length}</Text>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                <Pressable
                                                    style={{marginRight: 15}}
                                                >
                                                    
                                                    <MaterialIcons name="settings" size={24} color="black" />
                                                </Pressable>
                                                <Pressable style={{marginRight: 15}}
                                                    onPress={()=>setShowModal(true)}
                                                >
                                                    <FontAwesome5 name="list-ol" size={24} color="black" />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                        <View style={{paddingHorizontal: 15, marginBottom: 150}}>
                            <View style={{padding: 10, borderRadius: 15, backgroundColor: "#fff", marginTop: 15}}>
                                <Image
                                    source={{uri: data.urlImg}}
                                    style={{width: "100%", height: 250}}
                                />
                            </View>
                            <Question partName="part1" questions={data} elementIndex={elementIndex} 
                                questionIsSelected={questionOneSelected}
                                setQuestionSelected={setQuestionOneSelected}
                                numberQuestion={elementIndex+1}
                            />
                        </View>
                    
                    </ScrollView>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#fff", padding: 10,shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                            <AudioCustom
                                uri={data.urlAudio}
                                isPause={isPause}
                                setIsPause={setIsPause}
                            />
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: 10, marginTop: 20}}>
                                <Pressable
                                    style={{padding: 15}}
                                    onPress={handlePreviousQuestion}
                                >
                                    <Fontisto name="angle-left" size={20} color="black" />
                                </Pressable>
                                <Pressable
                                    style={{padding: 15}}
                                >
                                    <Feather name="heart" size={20} color="black" />
                                </Pressable>
                                <Pressable
                                     style={{padding: 15}}
                                    onPress={()=> setQuestionOneSelected(true)}
                                >
                                    <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color = {questionOneSelected ? "#1DB954" : "black"} />
                                </Pressable>
                                <Pressable
                                     style={{padding: 15}}
                                >
                                    <Feather name="alert-triangle" size={20} color="black" />
                                </Pressable>
                                <Pressable
                                    style={{padding: 15}}
                                    onPress={handleNextQuestion}
                                >
                                    <Fontisto name="angle-right" size={20} color="black" />
                                </Pressable>
                            </View>
                    </View>
                    <ResultModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        questions={questions}
                        navigation={navigation}
                    />
                </SafeAreaView>
                :
                <View>
                </View>
            }
            
        </View>
    )
}
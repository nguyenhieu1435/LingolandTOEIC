import { View, Text, StatusBar, SafeAreaView, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ResultModal from '../result_modal';
import AudioCustom from '../audio_speaker';
import Question from '../question';
import QuestionControl from '../question_control';


export default function TrainingPart2({navigation, route}) {
    const {name, elementIndex, header} = route.params;
    const [isPause, setIsPause] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const questions = useSelector(state => state.part2Training.questions)
    const [data, setData] = useState(null);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    

    useEffect(()=>{
        if (elementIndex != null && elementIndex >= 0 && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
    }, [elementIndex]);

    const handlePreviousQuestion = ()=>{
        setIsPause(true);
        if (elementIndex == 0){
            return;
        } else {
            navigation.push("TrainingPart2",{
                name: name,
                header: header,
                elementIndex: elementIndex-1
            })
        }
    }
    const handleNextQuestion = ()=>{
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
            navigation.push("TrainingPart2",{
                name: name,
                header: header,
                elementIndex: questions.length > elementIndex+1 ? elementIndex+1 : null,
            })
        }
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar/>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView
                    style={{flex: 1}}
                    stickyHeaderIndices={[0]}
                >
                    <View style={{backgroundColor: "#fff"}}>
                                            <View style={{ flexDirection: "row",alignItems: "center", paddingVertical: 10}}>
                                                <Pressable style={{width: "20%"}}
                                                onPress={()=>{
                                                        setIsPause(true)
                                                        
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
                        <Question partName="part2" questions={data} elementIndex={elementIndex} 
                            questionIsSelected={questionOneSelected}
                            setQuestionSelected={setQuestionOneSelected}
                            numberQuestion={7 + elementIndex}
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
                    {
                        data &&
                        <AudioCustom
                            uri={data.urlAudio}
                            isPause={isPause}
                            setIsPause={setIsPause}
                        />    
                    }
                    <QuestionControl
                        handlePreviousQuestion={handlePreviousQuestion}
                        handleNextQuestion={handleNextQuestion}
                        setAllQuestionSelected={setQuestionOneSelected}
                        allQuestionSelected={questionOneSelected}
                    />
                </View>


                <ResultModal
                        setIsPauseAudio={setIsPause}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        questions={questions}
                        navigation={navigation}
                />
            </SafeAreaView>
        </View>
    )
}
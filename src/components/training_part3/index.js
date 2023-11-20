import { View, Text, SafeAreaView, ScrollView, Pressable, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Question from '../question';
import AudioCustom from '../audio_speaker';
import QuestionControl from '../question_control';
import ResultModal from '../result_modal';


export default function TrainingPart3({navigation, route}) {
    const {name, elementIndex, header} = route.params;
    const [isPause, setIsPause] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const question = useSelector(state => state.part3Training.questions);
    const [data, setData] = useState(null);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [questionTwoSelected, setQuesitonTwoSelected] = useState(false);
    const [questionThreeSelected, setQuestionThreeSelected] = useState(false);

    const [allQuestionSelected, setAllQuestionSelected] = useState(false);

    useEffect(()=>{
        if (elementIndex != null && elementIndex >= 0 && elementIndex < question.length){
            setData(question[elementIndex]);
        }

    }, [elementIndex])

    useEffect(()=>{
        if (questionOneSelected && questionTwoSelected && questionThreeSelected){
            setAllQuestionSelected(true);
        } else {
            setAllQuestionSelected(false);
        }
    }, [questionOneSelected, questionTwoSelected, questionThreeSelected])

    function getQuestionForPart3(){
        let questions = [];
        for (let i = 0; i < question.length; i++){
            questions = [...questions, ...question[i].questionList];
        }
        return questions;
    }

    function setAllQuestionIsSelected(){
        setQuestionOneSelected(true);
        setQuesitonTwoSelected(true);
        setQuestionThreeSelected(true);
    }
    function handlePreviousQuestion(){
        setIsPause(true);
        if (elementIndex == 0){
            return;
        } else {
            navigation.push("TrainingPart3",{
                name: name,
                header: header,
                elementIndex: elementIndex-1
            })
        }
    }
    function handleNextQuestion(){
        setIsPause(true);
        if (elementIndex == question.length-1){
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

                            results: getQuestionForPart3(),
                        })
                    }
                }
            ]
        )
        } else {
            navigation.push("TrainingPart3",{
                name: name,
                header: header,
                elementIndex: elementIndex+1
            })
        }
    }

    return (
        data
        ?
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
                                        <Text style={{color: "#20BB55"}}>Câu hỏi {elementIndex+32} -  {elementIndex+32+2} / {32} - {32 + (question.length * 3)}</Text>
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
                        <Question partName="part3" questions={data?.questionList[0]} elementIndex={elementIndex} 
                            indexOfQuestionDiferPart12={0}
                            questionIsSelected={questionOneSelected}
                            setQuestionSelected={setQuestionOneSelected}
                            numberQuestion={32 + elementIndex}
                        />
                        <Question partName="part3" questions={data?.questionList[1]} elementIndex={elementIndex} 
                            indexOfQuestionDiferPart12={1}
                            questionIsSelected={questionTwoSelected}
                            setQuestionSelected={setQuesitonTwoSelected}
                            numberQuestion={33 + elementIndex}
                        />
                        <Question partName="part3" questions={data?.questionList[2]} elementIndex={elementIndex} 
                            indexOfQuestionDiferPart12={2}
                            questionIsSelected={questionThreeSelected}
                            setQuestionSelected={setQuestionThreeSelected}
                            numberQuestion={34 + elementIndex}
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
                        setAllQuestionSelected={setAllQuestionIsSelected}
                        allQuestionSelected={allQuestionSelected}
                    />
                </View>
                <ResultModal
                    setIsPauseAudio={setIsPause}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    questions={getQuestionForPart3()}
                    navigation={navigation}
                />
            </SafeAreaView>
        </View>
        : 
        <View></View>
    )
}
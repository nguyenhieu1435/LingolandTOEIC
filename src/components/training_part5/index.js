import { View, Text, StatusBar, ScrollView, Pressable, Animated, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../radio_button';
import getAnswerCharacterByIndex from '../../utils/getAnswerCharacterByIndex';
import { setAnswerByIndexPart5, setSelectedForIndexPart5 } from '../../redux/slices/part5Training';
import QuestionControl from '../question_control';
import ResultModal from '../result_modal';
import { dataViewPart05 } from '../../data/dataViewPart5';

export default function TrainingPart5({navigation, route}) {
    const {name, elementIndex, header} = route.params;
    const questions = useSelector(state => state.part5Training.questions);
    const [data, setData] = useState(null);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [showContent, setShowContent] = useState(true);
    const [userAnswer, setUserAnswer] = useState(null);


    useEffect(()=>{
        setQuestionOneSelected(false);
        setUserAnswer(null);
        if (elementIndex != null && elementIndex >= 0 && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
        if(questions[elementIndex].yourAnswer && elementIndex >= 0 && elementIndex < questions.length){
            setUserAnswer(questions[elementIndex].yourAnswer);
        }
        if (questions[elementIndex].isSelected){
            setQuestionOneSelected(true);
        }
    }, [elementIndex])



    function handleToggleContent(){
        setShowContent(!showContent);
    }
    
    useEffect(()=>{
        if (userAnswer){
            setQuestionOneSelected(true);
            dispatch(setAnswerByIndexPart5({
                index: elementIndex,
                userAnswer: userAnswer
            }))
        }
    }, [userAnswer])    

    function handlePreviousQuestion(){
        if (elementIndex == 0){
            return;
        } else {
            navigation.navigate("TrainingPart5",{
                name: name,
                header: header,
                elementIndex: elementIndex-1
            })
        }
    }
    function handleNextQuestion(){
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
            ])
        } else {
            navigation.navigate("TrainingPart5",{
                name: name,
                header: header,
                elementIndex: elementIndex+1
            })
        }
    }
    function handleSetQuestionSelected(){
        setQuestionOneSelected(true);
        dispatch(setSelectedForIndexPart5({index: elementIndex}))
    }

    return (
        data
        ?
        <View style={{flex: 1}}>
            <StatusBar/>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView
                    stickyHeaderIndices={[0]}
                    style={{flex: 1}}
                >
                    <View style={{backgroundColor: "#fff"}}>
                        <View style={{ flexDirection: "row",alignItems: "center", paddingVertical: 10}}>
                                            <Pressable style={{width: "20%"}}
                                                onPress={()=>{
                                                    navigation.navigate("partItem", {
                                                        name: "Part 5",
                                                        title: "Hoàn thành câu",
                                                        data: dataViewPart05
                                                    })
                                                }}
                                            >
                                                    <Ionicons name="arrow-back" size={24} color="black" 
                                                        style={{paddingHorizontal: 20}}
                                                    />
                                            </Pressable>
                                            <View style={{flexGrow: 1}}>
                                                    <Text style={{fontSize: 17, fontWeight: "500"}}>{header}</Text>
                                                    <Text style={{color: "#20BB55"}}>Câu hỏi {elementIndex+100} / {elementIndex+100}-{questions.length + 100}</Text>
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
                    <View style={{padding: 10, marginBottom: 100}}>
                        <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden', backgroundColor: "#fff", shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41, elevation: 2}}
                        >
                            <View style={{minHeight: 50, width: "100%", backgroundColor: "#2196F3", paddingVertical: 8
                            , flexDirection: "row", alignItems: 'center', justifyContent: "space-between"
                            , paddingHorizontal: 10, }}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 16, fontWeight: "600", color: "#fff"}}>{100 + elementIndex} 
                                        {(data?.questionNameEN) ? `. ${data.questionNameEN}` : ""}
                                    </Text>
                                </View>
                                <Pressable style={{}}
                                    onPress={handleToggleContent}
                                >
                                    {
                                        showContent ? (
                                            <FontAwesome name="angle-up" size={26} color="white" 
                                                style={{fontWeight: "bold"}}
                                            />
                                        ) : (
                                            <FontAwesome name="angle-down" size={26} color="white" />
                                        )
                                    }
                                
                                </Pressable>
                            </View>
                            {
                                data?.questionNameVN && questionOneSelected && showContent &&
                                <View style={{flexDirection: "row", backgroundColor: "#EAF4FB", paddingVertical: 10}}>
                                    <MaterialIcons name="translate" size={20} color="#2A96DB"
                                        style={{marginHorizontal: 10, paddingVertical: 8}}
                                    />
                                    <Text style={{fontSize: 16, color: "#2A96DB", flexShrink: 1, flexWrap: 'wrap', marginRight: 1}}>
                                        {
                                            data?.questionNameVN?.map((item, index)=>{
                                                return (
                                                    <Text key={index} style={{fontWeight: item?.isAnswer ? 800 : 400}}>
                                                        {item?.isAnswer ? " " +item.content + " " : item.content}
                                                    </Text>
                                                )
                                            })
                                        }
                                    </Text>

                                </View>
                            }
                            {
                                data?.explain && questionOneSelected && showContent &&
                                <View style={{flexDirection: "row", backgroundColor: "#EAF4FB", paddingVertical: 10}}>
                                    <MaterialCommunityIcons name="lightbulb-on-outline" 
                                        size={20} color="#2A96DB"
                                        style={{marginHorizontal: 10, paddingVertical: 8}} 
                                    />
                                  
                                    <Text style={{fontSize: 16, color: "#2A96DB", flexShrink: 1, flexWrap: 'wrap', marginRight: 1, paddingVertical: 8}}>
                                        {
                                           data.explain
                                        }
                                    </Text>

                                </View>
                            }
                        
                            <Animated.View style={{ height: showContent ? null : 0 }}>
                                {
                                    data?.listAnswer.map((item,index)=>{
                                        let character = getAnswerCharacterByIndex(index)
                                        
                                        return (
                                            <RadioButton 
                                                partName={"part5"}
                                                questionIsSelected={questionOneSelected}
                                                character={character}
                                                key={index}
                                                question={item}
                                                systemAnswer={data.correctAnswer}
                                                userAnswer={userAnswer}
                                                setUserAnswer={setUserAnswer}
                                            />
                                        )
                                    })
                                }
                            
                            </Animated.View>
                        </View>
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
                    <QuestionControl
                        handlePreviousQuestion={handlePreviousQuestion}
                        handleNextQuestion={handleNextQuestion}
                        setAllQuestionSelected={handleSetQuestionSelected}
                        allQuestionSelected={questionOneSelected}
                    />
                </View>
                
                <ResultModal
                        setIsPauseAudio={null}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        questions={questions}
                        navigation={navigation}
                />
            </SafeAreaView>
        </View>
        :
        <View>

        </View>
    )
}
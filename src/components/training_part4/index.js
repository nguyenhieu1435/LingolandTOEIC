import { View, Text, StatusBar, SafeAreaView, Pressable, Animated, Dimensions, ScrollView, Alert, PanResponder } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Question from '../question';
import AudioCustom from '../audio_speaker';
import QuestionControl from '../question_control';
import ResultModal from '../result_modal';


export default function TrainingPart4({navigation, route}) {
    const [offset, setOffset] = useState(0);
    const [topHeight, setTopHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(Dimensions.get('window').height);
    const [deviceHeight] = useState(Dimensions.get('window').height);
    const [isDividerClicked, setIsDividerClicked] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current;


    const {name, elementIndex, header} = route.params;
    const [data, setData] = useState(null);
    const [isPause, setIsPause] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const questions = useSelector(state => state.part4Training.questions);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [questionTwoSelected, setQuesitonTwoSelected] = useState(false);
    const [questionThreeSelected, setQuestionThreeSelected] = useState(false);
    const [allQuestionSelected, setAllQuestionSelected] = useState(false);
    const [isSuggestEngsub, setIsSuggestEngsub] = useState(true);
    const [showSuggest, setShowSuggest] = useState(true);


    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                setOffset(e.nativeEvent.pageY);
                setIsDividerClicked(true);
            },

            onPanResponderMove: (e, gestureState) => {
                setTopHeight(gestureState.moveY < 400 ? 400 : gestureState.moveY);
                setBottomHeight(
                    gestureState.moveY > deviceHeight - 150
                        ? 150
                        : deviceHeight - gestureState.moveY
                );
                setOffset(e.nativeEvent.pageY);
            },

            onPanResponderRelease: (e, gestureState) => {
                setOffset(e.nativeEvent.pageY);
                setIsDividerClicked(false);
            },
        })
    ).current;

    useEffect(()=>{
        if (allQuestionSelected){
            setTopHeight(deviceHeight/2 + 100);
            setBottomHeight(deviceHeight/2 - 100);
        }
    }, [allQuestionSelected])


    useEffect(()=>{
        if (elementIndex != null && elementIndex >= 0 && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
    }, [elementIndex])
    
    useEffect(()=>{
        if (questionOneSelected && questionTwoSelected && questionThreeSelected){
            setAllQuestionSelected(true);
        } else {
            setAllQuestionSelected(false);
        }
    }, [questionOneSelected, questionTwoSelected, questionThreeSelected])



    function setAllQuestionIsSelected(){
        setQuestionOneSelected(true);
        setQuesitonTwoSelected(true);
        setQuestionThreeSelected(true);
        
    }

    function handlePreviousQuestion( ){
        setIsPause(true);
        if (elementIndex == 0){
            return;
        } else {
            navigation.push("TrainingPart4",{
                name: name,
                header: header,
                elementIndex: elementIndex-1
            })
        }
    }
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

                            results: getQuestionForPart4(),
                        })
                    }
                }
            ]
        )
        } else {
            navigation.push("TrainingPart4",{
                name: name,
                header: header,
                elementIndex: elementIndex+1
            })
        }
    }
    function getQuestionForPart4(){
        let questionsForStatistic = [];
        for (let i = 0; i < questions.length; i++){
            questionsForStatistic = [...questionsForStatistic, ...questions[i].questionList];
        }
        return questionsForStatistic;
    }

    return (
        data
            ? 
            <View style={{flex: 1}}>
                <StatusBar/>
                <SafeAreaView style={{flex: 1}}>
                    
                    <View style={{backgroundColor: "#fff", position: "absolute", top: 0, left: 0, right: 0}}>
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
                                            <Text style={{color: "#20BB55"}}>Câu hỏi {elementIndex+71} - {elementIndex+71+2} / {71} - {71 + (questions.length * 3)}</Text>
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
                    <View style={{flex: 1, marginTop: 70}}>
                        <Animated.View
                                    style={[
                                        { flex: 1, padding: 10 },
                                        { height: topHeight },
                                    ]}
                            >
                                <ScrollView style={{flex: 1, }}>
                                    <View
                                        style={{backgroundColor: "#4AB542", borderRadius: 15, overflow: 'hidden'}}
                                    >
                                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                        , paddingHorizontal: 10, paddingVertical: 10}}>
                                            <Text style={{color: "#fff", fontSize: 17, fontWeight: 600}}>Transcript</Text>
                                            <View style={{flexDirection: "row"}}>
                                                <View style={{marginRight: 30}}>
                                                    {
                                                        isSuggestEngsub
                                                        ?
                                                        <Pressable
                                                            onPress={()=>setIsSuggestEngsub(false)}
                                                        >
                                                            <AntDesign name="filetext1" size={20} color="white" />
                                                        </Pressable>
                                                        :
                                                        <Pressable
                                                            onPress={()=>setIsSuggestEngsub(true)}
                                                        >

                                                            <MaterialIcons name="translate" size={20} color="white" />
                                                        </Pressable>
                                                    }
                                                
                                                </View>
                                                <View style={{marginRight: 4}}>
                                                    {
                                                        showSuggest
                                                        ?
                                                        <Pressable
                                                            onPress={()=>setShowSuggest(false)}
                                                        >
                                                            <FontAwesome name="angle-up" size={24} color="white" />
                                                        </Pressable>
                                                        :
                                                        <Pressable
                                                            onPress={()=>setShowSuggest(true)}
                                                        >
                                                            <FontAwesome name="angle-down" size={24} color="white" />
                                                        </Pressable>
                                                    }
                                                
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        showSuggest &&
                                        <View style={{padding: 15, backgroundColor: "#fff"}}>
                                             {
                                                isSuggestEngsub
                                                ?
                                                <View style={{marginBottom: 10, flexDirection: "row"}}>
                                                        <Text>
                                                            <Text style={{fontSize: 15, fontWeight: "500", color: "#ea7c4b"}}>{data?.transcriptEN?.username}  </Text>
                                                            {
                                                                data?.transcriptEN?.fulltalks?.map((item, index) => {
                                                                    return (
                                                                        <Text key={index} style={{fontSize: 16}}>
                                                                            {
                                                                                item?.spoilerNumber &&
                                                                                <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                                            }
                                                                            <Text style={{fontSize: 16, color: "#000", fontWeight: item?.spoilerNumber ? 700: 400,flex: 1}}>{item.talk}</Text>
                                                                        </Text>
                                                                    )
                                                                })  
                                                            }
                                                        </Text>
                                                </View>
                                                :
                                                <View style={{marginBottom: 10, flexDirection: "row"}}>
                                                        <Text>
                                                            <Text style={{fontSize: 15, fontWeight: "500", color: "#ea7c4b"}}>{data?.transcriptVN?.username}  </Text>
                                                            {
                                                                data?.transcriptVN?.fulltalks?.map((item, index) => {
                                                                    return (
                                                                        <Text key={index} style={{fontSize: 16}}>
                                                                            {
                                                                                item?.spoilerNumber &&
                                                                                <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                                            }
                                                                            <Text style={{fontSize: 16, color: "#000",fontWeight: item?.spoilerNumber ? 700: 400, flex: 1}}>{item.talk}</Text>
                                                                        </Text>
                                                                    )
                                                                })  
                                                            }
                                                        </Text>
                                                </View>
                                                // data.transcriptEN?.map((item, index)=>{
                                                
                                                //     return (
                                                //         <View key={index} style={{marginBottom: 10, flexDirection: "row"}}>
                                                //             <Text>
                                                //                 <Text style={{fontSize: 15, fontWeight: "500", color: "#ea7c4b"}}>{item.username}  </Text>
                                                //                 {
                                                //                     item?.spoilerNumber &&
                                                //                     <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                //                 }
                                                //                 <Text style={{fontSize: 15, color: "#000", flex: 1}}>{item.talk}</Text>
                                                //             </Text>
                                                //         </View>
                                                //     )
                                                
                                                // })
                                                // :
                                                // data.transcriptVN?.map((item, index)=>{
                                                //     return (
                                                //         <View key={index} style={{marginBottom: 10, flexDirection: "row"}}>
                                                //             <Text>
                                                //                 <Text style={{fontSize: 15, fontWeight: "500", color: "#ea7c4b"}}>{item.username}  </Text>
                                                //                 {
                                                //                     item?.spoilerNumber &&
                                                //                     <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                //                 }
                                                //                 <Text style={{fontSize: 15, color: "#000", flex: 1}}>{item.talk}</Text>
                                                //             </Text>
                                                //         </View>
                                                //     )
                                                
                                                // })
                                            }
                                        </View>
                                    }
                                </ScrollView>
                        </Animated.View>
                        {
                            allQuestionSelected &&
                            <View
                                style={[
                                    
                                    isDividerClicked
                                        ? { backgroundColor: '#666' }
                                        : { backgroundColor: '#e2e2e2' },
                                ]}
                                {...panResponder.panHandlers}
                            >
                                <Text style={{textAlign: "center", fontWeight: 600, fontSize: 20, color: "#000"
                                , paddingVertical: 4}}>...</Text>
                            </View>
                        }

                        <Animated.View style={{paddingHorizontal: 15, marginBottom: 150, height: allQuestionSelected ? bottomHeight : "auto"}}
                        
                        >
                            <ScrollView>
                                <Question partName="part4" questions={data?.questionList[0]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={0}
                                    questionIsSelected={questionOneSelected}
                                    setQuestionSelected={setQuestionOneSelected}
                                    numberQuestion={71 + (elementIndex * 3)}
                                />
                                <Question partName="part4" questions={data?.questionList[1]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={1}
                                    questionIsSelected={questionTwoSelected}
                                    setQuestionSelected={setQuesitonTwoSelected}
                                    numberQuestion={72 +  (elementIndex * 3)}
                                />
                                <Question partName="part4" questions={data?.questionList[2]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={2}
                                    questionIsSelected={questionThreeSelected}
                                    setQuestionSelected={setQuestionThreeSelected}
                                    numberQuestion={73 +  (elementIndex * 3) }
                                />
                            </ScrollView>
                        </Animated.View>
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
                            questions={getQuestionForPart4()}
                            navigation={navigation}
                        />
                    </View>
                </SafeAreaView>
            </View>
            :
            <View>
            </View>
    )
}
import { View, Text, SafeAreaView, ScrollView, Pressable, Alert, Dimensions, Animated, PanResponder } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Question from '../question';
import AudioCustom from '../audio_speaker';
import QuestionControl from '../question_control';
import ResultModal from '../result_modal';
import { dataViewPart03 } from '../../data/dataViewPart3';
import { setSelectedForIndexPart3 } from '../../redux/slices/part3Training';


export default function TrainingPart3({navigation, route}) {
    const [offset, setOffset] = useState(0);
    const [topHeight, setTopHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(Dimensions.get('window').height);
    const [deviceHeight] = useState(Dimensions.get('window').height);
    const [isDividerClicked, setIsDividerClicked] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    const dispatch = useDispatch();


    const {name, elementIndex, header} = route.params;
    const [isPause, setIsPause] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const question = useSelector(state => state.part3Training.questions);
    const [data, setData] = useState(null);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [questionTwoSelected, setQuesitonTwoSelected] = useState(false);
    const [questionThreeSelected, setQuestionThreeSelected] = useState(false);
    const [allQuestionSelected, setAllQuestionSelected] = useState(false);
    const [isSuggestEngsub, setIsSuggestEngsub] = useState(true);
    const [showSuggest, setShowSuggest] = useState(true);

    useEffect(()=>{
        if (allQuestionSelected){
            setTopHeight(deviceHeight/2 + 100);
            setBottomHeight(deviceHeight/2 - 100);
        }
    }, [allQuestionSelected])

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
        if (question[elementIndex].questionList[0].isSelected){
            setQuestionOneSelected(true);
        }
        if (question[elementIndex].questionList[1].isSelected){
            setQuesitonTwoSelected(true);
        }
        if (question[elementIndex].questionList[2].isSelected){
            setQuestionThreeSelected(true);
        }
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
        dispatch(setSelectedForIndexPart3({
            index: elementIndex
        }))
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

            <SafeAreaView style={{flex: 1, position: "relative"}}>
                <View style={{backgroundColor: "#fff", position: "absolute", top: 0, left: 0, right: 0}}>
                            <View style={{ flexDirection: "row",alignItems: "center", paddingVertical: 10}}>
                                    <Pressable style={{width: "20%"}}
                                        onPress={()=>{
                                            setIsPause(true)
                                            navigation.navigate("partItem", {
                                                name: "Part 3",
                                                title: "Đoạn hội thoại",
                                                data: dataViewPart03
                                            })                
                                        }}
                                    >
                                        <Ionicons name="arrow-back" size={24} color="black" 
                                            style={{paddingHorizontal: 20}}
                                        />
                                    </Pressable>
                                        <View style={{flexGrow: 1}}>
                                            <Text style={{fontSize: 17, fontWeight: "500"}}>{header}</Text>
                                            <Text style={{color: "#20BB55"}}>Câu hỏi {elementIndex+32} -  {elementIndex+32+2} / {32} - {34 + ((question.length-1) * 3)}</Text>
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

                                    {
                                        showSuggest &&
                                        <View style={{padding: 15, backgroundColor: "#fff"}}>
                                            {
                                                isSuggestEngsub
                                                ?
                                                data.transcriptEN?.map((item, index)=>{
                                                
                                                    return (
                                                        <View key={index} style={{marginBottom: 10, flexDirection: "row"}}>
                                                            <Text style={{fontSize: 16}}>
                                                                <Text style={{ fontWeight: "500", color: "#ea7c4b"}}>{item.username}  </Text>
                                                                {
                                                                    item?.spoilerNumber &&
                                                                    <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                                }
                                                                <Text style={{fontSize: 16, color: "#000", flex: 1}}>{item.talk}</Text>
                                                            </Text>
                                                        </View>
                                                    )
                                                
                                                })
                                                :
                                                data.transcriptVN?.map((item, index)=>{
                                                    return (
                                                        <View key={index} style={{marginBottom: 10, flexDirection: "row"}}>
                                                            <Text style={{fontSize: 16}}>
                                                                <Text style={{ fontWeight: "500", color: "#ea7c4b"}}>{item.username}  </Text>
                                                                {
                                                                    item?.spoilerNumber &&
                                                                    <Text style={{color: "#4AB542"}}>{item.spoilerNumber} </Text>
                                                                }
                                                                <Text style={{fontSize: 16, color: "#000", flex: 1}}>{item.talk}</Text>
                                                            </Text>
                                                        </View>
                                                    )
                                                
                                                })
                                            }
                                        </View>
                                    }
                                </View>
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
                                <Question partName="part3" questions={data?.questionList[0]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={0}
                                    questionIsSelected={questionOneSelected}
                                    setQuestionSelected={setQuestionOneSelected}
                                    numberQuestion={32 + (elementIndex * 3)}
                                />
                                <Question partName="part3" questions={data?.questionList[1]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={1}
                                    questionIsSelected={questionTwoSelected}
                                    setQuestionSelected={setQuesitonTwoSelected}
                                    numberQuestion={33 + (elementIndex * 3)}
                                />
                                <Question partName="part3" questions={data?.questionList[2]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={2}
                                    questionIsSelected={questionThreeSelected}
                                    setQuestionSelected={setQuestionThreeSelected}
                                    numberQuestion={34 + (elementIndex * 3)}
                                />
                            </ScrollView>
                        </Animated.View>
                    </View>
                    {/* <ScrollView
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

                        <Animated.View
                            style={[
                                { backgroundColor: 'pink', flex: 1 },
                                { height: topHeight },
                            ]}
                        ></Animated.View>

                        <View
                            style={[
                                { height: 10 },
                                isDividerClicked
                                    ? { backgroundColor: '#666' }
                                    : { backgroundColor: '#e2e2e2' },
                            ]}
                            {...panResponder.panHandlers}
                        ></View>

                        <Animated.View style={{paddingHorizontal: 15, marginBottom: 150, height: bottomHeight}}
                
                        >
                            <ScrollView>
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
                            </ScrollView>
                        </Animated.View>

                    </ScrollView> */}
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
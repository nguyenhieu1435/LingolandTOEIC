import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, PanResponder, SafeAreaView, StatusBar } from 'react-native'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { dataViewPart06 } from '../../data/dataViewPart6';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';
import Question from '../question';
import { ScrollView } from 'react-native';
import { setSelectedForIndexPart6 } from '../../redux/slices/part6Training';
import QuestionControl from '../question_control';
import ResultModal from '../result_modal';


export default function TrainingPart6({navigation, route}) {
    const [offset, setOffset] = useState(0);
    const [topHeight, setTopHeight] = useState((Dimensions.get('window').height)/2 + 100);
    const [bottomHeight, setBottomHeight] = useState((Dimensions.get('window').height)/2 - 100);
    const [deviceHeight] = useState(Dimensions.get('window').height);
    const [isDividerClicked, setIsDividerClicked] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    const dispatch = useDispatch();


    const {name, elementIndex, header} = route.params;
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const questions = useSelector(state => state.part6Training.questions);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [questionTwoSelected, setQuesitonTwoSelected] = useState(false);
    const [questionThreeSelected, setQuestionThreeSelected] = useState(false);
    const [questionFourSelected, setQuestionFourSelected] = useState(false);
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
        setQuestionOneSelected(false);
        setQuesitonTwoSelected(false);
        setQuestionThreeSelected(false);
        setQuestionFourSelected(false);
        setAllQuestionSelected(false);
        setIsSuggestEngsub(true);
        setShowSuggest(true);
        

        if (elementIndex !== null && elementIndex >= 0 && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
        if (questions[elementIndex].questionList[0].isSelected){
            setQuestionOneSelected(true);
        }
        if (questions[elementIndex].questionList[1].isSelected){
            setQuesitonTwoSelected(true);
        }
        if (questions[elementIndex].questionList[2].isSelected){
            setQuestionThreeSelected(true);
        }
        if (questions[elementIndex].questionList[3].isSelected){
            setQuestionFourSelected(true);
        }

    }, [elementIndex])

    useEffect(()=>{
        if (questionOneSelected && questionTwoSelected && questionThreeSelected && questionFourSelected){
            setAllQuestionSelected(true);
        } else {
            setAllQuestionSelected(false);
        }
    }, [questionOneSelected, questionTwoSelected, questionThreeSelected, questionFourSelected])

    function handleSetAllSelected(){
        dispatch(
            setSelectedForIndexPart6({index: elementIndex})
        )
        setQuestionOneSelected(true);
        setQuesitonTwoSelected(true);
        setQuestionThreeSelected(true);
        setQuestionFourSelected(true);
    }

    function handlePreviousQuestion(){
        if (elementIndex > 0){
            navigation.navigate("TrainingPart6", {
                header: header,
                name: name,
                elementIndex: elementIndex - 1,
            })
        }
    }
    function handleNextQuestion(){
        if (elementIndex == questions.length - 1){
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

                            results: getQuestionForPart6(),
                        })
                    }
                }
            ])
        } else {
            navigation.navigate("TrainingPart6", {
                header: header,
                name: name,
                elementIndex: elementIndex + 1,
            })
        }
    }

    function getQuestionForPart6(){
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
                                        
                                            navigation.navigate("partItem", {
                                                name: "Part 6",
                                                title: "Hoàn thành đoan văn",
                                                data: dataViewPart06
                                            })    
                                        }}
                                    >
                                        <Ionicons name="arrow-back" size={24} color="black" 
                                            style={{paddingHorizontal: 20}}
                                        />
                                    </Pressable>
                                        <View style={{flexGrow: 1}}>
                                            <Text style={{fontSize: 17, fontWeight: "500"}}>{header}</Text>
                                            <Text style={{color: "#20BB55"}}>Câu hỏi {(elementIndex*4)+131} - {(elementIndex*4)+134} / {131} - {134 + (questions.length * 4)}</Text>
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
                            <Text style={{backgroundColor: "#fff", paddingVertical: 10
                            , borderRadius: 10, paddingHorizontal: 8, fontSize: 16, marginBottom: 10}}>
                                {data?.title}
                            </Text>

                            <View>
                                <View
                                style={{backgroundColor: "#4AB542", borderRadius: 10, overflow: 'hidden'}}
                                >
                                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                                , paddingHorizontal: 10, paddingVertical: 10}}>
                                                    <Text style={{color: "#fff", fontSize: 17, fontWeight: 600}}>{isSuggestEngsub ? data.typeEN : data.typeVN}</Text>
                                                    <View style={{flexDirection: "row"}}>
                                                            
                                                            {
                                                                allQuestionSelected &&
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
                                                            }
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
                                <View style={{backgroundColor: "#fff", padding: showSuggest ? 10 : 0, height: showSuggest ? "auto" : 0}}>
                                    {
                                        isSuggestEngsub
                                        ?
                                        <Text>
                                            {
                                                data.transcriptEN.map((item, index)=>{
                                                    return (
                                                        <Text key={index} style={{fontSize: 16, color: item?.spoilerNumber ? "#29A3EF" : "#000"
                                                        , fontWeight: item?.spoilerNumber ? 600 : 400}}>
                                                            {item?.spoilerNumber ? " " + item.talk + " " : item.talk}
                                                        </Text>
                                                    )
                                                })
                                            }
                                        </Text>
                                        :
                                        <Text>
                                        {
                                            data.transcriptVN.map((item, index)=>{
                                                return (
                                                    <Text key={index}>
                                                        <Text style={{fontWeight: 600 ,color: "#2DC26B"}}>{item?.spoilerNumber ? " " + item?.spoilerNumber + " " : ""}</Text>
                                                        <Text style={{fontSize: 16, color: item?.spoilerNumber ? "#29A3EF" : "#000"
                                                        , fontWeight: item?.spoilerNumber ? 600 : 400}}>
                                                            {item?.spoilerNumber ? " " + item.talk + " " : item.talk}
                                                        </Text>
                                                    </Text>
                                                )
                                            })
                                        }
                                        </Text>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View>
                    <View
                        style={[
                                    
                                isDividerClicked
                                ? { backgroundColor: '#666' }
                                : { backgroundColor: '#e2e2e2' },
                            ]}
                                {...panResponder.panHandlers}
                    >
                        <Text style={{textAlign: "center", fontWeight: 600, fontSize: 20, color: "#000"
                            , paddingVertical: 4}}>...
                        </Text>
                    </View>
                    <Animated.View style={{paddingHorizontal: 15, marginBottom: 110
                    , height: bottomHeight}}
                        
                        >
                            <ScrollView>
                                <Question partName="part6" questions={data?.questionList[0]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={0}
                                    questionIsSelected={questionOneSelected}
                                    setQuestionSelected={setQuestionOneSelected}
                                    numberQuestion={131 + (elementIndex * 4)}
                                />
                                <Question partName="part6" questions={data?.questionList[1]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={1}
                                    questionIsSelected={questionTwoSelected}
                                    setQuestionSelected={setQuesitonTwoSelected}
                                    numberQuestion={132 +  (elementIndex * 4)}
                                />
                                <Question partName="part6" questions={data?.questionList[2]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={2}
                                    questionIsSelected={questionThreeSelected}
                                    setQuestionSelected={setQuestionThreeSelected}
                                    numberQuestion={133 +  (elementIndex * 4) }
                                />
                                <Question partName="part6" questions={data?.questionList[3]} elementIndex={elementIndex} 
                                    indexOfQuestionDiferPart12={3}
                                    questionIsSelected={questionFourSelected}
                                    setQuestionSelected={setQuestionFourSelected}
                                    numberQuestion={134 +  (elementIndex * 4) }
                                />
                            </ScrollView>
                    </Animated.View>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 1,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 5,
                        }}
                    >
                        <QuestionControl
                            handlePreviousQuestion={handlePreviousQuestion}
                            handleNextQuestion={handleNextQuestion}
                            setAllQuestionSelected={handleSetAllSelected}
                            allQuestionSelected={allQuestionSelected}
                        />
                    </View>
                </View>
                <ResultModal
                    setIsPauseAudio={null}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    questions={getQuestionForPart6()}
                    navigation={navigation}
                />
            </SafeAreaView>
        </View>
        :
        <View></View>
    )
}
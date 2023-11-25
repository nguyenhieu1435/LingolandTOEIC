import { Alert, Dimensions, PanResponder, Pressable, SafeAreaView, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { dataViewPart07 } from '../../data/dataViewPart7';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Question from '../question';
import { ScrollView } from 'react-native';
import QuestionControl from '../question_control';
import { setSelectedForIndexPart7 } from '../../redux/slices/part7Training';
import ResultModal from '../result_modal';


export default function TrainingPart7({navigation, route}) {
    const [offset, setOffset] = useState(0);
    const [topHeight, setTopHeight] = useState((Dimensions.get('window').height)/2 + 100);
    const [bottomHeight, setBottomHeight] = useState((Dimensions.get('window').height)/2 - 100);
    const [deviceHeight] = useState(Dimensions.get('window').height);
    const [isDividerClicked, setIsDividerClicked] = useState(false);


    const {header, name, elementIndex} = route.params;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const questions = useSelector(state => state.part7Training.questions);
    const [questionOneSelected, setQuestionOneSelected] = useState(false);
    const [questionTwoSelected, setQuesitonTwoSelected] = useState(false);
    const [questionThreeSelected, setQuestionThreeSelected] = useState(false);
    const [questionFourSelected, setQuestionFourSelected] = useState(false);
    const [questionFiveSelected, setQuestionFiveSelected] = useState(false);
    const [allQuestionSelected, setAllQuestionSelected] = useState(false);
    const [showSuggest1, setShowSuggest1] = useState(true);
    const [showSuggest2, setShowSuggest2] = useState(true);
    const [showSuggest3, setShowSuggest3] = useState(true);
    const [isEngsub1, setIsEngsub1] = useState(true);
    const [isEngsub2, setIsEngsub2] = useState(true);
    const [isEngsub3, setIsEngsub3] = useState(true);

    const dispatch = useDispatch();

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


    function getFirstQuestionOfIndexElement(){
        let firstQuestionNumber = 147;
        if (questions && questions.length > 0){
            for (let i = 0; i < questions.length; i++){
                if (i == elementIndex){
                    return firstQuestionNumber;
                }
                questions[i].questionList.forEach((question, indexQuestionList) => {
                    ++firstQuestionNumber;
                })
            }
        }
        return firstQuestionNumber;
    }
    function getTotalQuestion(){
        let totalQuestion = 147;
        if (questions && questions.length > 0){
            questions.forEach((element, index) => {
                element.questionList.forEach((question, indexQuestionList) => {
                    ++totalQuestion;
                })
            })
        }
        return totalQuestion;
    }

    function handlePreviousQuestion(){ 
        if (elementIndex > 0){
            navigation.navigate("TrainingPart7", {
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
                            results: getQuestionForPart7(),
                        })
                    }
                }
            ])
        } else {
            navigation.navigate("TrainingPart7", {
                header: header,
                name: name,
                elementIndex: elementIndex + 1,
            })
        }
    }
    function getQuestionForPart7(){
        let questionsForStatistic = [];
        for (let i = 0; i < questions.length; i++){
            questionsForStatistic = [...questionsForStatistic, ...questions[i].questionList];
        }
        return questionsForStatistic;
    
    }
    function handleSetAllSelected(){
        dispatch(setSelectedForIndexPart7({index: elementIndex}));
        if (questions && questions.length > 0 && elementIndex != null && elementIndex < questions.length){
            const questionList = questions[elementIndex].questionList;
            questionList.forEach((question, index) => {
                if (index == 0){
                    setQuestionOneSelected(true);
                } else if (index == 1){
                    setQuesitonTwoSelected(true);
                } else if (index == 2){
                    setQuestionThreeSelected(true);
                } else if (index == 3){
                    setQuestionFourSelected(true);
                } else if (index == 4){
                    setQuestionFiveSelected(true);
                }
            })
        }
    }

    function renderMessageChain(transcriptMessageChainEN, transcriptMessageChainVN, stateRef, setStateRef,  stateEngRef,
        setStateEngRef, typeEN, typeVN
    ){
        return (
            <View>
                <View
                    style={{backgroundColor: "#4AB542", borderRadius: 10, overflow: 'hidden'}}
                >
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                , paddingHorizontal: 10, paddingVertical: 10}}>
                                    <Text style={{color: "#fff", fontSize: 17, fontWeight: 600}}>{stateEngRef ? typeEN : typeVN}</Text>
                                    <View style={{flexDirection: "row"}}>
                                            
                                            {
                                                allQuestionSelected &&
                                                <View style={{marginRight: 30}}>
                                                    {
                                                        stateEngRef
                                                        ?
                                                        <Pressable
                                                            onPress={()=> setStateEngRef(false)}
                                                        >
                                                            <AntDesign name="filetext1" size={20} color="white" />
                                                        </Pressable>
                                                        :
                                                        <Pressable
                                                        onPress={()=> setStateEngRef(true)}
                                                        >

                                                            <MaterialIcons name="translate" size={20} color="white" />
                                                        </Pressable>
                                                    }
                                                
                                                </View>
                                            }
                                            <View style={{marginRight: 4}}>
                                                {
                                                    showSuggest1
                                                    ?
                                                    <Pressable
                                                        onPress={()=>setStateRef(false)}
                                                    >
                                                        <FontAwesome name="angle-up" size={24} color="white" />
                                                    </Pressable>
                                                    :
                                                    <Pressable
                                                        onPress={()=>setStateRef(true)}
                                                    >
                                                        <FontAwesome name="angle-down" size={24} color="white" />
                                                    </Pressable>
                                                }
                                            
                                            </View>
                                    </View>
                    </View>
                </View>
                <View style={{backgroundColor: "#fff", padding: stateRef ? 10 : 0, height: stateRef ? "auto" : 0}}>
                    {
                        stateEngRef
                        ?
                        transcriptMessageChainEN.map((item, index) => {
                            return (
                                <View key={index} style={{marginBottom: 18}}>
                                    <Text style={{fontWeight: "700", fontSize: 17}}>{item.speaker}</Text>
                                    <Text>
                                    {
                                        item.talks.map((talk, index2) => {
                                            return (
                                                <Text key={index2}>
                                                    {
                                                        allQuestionSelected && talk?.suggestNumber &&
                                                        <Text style={{color: "#2FBB91", fontSize: 16, fontWeight: 600}}>{" " + talk.suggestNumber + " "}</Text>
                                                    }
                                                    <Text style={{fontSize: 16, color: allQuestionSelected && talk?.suggestNumber ? "#42AEF1" : "#000",
                                                    fontWeight: allQuestionSelected && talk?.suggestNumber ? 600 : 400}}>{talk.content}</Text>
                                                </Text>
                                            )
                                        })
                                    }
                                    </Text>
                                </View>
                            )
                        })
                        :
                        transcriptMessageChainVN.map((item, index) => {
                            return (
                                <View key={index} style={{marginBottom: 18}}>
                                    <Text style={{fontWeight: "700", fontSize: 17}}>{item.speaker}</Text>
                                    <Text>
                                    {
                                        item.talks.map((talk, index2) => {
                                            return (
                                                <Text key={index2}>
                                                    {
                                                        allQuestionSelected && talk?.suggestNumber &&
                                                        <Text style={{color: "#2FBB91", fontSize: 16, fontWeight: 600}}>{" " + talk.suggestNumber + " "}</Text>
                                                    }
                                                    <Text style={{fontSize: 16, color: allQuestionSelected && talk?.suggestNumber ? "#42AEF1" : "#000",
                                                    fontWeight: allQuestionSelected && talk?.suggestNumber ? 600 : 400}}>{talk.content}</Text>
                                                </Text>
                                            )
                                        })
                                    }
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    function renderEmail(transcriptEN, transcriptVN, stateRef, setStateRef,  stateEngRef,
        setStateEngRef, typeEN, typeVN
    ){
        return (
            <View>
                <View
                    style={{backgroundColor: "#4AB542", borderRadius: 10, overflow: 'hidden'}}
                >
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                , paddingHorizontal: 10, paddingVertical: 10}}>
                                    <Text style={{color: "#fff", fontSize: 17, fontWeight: 600}}>{stateEngRef ? typeEN : typeVN}</Text>
                                    <View style={{flexDirection: "row"}}>
                                            
                                            {
                                                allQuestionSelected &&
                                                <View style={{marginRight: 30}}>
                                                    {
                                                        stateEngRef
                                                        ?
                                                        <Pressable
                                                            onPress={()=> setStateEngRef(false)}
                                                        >
                                                            <AntDesign name="filetext1" size={20} color="white" />
                                                        </Pressable>
                                                        :
                                                        <Pressable
                                                        onPress={()=> setStateEngRef(true)}
                                                        >

                                                            <MaterialIcons name="translate" size={20} color="white" />
                                                        </Pressable>
                                                    }
                                                
                                                </View>
                                            }
                                            <View style={{marginRight: 4}}>
                                                {
                                                    showSuggest1
                                                    ?
                                                    <Pressable
                                                        onPress={()=>setStateRef(false)}
                                                    >
                                                        <FontAwesome name="angle-up" size={24} color="white" />
                                                    </Pressable>
                                                    :
                                                    <Pressable
                                                        onPress={()=>setStateRef(true)}
                                                    >
                                                        <FontAwesome name="angle-down" size={24} color="white" />
                                                    </Pressable>
                                                }
                                            
                                            </View>
                                    </View>
                    </View>
                </View>
                <View style={{backgroundColor: "#fff", padding: stateRef ? 10 : 0, height: stateRef ? "auto" : 0}}>
                    <View style={{marginBottom: 20}}>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row", marginBottom: 10}}>
                            <Text style={{fontWeight: 700, fontSize: 16}}>To:</Text>
                            <View style={{width: "80%"}}>
                                <Text style={{fontSize: 16}}>{stateEngRef ? transcriptEN.to : transcriptVN.to}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row", marginBottom: 10}}>
                            <Text style={{fontWeight: 700, fontSize: 16}}>From:</Text>
                            <View style={{width: "80%"}}>
                                <Text style={{fontSize: 16}}>{stateEngRef ? transcriptEN.from : transcriptVN.from}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row", marginBottom: 10}}>
                            <Text style={{fontWeight: 700, fontSize: 16}}>Subject:</Text>
                            <View style={{width: "80%"}}>
                                <Text style={{fontSize: 16}}>{stateEngRef ? transcriptEN.subject : transcriptVN.subject}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row", marginBottom: 10}}>
                            <Text style={{fontWeight: 700, fontSize: 16}}>Date:</Text>
                            <View style={{width: "80%"}}>
                                <Text style={{fontSize: 16}}>{stateEngRef ? transcriptEN.date : transcriptVN.date}</Text>
                            </View>
                        </View>
                    </View>
                    <Text>
                        {
                            stateEngRef
                            ?
                            transcriptEN.contents.map((content, index) => {
                                return (
                                    <Text key={index}>
                                    {
                                        allQuestionSelected && content?.suggestNumber &&
                                        <Text style={{color: "#2FBB91", fontSize: 16, fontWeight: 600}}>{" " + content.suggestNumber + " "}</Text>
                                    }
                                    <Text style={{fontSize: 16, color: allQuestionSelected && content?.suggestNumber ? "#42AEF1" : "#000",
                                    fontWeight: (content && content?.suggestNumber) || content?.isFillIn ? 600 : 400}}>{content.content}</Text>
                                    {
                                        allQuestionSelected && content?.answer &&
                                        <Text style={{color: "#FF6600", fontSize: 16}}>{content.answer}</Text>
                                    }
                                </Text>
                                )
                            })
                            :
                            transcriptVN.contents.map((content, index) => {
                                return (
                                    <Text key={index}>
                                    {
                                        allQuestionSelected && content?.suggestNumber &&
                                        <Text style={{color: "#2FBB91", fontSize: 16, fontWeight: 600}}>{" " + content.suggestNumber + " "}</Text>
                                    }
                                    <Text style={{fontSize: 16, color: allQuestionSelected && content?.suggestNumber ? "#42AEF1" : "#000",
                                    fontWeight: (content && content?.suggestNumber) || content?.isFillIn ? 600 : 400}}>{content.content}</Text>
                                    {
                                        allQuestionSelected && content?.isFillIn &&
                                        <Text style={{color: "#FF6600", fontSize: 16}}>{content.isFillIn}</Text>
                                    }
                                </Text>
                                )
                            })
                        }
                    </Text>

                </View>
            </View>
        )
    }


    useEffect(()=>{
        setQuestionOneSelected(false);
        setQuesitonTwoSelected(false);
        setQuestionThreeSelected(false);
        setQuestionFourSelected(false);
        setQuestionFiveSelected(false);
        setAllQuestionSelected(false);
        setShowSuggest1(true);
        setShowSuggest2(true);
        setShowSuggest3(true);

        if (questions && questions.length > 0 && elementIndex != null && elementIndex < questions.length){
            setData(questions[elementIndex]);
        }
        if (questions && questions.length > 0 && elementIndex != null && elementIndex < questions.length){
            const questionList = questions[elementIndex].questionList;
            questionList.forEach((question, index) => {
                if (question.isSelected){
                    if (index == 0){
                        setQuestionOneSelected(true);
                    } else if (index == 1){
                        setQuesitonTwoSelected(true);
                    } else if (index == 2){
                        setQuestionThreeSelected(true);
                    } else if (index == 3){
                        setQuestionFourSelected(true);
                    } else if (index == 4){
                        setQuestionFiveSelected(true);
                    }
                }
            })
        }

    }, [elementIndex])

    useEffect(()=>{
        if (questions && questions.length > 0 && elementIndex != null && elementIndex < questions.length){
            const questionList = questions[elementIndex].questionList;
            let isAllQuestionSelected = true;
            questionList.forEach((question, index) => {
                if (!question.isSelected){
                    isAllQuestionSelected = false;
                }
            })
            setAllQuestionSelected(isAllQuestionSelected);
        }
    
    }, [questionOneSelected, questionTwoSelected, questionThreeSelected, questionFourSelected, questionFiveSelected])

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
                                                    title:"Đọc hiểu",
                                                    name:"Part 7",
                                                    data: dataViewPart07
                                                })    
                                            }}
                                        >
                                            <Ionicons name="arrow-back" size={24} color="black" 
                                                style={{paddingHorizontal: 20}}
                                            />
                                        </Pressable>
                                            <View style={{flexGrow: 1}}>
                                                <Text style={{fontSize: 17, fontWeight: "500"}}>{header}</Text>
                                                <Text style={{color: "#20BB55"}}>Câu hỏi {getFirstQuestionOfIndexElement()} - {getFirstQuestionOfIndexElement() + questions[elementIndex].questionList.length - 1} / {147} -  {getTotalQuestion()-1}</Text>
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

                            {
                                data.types.map((item, index) => {
                                    let stateRef = null;
                                    let setStateRef = null;
                                    let stateEngRef = null;
                                    let setStateEngRef = null;
                                    if (index == 0){
                                        stateRef = showSuggest1;
                                        setStateRef = setShowSuggest1;
                                        stateEngRef = isEngsub1;
                                        setStateEngRef = setIsEngsub1;
                                    } else if (index == 1){
                                        stateRef = showSuggest2;
                                        setStateRef = setShowSuggest2;
                                        stateEngRef = isEngsub2;
                                        setStateEngRef = setIsEngsub2;
                                    } else if (index == 2){
                                        stateRef = showSuggest3;
                                        setStateRef = setShowSuggest3;
                                        stateEngRef = isEngsub3;
                                        setStateEngRef = setIsEngsub3;
                                    }
                                    if (item.type == "MessageChain"){
                                        return renderMessageChain(
                                            data[`transcript${item.type}EN`],
                                            data[`transcript${item.type}VN`],
                                            stateRef,
                                            setStateRef,
                                            stateEngRef,
                                            setStateEngRef,
                                            item.typeEN,
                                            item.typeVN
                                        );
                                    } else if (item.type == "Email"){
                                        return renderEmail(
                                            data[`transcript${item.type}EN`],
                                            data[`transcript${item.type}VN`],
                                            stateRef,
                                            setStateRef,
                                            stateEngRef,
                                            setStateEngRef,
                                            item.typeEN,
                                            item.typeVN
                                        );
                                    }
                                })
                            }

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
                    <Animated.View style={{paddingHorizontal: 15, marginBottom: 100
                    , height: bottomHeight}}
                        
                        >
                            <ScrollView>
                                {
                                    0 <= questions[elementIndex].questionList.length - 1 &&
                                    <Question partName="part7" questions={data?.questionList[0]} elementIndex={elementIndex} 
                                        indexOfQuestionDiferPart12={0}
                                        questionIsSelected={questionOneSelected}
                                        setQuestionSelected={setQuestionOneSelected}
                                        numberQuestion={getFirstQuestionOfIndexElement()}
                                    />
                                }

                                {
                                    1 <= questions[elementIndex].questionList.length - 1 &&
                                    <Question partName="part7" questions={data?.questionList[1]} elementIndex={elementIndex} 
                                        indexOfQuestionDiferPart12={1}
                                        questionIsSelected={questionTwoSelected}
                                        setQuestionSelected={setQuesitonTwoSelected}
                                        numberQuestion={getFirstQuestionOfIndexElement() + 1}
                                    />
                                }

                                {
                                    2 <= questions[elementIndex].questionList.length - 1 &&
                                    <Question partName="part7" questions={data?.questionList[2]} elementIndex={elementIndex} 
                                        indexOfQuestionDiferPart12={2}
                                        questionIsSelected={questionThreeSelected}
                                        setQuestionSelected={setQuestionThreeSelected}
                                        numberQuestion={getFirstQuestionOfIndexElement() + 2}
                                    />
                                }

                                {
                                    3 <= questions[elementIndex].questionList.length - 1 &&
                                    <Question partName="part7" questions={data?.questionList[3]} elementIndex={elementIndex} 
                                        indexOfQuestionDiferPart12={3}
                                        questionIsSelected={questionFourSelected}
                                        setQuestionSelected={setQuestionFourSelected}
                                        numberQuestion={getFirstQuestionOfIndexElement() + 3}
                                    />
                                }

                                {
                                    4 <= questions[elementIndex].questionList.length - 1 &&
                                    <Question partName="part7" questions={data?.questionList[4]} elementIndex={elementIndex} 
                                        indexOfQuestionDiferPart12={4}
                                        questionIsSelected={questionFiveSelected}
                                        setQuestionSelected={setQuestionFiveSelected}
                                        numberQuestion={getFirstQuestionOfIndexElement() + 4}
                                    />
                                }
                                
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
                    questions={getQuestionForPart7()}
                    navigation={navigation}
                />
            </SafeAreaView>
        </View>
        :
        <View></View>
    )
}
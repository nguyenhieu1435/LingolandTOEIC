import { View, Text, Pressable, Animated} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../radio_button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useLayoutEffect,  useState } from 'react';
import getAnswerCharacterByIndex from '../../utils/getAnswerCharacterByIndex';
import { useDispatch } from 'react-redux';
import { setAnswerByIndex } from '../../redux/slices/part1Training';
import { useSelector } from 'react-redux';
import getSliceNameByPartName from '../../utils/getSliceNameByPartName';
import { setAnswerByIndexPart2 } from '../../redux/slices/part2Training';
import { MaterialIcons } from '@expo/vector-icons';
import { setAnswerByIndexPart3 } from '../../redux/slices/part3Training';
import { setAnswerByIndexPart4 } from '../../redux/slices/part4Training';
import { setAnswerByIndexPart6 } from '../../redux/slices/part6Training';


export default function Question({partName, questions, numberQuestion, elementIndex, 
    questionIsSelected, setQuestionSelected, indexOfQuestionDiferPart12}) {
    const dispatch = useDispatch();
    const [showContent, setShowContent] = useState(true);
    const [userAnswer, setUserAnswer] = useState(null);
    // get state from name in redux store, if add new part, go to getSliceNameByPartName.js to add new case
    const state = useSelector(state => state[getSliceNameByPartName(partName)])

    // dropdown question content hide/show
    function handleToggleContent(){
       setShowContent(!showContent);
    }
   

    useLayoutEffect(()=>{
        // set user answer for question if it has been choosen
        // add else if, if add new part
        setUserAnswer(null);
        if (partName === "part1"){
           
            if (state.questions[elementIndex].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex].yourAnswer);
            }
        } else if (partName === "part2"){
            if (state.questions[elementIndex].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex].yourAnswer);
            }
        } else if (partName === "part3"){
          
            if (state.questions[elementIndex].questionList[indexOfQuestionDiferPart12].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex]?.questionList[indexOfQuestionDiferPart12]?.yourAnswer)
            }
        } else if (partName === "part4"){
            if (state.questions[elementIndex].questionList[indexOfQuestionDiferPart12].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex]?.questionList[indexOfQuestionDiferPart12]?.yourAnswer);
            }
        } else if (partName === "part6"){
            if (state.questions[elementIndex].questionList[indexOfQuestionDiferPart12].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex]?.questionList[indexOfQuestionDiferPart12]?.yourAnswer);
            }
        }
    }, [elementIndex])

    // redux reducer, set question, which is selected by user 
    // add else if, if add new part
    useEffect(()=>{
        if (userAnswer){
            setQuestionSelected(true);
            if (partName === "part1"){
                // setAnswerByIndex only use for part1
                dispatch(setAnswerByIndex({index: elementIndex, userAnswer: userAnswer}))
            } else if (partName === "part2"){
                dispatch(setAnswerByIndexPart2({index: elementIndex, userAnswer: userAnswer}))
            } else if (partName === "part3"){
                dispatch(setAnswerByIndexPart3({index: elementIndex, userAnswer: userAnswer
                    , indexInQuestionList: indexOfQuestionDiferPart12}))
            } else if (partName === "part4"){
                dispatch(setAnswerByIndexPart4({index: elementIndex, userAnswer: userAnswer, 
                    indexInQuestionList: indexOfQuestionDiferPart12}))
            } else if (partName === "part6"){
                dispatch(setAnswerByIndexPart6({index: elementIndex, userAnswer: userAnswer, 
                    indexInQuestionList: indexOfQuestionDiferPart12}))
            }

        }
        // userAnswer is local state, useAnswer store user answer for question (String)
    }, [userAnswer])

    return (
        <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden', backgroundColor: "#fff", shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,}}>
            <View style={{height: 50, width: "100%", backgroundColor: "#2196F3"
            , flexDirection: "row", alignItems: 'center', justifyContent: "space-between"
            , paddingHorizontal: 10, }}>
                <View>
                    <Text style={{fontSize: 16, fontWeight: "600", color: "#fff"}}>{numberQuestion} 
                        {(questions?.questionNameEN && questionIsSelected) || (partName != "part1" && partName != "part2") ? `. ${questions?.questionNameEN}` : ""}
                    </Text>
                </View>
                <Pressable style={{marginRight: 10}}
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
                questions?.questionNameVN && questionIsSelected && showContent &&
                <View style={{flexDirection: "row", backgroundColor: "#EAF4FB", paddingVertical: 10}}>
                    <MaterialIcons name="translate" size={20} color="#2A96DB"
                        style={{marginHorizontal: 10, paddingVertical: 8}}
                    />
                    <Text style={{fontSize: 16, color: "#2A96DB", flexShrink: 1, flexWrap: 'wrap'}}>
                        {questions.questionNameVN}
                    </Text>

                </View>
            }
            {
                questions?.explain && questionIsSelected && showContent &&
                <View style={{flexDirection: "row", backgroundColor: "#EAF4FB", paddingVertical: 10}}>
                    <MaterialCommunityIcons name="lightbulb-on-outline"  size={20} color="#2A96DB"
                        style={{marginHorizontal: 10, paddingVertical: 8}}
                    />
                    <Text style={{fontSize: 16, color: "#2A96DB", flexShrink: 1, flexWrap: 'wrap'}}>
                        {questions.explain}
                    </Text>

                </View>
            }
        
            <Animated.View style={{ height: showContent ? null : 0 }}>
                {
                    questions?.listAnswer.map((item,index)=>{
                        let character = getAnswerCharacterByIndex(index)
                        
                        return (
                            <RadioButton 
                                partName={partName}
                                questionIsSelected={questionIsSelected}
                                character={character}
                                key={index}
                                question={item}
                                systemAnswer={questions.correctAnswer}
                                userAnswer={userAnswer}
                                setUserAnswer={setUserAnswer}
                            />
                        )
                    })
                }
               
            </Animated.View>
        </View>
    )
}
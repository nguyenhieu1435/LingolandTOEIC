import { View, Text, Pressable, Animated, LayoutAnimation } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import RadioButton from '../radio_button';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { set } from 'react-hook-form';
import getAnswerCharacterByIndex from '../../utils/getAnswerCharacterByIndex';
import { useDispatch } from 'react-redux';
import { setAnswerByIndex } from '../../redux/slices/part1Training';
import { useSelector } from 'react-redux';
import getSliceNameByPartName from '../../utils/getSliceNameByPartName';



export default function Question({partName, questions, numberQuestion, elementIndex, 
    questionIsSelected, setQuestionSelected}) {
    const dispatch = useDispatch();
    const [showContent, setShowContent] = useState(true);
    const [userAnswer, setUserAnswer] = useState(null);
    const state = useSelector(state => state[getSliceNameByPartName(partName)])


    function handleToggleContent(){
       setShowContent(!showContent);
    }

    useLayoutEffect(()=>{
        if (partName === "part1"){
           
            if (state.questions[elementIndex].yourAnswer && elementIndex >= 0 && elementIndex < state.questions.length){
                setUserAnswer(state.questions[elementIndex].yourAnswer);
            }
        }
    }, [elementIndex])
   

    useEffect(()=>{
        if (userAnswer){
            setQuestionSelected(true);
            if (partName === "part1"){
                dispatch(setAnswerByIndex({index: elementIndex, userAnswer: userAnswer}))
            }
        }
    }, [userAnswer])

    return (
        <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden', backgroundColor: "#fff"}}>
            <View style={{height: 50, width: "100%", backgroundColor: "#2196F3"
            , flexDirection: "row", alignItems: 'center', justifyContent: "space-between"
            , paddingHorizontal: 10, }}>
                <Text style={{fontSize: 16, fontWeight: "600", color: "#fff"}}>{numberQuestion}</Text>
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
        
            <Animated.View style={{ height: showContent ? null : 0 }}>
                {
                    questions?.listAnswer.map((item,index)=>{
                        let character = getAnswerCharacterByIndex(index)
                        
                        return (
                            <RadioButton 
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
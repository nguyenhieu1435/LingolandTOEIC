import { View, Text, Pressable } from 'react-native'


import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

export default function RadioButton({character, question, systemAnswer, userAnswer, setUserAnswer, questionIsSelected,
    partName
    }) {

    function handleSelectAnswer(){
        if (userAnswer || questionIsSelected){
            return;
        }

        setUserAnswer(question.name)
    }
    function getColorForAnswer(defaultColor){
        
        if (question.name != userAnswer && question.name != systemAnswer){
            return defaultColor;
        }
        if (question.name === systemAnswer){
            return "#4BB543";
        }
        return "#F34336"
    }
  return (
    <View style={{width: "100%",flexDirection: "row", alignItems: "flex-start", paddingBottom: 20}}
    >
        <Pressable
            onPress={handleSelectAnswer}
            style={{padding: 15}}
        >
            {
                question.name === userAnswer
                ?
                <Ionicons name="radio-button-on" size={24} color="#0099FF" />
                :
                <Ionicons name="radio-button-off" size={24} color="#666" />
            }
           
        </Pressable>
        <View style={{flex: 1, paddingTop: 15}}>
            <View style={{flexDirection: "row", width: "100%", flexWrap: "nowrap"}}
                
            >
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{fontSize: 17, fontWeight: "500", color: (questionIsSelected || userAnswer) ?  getColorForAnswer("#000") : "#000"}}>{character}</Text>
                    {
                        userAnswer || questionIsSelected
                        ?
                        <Text style={{fontSize: 17, color: getColorForAnswer("#333"), fontWeight: "500"}}>{". "+ question.name}</Text>
                        :
                        partName != "part1" && partName != "part2"
                        ?
                        <Text style={{fontSize: 17, color: "#333", fontWeight: "500"}}>{". "+ question.name}</Text>
                        :
                        <Text></Text>
                    }
                </View>
                {
                    !userAnswer
                    ?
                    <View style={{width: 24}}></View>
                    :
                    userAnswer != question.name
                    ?
                    <View style={{width: 24}}></View>
                    :
                    <AntDesign name={userAnswer == systemAnswer ? "check" : "close"} 
                    size={24} color={userAnswer == systemAnswer ? "#59BB51" : "#F44336"}
                    style={{marginRight: 15, width: 24}}/>
                }
            </View>
            {
                userAnswer || questionIsSelected
                ?
                <View style={{backgroundColor: "#EBF5FC", borderRadius: 15, marginTop: 10, marginRight: 15}}>
                    {
                        question.explore 
                        ?
                        <View style={{ flexDirection: "row", alignItems: "flex-start", }}>
                            <MaterialIcons name="translate" size={18} color="#188DD8" 
                                style={{padding: 15}}
                            />
                            <Text style={{flex: 1,color: "#3FA0DE", fontWeight: "500", fontSize: 17 , paddingVertical: 12, paddingRight: 20}}
                            >{question.explore}</Text>
                    

                        </View>
                        :
                        <View></View>
                    }
                    {
                        question.vocabulary
                        ?
                        <View style={{flexDirection: "row"}}>
                            <MaterialIcons name="highlight" 
                                size={18} color="#188DD8" 
                                style={{paddingHorizontal: 15, paddingVertical: 5}}
                            />
                            <Text style={{flex: 1,color: "#3FA0DE", fontSize: 17,fontWeight: "500",  paddingVertical: 5}}>{
                                question.vocabulary.map((item, index)=>{
                                    if (!item.eng){
                                        return item.viet
                                    }
                                    return `${item.eng} (${item.type}) ${item.viet}`
                                }).join("; ")

                            }</Text>
                        </View>
                        :
                        <View></View>
                    }
                </View>
                :
                <View></View>
            }
        </View>
    </View>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import getAnswerCharacterByIndex from '../../utils/getAnswerCharacterByIndex'

export default function ResultModal({questions, showModal, setShowModal, navigation, setIsPauseAudio, setIsPause}) {

    function getColorForAnswer(question, name){
        if (!question.yourAnswer){
            return "#607D8B";
        }
        if (name == question?.correctAnswer){
            return "#4CAF50";
        } else if (name == question?.yourAnswer && name != question?.correctAnswer){
            return "#F44336";
        } else {
            return "#607D8B";
        }

    }
  return (

    <Modal style={{alignItems: "center", justifyContent: "center", marginHorizontal: "auto"}}
        animationType="slide"
        transparent={true}
        visible={showModal}
        
    >
        <View style={{width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center"}}>
            <View style={{marginTop: 50, width: "90%", height: "90%", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 15,}}>
                <ScrollView style={{flex: 1, }}
                    stickyHeaderIndices={[0]}
                >
                    <View>
                        <Text style={{fontWeight: "600", textAlign: "center", fontSize: 17, paddingVertical: 15, shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            shadowOpacity:  0.4,
                            shadowRadius: 3,
                            elevation: 5}}
                        >Danh sách câu hỏi</Text>
                    </View>
                    {
                        questions && questions.map((item, index) => {
                            return (
                                <Pressable key={index} style={{flexDirection: "row", alignItems: "center"
                                , justifyContent: "space-around", paddingVertical: 12, borderBottomWidth: 1}}>
                                    <Text style={{fontSize: 16, fontWeight: "600"}}>{item.id}</Text>
                                    {
                                        item.listAnswer.map((answer, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: "row", alignItems: "center"}}>
                                                    <View 
                                                    style={{width: 30, height: 30, borderRadius: 50
                                                        , backgroundColor: getColorForAnswer(item, answer.name), alignItems: "center", justifyContent: "center"}}
                                                    >
                                                        <Text style={{color: "#fff", fontWeight: "500", fontSize: 16}}>
                                                            {getAnswerCharacterByIndex(index)}
                                                        </Text>
                                                        
                                                    </View>
                                                    {
                                                        !item.yourAnswer
                                                        ?
                                                        <View style={{width: 20}}></View>
                                                        :
                                                        item.yourAnswer != answer.name
                                                        ?
                                                        <View style={{width: 20}}></View>
                                                        :
                                                        item.yourAnswer === item.correctAnswer && answer.name === item.correctAnswer
                                                        ?
                                                        <AntDesign name={"check"} 
                                                            size={20} color={"#59BB51"}
                                                            style={{width: 20}}/>
                                                        :
                                                        <AntDesign name={"close"} 
                                                            size={20} color={"#F44336"}
                                                            style={{width: 20}} 
                                                        /> 
                                                    }
                                                </View>
                                            )

                                        })
                                    }
                                </Pressable>
                            )
                        })
                    }
                    
                </ScrollView>
                <View style={{ width: "100%", marginBottom: 15, flexDirection: "row", gap: 10}}>
                    <Pressable style={{width: "48%"}}
                        onPress={()=> setShowModal(false)}
                    >
                        <Text style={{textAlign: "center", fontSize: 16, backgroundColor: "#fff", paddingVertical: 10
                        , borderRadius: 10, borderWidth: 1, borderColor: "#21BA57", color:"#21BA57"}}
                        >
                            Hủy
                        </Text>
                    </Pressable>
                    <Pressable style={{width: "48%"}}
                        onPress={()=> {
                            setIsPauseAudio(true);
                            setShowModal(false)
                            navigation.navigate("StatisticTraining", {
                                results: questions,
                            })
                        }}
                    >
                        <Text style={{textAlign: "center", fontSize: 16, backgroundColor: "#21BA57", paddingVertical: 10
                        , borderRadius: 10, borderWidth: 1, borderColor: "#21BA57", color:"#fff"}}
                        >
                            Nộp bài
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
  )
}
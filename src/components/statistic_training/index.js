import { useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Pressable } from 'react-native';
import { PieChart } from "react-native-gifted-charts";


export default function StatisticTraining({navigation, route}) {
    const [pieData, setPieData] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [notAnswer, setNotAnswer] = useState(0);


    useEffect(()=>{
        if (route.params?.results){
            const results = route.params.results;
            const total = results.length;
            let correctAnswer = 0;
            let wrongAnswer = 0;
            let notAnswer = 0;

            results.forEach((item)=>{
                if (item.yourAnswer == null){
                    notAnswer++;
                } else if (item.yourAnswer == item.correctAnswer){
                    correctAnswer++;
                } else {
                    wrongAnswer++;
                }
            })
            setCorrectAnswer(correctAnswer);
            setWrongAnswer(wrongAnswer);
            setNotAnswer(notAnswer);

            let arr = [];
            if (correctAnswer > 0){
                arr.push({value: Math.floor((correctAnswer/total)*100), color: '#4BB543'
                , text: `${Math.floor((correctAnswer/total)*100)}%`})
            }
            if (wrongAnswer > 0){
                arr.push({value: Math.floor((wrongAnswer/total)*100), color: '#F44336'
                , text: `${Math.floor((wrongAnswer/total)*100)}%`})
            }
            if (notAnswer > 0){
                arr.push({value: Math.floor((notAnswer/total)*100), color: '#607D8B'
                , text: `${Math.floor((notAnswer/total)*100)}%`})
            }

            setPieData(arr)
        }

    }, [route.params])

    // const pieData = [
    //     {value: 54, color: '#F44336', text: '54%'},
    //     {value: 40, color: '#4BB543', text: '30%'},
    //     {value: 20, color: '#607D8B', text: '26%'},
    // ];

    return (
        <View style={{flex: 1, backgroundColor: "#EFF1F4"}}>
            <StatusBar/>
            <SafeAreaView style={{flex: 1, padding: 10}}>
                <View style={{flex: 7,borderRadius: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>
                    <PieChart
                            donut
                            showText
                            textColor="#fff"
                            radius={115}
                            textSize={15}
                            textBackgroundRadius={26}
                            strokeWidth={2}
                            strokeColor="#fff"
                            data={pieData}
                        />

                    <View style={{marginTop: 30}}>
                        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
                            <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: "#4BB543"}}></View>
                            <Text style={{ fontSize: 17, marginLeft: 10}}>Đúng {correctAnswer} câu hỏi</Text> 
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
                            <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: "#F44336"}}></View>
                            <Text style={{ fontSize: 17, marginLeft: 10}}>Sai {wrongAnswer} câu hỏi</Text> 
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
                            <View style={{width: 20, height: 20, borderRadius: 50, backgroundColor: "#607D8B"}}></View>
                            <Text style={{ fontSize: 17, marginLeft: 10}}>Không chọn {notAnswer} câu hỏi</Text> 
                        </View>
                       
                    </View>
                    <Pressable style={{width: "100%", alignItems :"center", marginTop: 10}}
                        onPress={()=>navigation.goBack()}
                    >
                            <Text
                                style={{width: "95%", textAlign: "center", color: "#fff", backgroundColor: "#1DB954"
                                , fontSize: 18, paddingVertical: 10, borderRadius: 10, fontWeight: "500"}}
                            
                            >Xem lại</Text>
                    </Pressable>
                </View>

                <View style={{flex: 3}}>
                    
                </View>
            </SafeAreaView>       
        </View>
    )
}
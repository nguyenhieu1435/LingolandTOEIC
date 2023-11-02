import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function AudioCustom({uri}) {
    const [isPause, setIsPause] = useState(false);
    const [audio, setAudio]= useState(null)
    const positionBottomModelSpeed = useRef(new Animated.Value(-200)).current;
    const positionRightModelSpeed2 = useRef(new Animated.Value(-200)).current;
    const [speedCurrent, setSpeedCurrent] = useState(1);    
    const [toggleSpeed, setToggleSpeed] = useState(false);
    const refIdAudio = useRef(0);
    const [currentSecond, setCurrentSecond] = useState(0);
    const [percentProgress, setPercentProgress] = useState(0);

    useEffect(()=>{
        const fnSetUp = async () => {
            const {sound, status} = await Audio.Sound.createAsync({uri: uri});
            sound.setIsLoopingAsync(false);
            sound.setVolumeAsync(1);
            sound.setRateAsync(speedCurrent);
        
            while(true){
                if (status.isLoaded){
                    break;
                }
            }
           
            sound.playAsync();
            setAudio(sound);
        }
        fnSetUp();
    },[])


    useEffect(()=>{

        if (audio){
            audio.setRateAsync(speedCurrent);
        }

    }, [speedCurrent])


    useEffect(()=>{
        if (audio){
            refIdAudio.current = setInterval(()=>{
                audio.getStatusAsync().then((status)=>{
                    if (status.isPlaying){
                        
                        setPercentProgress(Math.floor((status.positionMillis / status.durationMillis)*100));
                        setCurrentSecond(Math.floor((status.positionMillis-0) / 1000));
                    } else {
                        setCurrentSecond(0);
                        setPercentProgress(0);
                        setIsPause(true);
                        clearInterval(refIdAudio.current);
                    }
                })
            }, 1000)
        }
        return ()=> clearInterval(refIdAudio.current);
    }, [audio, isPause])

   
    function handleToggleSpeed(){
        if (toggleSpeed){
            Animated.timing(positionBottomModelSpeed, {
                toValue: -200,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(positionRightModelSpeed2, {
                toValue: -200,
                duration: 0,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(positionBottomModelSpeed, {
                toValue: 10,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(positionRightModelSpeed2, {
                toValue: 10,
                duration: 0,
                useNativeDriver: false,
            }).start();
        }
        setToggleSpeed(!toggleSpeed);
    }
    function handleRenderCurrentSecond(){
        if (!audio){
            return "00:00";
        }
       
        let minutes = Math.floor(currentSecond/60);
        let minutesStr = "";
        if (minutes == 0){
            minutesStr = "00"
        } else if (minutes < 10){
            minutesStr = "0" + minutes;
        } else {
            minutesStr = minutes + "";
        }
        let secondRemain = Math.floor(currentSecond - (minutes*60));
        let secondStr = "";
        if (secondRemain == 0){
            secondStr = "00";
        } else if (secondRemain < 10){
            secondStr = "0" + secondRemain;
        } else {
            secondStr = secondRemain + "";
        }
       
        return minutesStr+":"+secondStr;
    }

    return (
        <View style={{position: 'relative', backgroundColor: "#fff", flexDirection: "row", alignItems: "center"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Pressable style={{paddingVertical: 5, paddingHorizontal: 8}}
                    onPress={()=> {
                        audio.getStatusAsync().then((status)=>{
                            audio.setPositionAsync(status.positionMillis - 5000);
                        });
                        
                    }}
                >
                    <MaterialIcons name="replay-5" size={30} color="black" />
                </Pressable>
                <Pressable style={{paddingVertical: 5, paddingHorizontal: 10}}
                    onPress={()=> {
                        if (isPause){
                            audio.replayAsync();
                        } else {
                            audio.pauseAsync();
                        
                        }
                        setIsPause(!isPause);
                    }}
                >
                    {
                        isPause ? (
                            <Ionicons name="play" size={24} color="black" />
                        ) : (
                            <Ionicons name="pause" size={24} color="black" />
                        )
                    }
                
                </Pressable>
                <Pressable style={{paddingVertical: 5, paddingHorizontal: 8}}
                    onPress={()=> {
                        audio.getStatusAsync().then((status)=>{
                            audio.setPositionAsync(status.positionMillis + 5000);
                        });
                        
                    }}
                >
                    <MaterialIcons name="forward-5" size={30} color="black" />
                </Pressable>
            </View>
            <View style={{flex: 1}}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1, paddingLeft: 30}}>
                    <View style={{flexDirection: "row", alignItems: "center", position: "relative", flex: 8}}>
                        <View style={{width: "100%", height: 3, backgroundColor: "#A6D3F0", position: "absolute"}}>

                        </View>
                        <View style={{width: `${percentProgress}%`, position: "relative"}}>
                            <Text style={{right: -5, top: -10,position: "absolute", color: "#fff", paddingLeft: 5
                            , backgroundColor: "#0081D4", paddingVertical: 2, paddingHorizontal: 5, borderRadius: 5
                            , fontSize: 13, fontWeight:"500" , zIndex: 2, width: 45}}
                            
                            >{handleRenderCurrentSecond()}</Text>
                            <View style={{width: '100%', height: 3, backgroundColor: "#0081D4"}}></View>
                        </View>

                    </View>
                    <Pressable
                        onPress={handleToggleSpeed}
                        style={{flex: 2, marginLeft: 5}}
                    >
                        <Text style={{fontSize: 17, textAlign: "center"}}>{speedCurrent}x</Text>
                    </Pressable>
                
                </View>
            </View>
            <Animated.View style={{position: "absolute", width: 120, right: positionRightModelSpeed2, bottom: positionBottomModelSpeed
            , backgroundColor: "#FFF", shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,
                paddingHorizontal: 25, paddingVertical: 20 
                }}>
                {
                    [1.5, 1.25, 1.15, 1, 0.85, 0.75, 0.65].map((item, index)=>{
                        return (
                            <Pressable
                                onPress={()=>  {
                                    setSpeedCurrent(item);
                                    handleToggleSpeed();
                                
                                }}
                                key={index}
                            >
                                <Text style={{fontSize: 16, paddingVertical: 15
                                    , color: speedCurrent == item ? "#2DBD60" : "#000"}}>{item}x</Text>
                            </Pressable>
                        )
                    })
                }
               

            </Animated.View>
        </View>
    )
}
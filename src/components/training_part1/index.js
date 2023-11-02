import { View, Text, StatusBar, SafeAreaView, ScrollView, Pressable, Image, Animated, LayoutAnimation } from 'react-native'
import styles from './styles'
import { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import RadioButton from '../radio_button';
import { Audio } from 'expo-av';
import AudioCustom from '../audio_speaker';




export default function TrainingPart1() {
   
    const [showContent, setShowContent] = useState(true);
    const [heightContent, setHeightContent ] = useState(null);


    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   

   
  return (
    <View style={{flex: 1}}>
        <StatusBar/>
        <SafeAreaView style={styles.container}>
            <ScrollView
                stickyHeaderIndices={[0]}
            >
                <View style={{backgroundColor: "#fff"}}>
                    <View style={styles.flexRowHeader}>
                        <View style={{width: "20%"}}>
                            <Ionicons name="arrow-back" size={24} color="black" 
                                style={{paddingHorizontal: 20}}
                            />
                        </View>
                        <View style={{flexGrow: 1}}>
                            <Text style={{fontSize: 17, fontWeight: "500"}}>Photographs 01</Text>
                            <Text style={{color: "#20BB55"}}>Câu hỏi 1 / 1-6</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Pressable
                                style={{marginRight: 15}}
                            >
                                
                                <MaterialIcons name="settings" size={24} color="black" />
                            </Pressable>
                            <Pressable style={{marginRight: 15}}>
                                <FontAwesome5 name="list-ol" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <View style={{padding: 10, borderRadius: 15, backgroundColor: "#fff", marginTop: 15}}>
                        <Image
                            source={{uri: "https://res.cloudinary.com/dmma7axts/image/upload/v1698832740/de1-part1/gdc4nr4a02dxoqikinpg.png"}}
                            style={{width: "100%", height: 250}}
                        />
                    </View>
                    <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden', backgroundColor: "#fff"}}>
                        <View style={{height: 50, width: "100%", backgroundColor: "#2196F3"
                        , flexDirection: "row", alignItems: 'center', justifyContent: "space-between"
                        , paddingHorizontal: 10, }}>
                            <Text style={{fontSize: 16, fontWeight: "600", color: "#fff"}}>1</Text>
                            <Pressable style={{marginRight: 10}}
                                onPress={()=>{
                                    if (showContent){
                                      
                                        setHeightContent(0);
                                        
                                    } else {
                                        
                                        setHeightContent(null)
                                    }
                                    setShowContent(!showContent);
                                }}
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
                      
                        <View style={{height: heightContent}}>
                            <RadioButton/>
                            <RadioButton/>
                            <RadioButton/>
                            <RadioButton/>

                        </View>


                    </View>
                </View>
              
            </ScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#fff", padding: 10}}>
                <AudioCustom
                    uri={ "https://res.cloudinary.com/dmma7axts/video/upload/v1698832738/de1-part1/r5xvqjadgjw8fezzgtcg.mp3"}
                />
               
            </View>
           
            {/* <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#fff", padding: 10, flexDirection: "row", alignItems: "center"}}>
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
               

            </Animated.View> */}
        </SafeAreaView>
    </View>
  )
}
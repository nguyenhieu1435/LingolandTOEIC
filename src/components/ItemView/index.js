import { Text, View, Image,  Pressable } from "react-native";
import { Foundation } from '@expo/vector-icons';
import styles from "./style";


export const Item = function ({name , header, numberQuestion, capacity, vip, isActive, uri, navigation}) {


    function handleChoosePart(){
        if (name === "Part 1"){
            
            navigation.navigate("TrainingPart1", {
                name: name,
            })
        }
    }

    return (
        <Pressable style={[styles.container]}
            onPress={()=> handleChoosePart()}
        >
            <Text style={styles.header}>{header}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
                <Text style={styles.numberQuestion}>{numberQuestion}</Text>
                <Text style={styles.question}>câu hỏi -</Text>
                <Text style={styles.capacity}>{capacity}</Text>
            </View>
            {isActive ? (
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 30 }}>
                        <Foundation name="graph-horizontal" size={24} color="#000" 
                            style={{transform: "rotate(-90deg)"}}
                        />
                    </View>
                    <Text
                        style={{
                            lineHeight: 30,
                            fontSize: 17,
                            fontWeight: 400,
                            paddingHorizontal: 10,
                            color: "#858585",
                        }}
                    >
                        Điểm cao: 2 / {numberQuestion}
                    </Text>
                </View>
            ) : null}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        {vip ? (
                            <Image
                                source={require("../../../assets/vipicon.png")}
                                style={{ width: 30, height: 30, marginRight: 7 }}
                                resizeMode="contain"
                            />
                        ) : null}
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.textBox}>New Format</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Pressable style={{ paddingHorizontal: 10 }}>
                        <Image
                            source={require("../../../assets/playicon.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                    <Pressable>
                        <Image
                            source={require("../../../assets/lockicon.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

import { Text, View, Image,  Pressable} from "react-native";
import { Foundation } from '@expo/vector-icons';
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";
import { getPart2Questions } from "../../redux/slices/part2Training";
import { getPart1Questions } from "../../redux/slices/part1Training";
import { getPart3Questions } from "../../redux/slices/part3Training";
import { getPart4Questions } from "../../redux/slices/part4Training";
import { getPart5Questions } from "../../redux/slices/part5Training";
import { getPart6Questions } from "../../redux/slices/part6Training";
import { getPart7Questions } from "../../redux/slices/part7Training";

export const Item = function ({name , header, numberQuestion, capacity, vip, isActive, uri, navigation}) {
    const dispatch = useDispatch()
    
    

    function handleChoosePart(){
        if (name === "Part 1"){
            dispatch(setLoading(true));
            dispatch(getPart1Questions({uri: uri})).unwrap()
            .then(resp=>{
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));

                    navigation.navigate("TrainingPart1", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                } 
               
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 2"){
            dispatch(setLoading(true));
            dispatch(getPart2Questions({uri: uri})).unwrap()
            .then(resp=>{
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                   
                    navigation.navigate("TrainingPart2", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                } 
               
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 3"){
            dispatch(setLoading(true));
            dispatch(getPart3Questions({uri: uri})).unwrap()
            .then(resp=>{
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                    navigation.navigate("TrainingPart3", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                }
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 4"){
            dispatch(setLoading(true));
            dispatch(getPart4Questions({uri: uri})).unwrap()
            .then(resp=>{
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                    navigation.navigate("TrainingPart4", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                }
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 5"){
            dispatch(setLoading(true));
            dispatch(getPart5Questions({uri: uri})).unwrap()
            .then(resp => {
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                    navigation.navigate("TrainingPart5", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                }
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 6"){
            dispatch(setLoading(true));
            dispatch(getPart6Questions({uri: uri})).unwrap()
            .then(resp => {
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                    navigation.navigate("TrainingPart6", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                }
            })
            .catch(err => setLoading(false))
        } else if (name === "Part 7"){
            dispatch(setLoading(true));
            dispatch(getPart7Questions({uri: uri})).unwrap()
            .then(resp => {
                if (Array.isArray(resp)){
                    dispatch(setLoading(false));
                    navigation.navigate("TrainingPart7", {
                        header: header,
                        name: name,
                        elementIndex: resp?.length > 0 ? 0 : null,
                    })
                }
            })
            .catch(err => setLoading(false))
        }
    }

    return (
        <View style={{width: "100%", alignItems: "center"}}>
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
                                style={{transform: [{rotate: "-90deg"}]}}
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
            
        </View>
    );
};

import { Text } from "react-native";
import { View } from "react-native";
import { styles } from "./style";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Image } from "react-native";

export const Item = function ({ header, numberQuestion, capacity, vip, isActive }) {
    return (
        <TouchableOpacity style={[styles.container]}>
            <Text style={styles.header}>{header}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
                <Text style={styles.numberQuestion}>{numberQuestion}</Text>
                <Text style={styles.question}>câu hỏi -</Text>
                <Text style={styles.capacity}>{capacity}</Text>
            </View>
            {isActive ? (
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 30 }}>
                        <Image
                            source={require("../../../assets/graph.png")}
                            style={{ width: 28, height: 28 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={{
                            lineHeight: 30,
                            fontSize: 17,
                            fontWeight: 500,
                            paddingHorizontal: 10,
                            color: "#858585",
                        }}
                    >
                        Điểm cao: 1 / {numberQuestion}
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
                    <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                        <Image
                            source={require("../../../assets/playicon.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../../../assets/lockicon.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

import { View, Text, StatusBar, SafeAreaView, ScrollView, Image, Pressable } from "react-native";
import styles from "./style";
import TraningPartItem from "../traningpartitem";
import { dataViewPart01 } from "../../data/dataViewPart1";
import { dataViewPart02 } from "../../data/dataViewPart2";
import { dataViewPart03 } from "../../data/dataViewPart3";
import { dataViewPart04 } from "../../data/dataViewPart4";
import { dataViewPart05 } from "../../data/dataViewPart5";
import { dataViewPart06 } from "../../data/dataViewPart6";
import { dataViewPart07 } from "../../data/dataViewPart7";

export default function Training({ navigation }) {
    const data = [
        dataViewPart01,
        dataViewPart02,
        dataViewPart03,
        dataViewPart04,
        dataViewPart05,
        dataViewPart06,
        dataViewPart07,
    ];
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, position: "relative" }} stickyHeaderIndices={[0]}>
                    <View>
                        <View style={styles.header}>
                            <View style={styles.boxUserInfo}>
                                <Image
                                    source={require("../../../assets/defaultUserAvatar.png")}
                                    resizeMode="contain"
                                    style={styles.avatarImage}
                                />
                                <Text style={styles.titleUsername}>User name</Text>
                            </View>
                            <Pressable style={styles.boxUpgradePremium}>
                                <Image
                                    source={require("../../../assets/iconUpgradePremium.png")}
                                    resizeMode="contain"
                                    style={styles.iconUpgradePremium}
                                />
                                <Text style={{ color: "#1DB954", fontSize: 13, fontWeight: "500" }}>
                                    Nâng cấp
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 10, width: "100%", marginVertical: 15}}>
                        <Image
                            source={require("../../../assets/background-traning.png")}
                            style={{width: "100%", height: 180, borderRadius: 15}}
                            resizeMode="contain"
                        />
                    </View>
                    <Pressable style={styles.buttonGetListDownloaded}>
                        <Image
                            source={require("../../../assets/iconDownload.png")}
                            resizeMode="contain"
                            style={styles.iconDownload}
                        />
                        <Text style={{ fontSize: 15, fontWeight: 500, color: "#4F9CF0" }}>
                            Các bài đã tải
                        </Text>
                    </Pressable>

                    <View style={{ marginTop: 25, marginBottom: 15 }}>
                        <Text style={styles.titleCategory}>Luyện Nghe</Text>
                        <View
                            style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
                        >
                            <TraningPartItem
                                title="Mô tả hình ảnh"
                                name="Part 1"
                                backgroundColor={["#7C5FFB", "#9c86fb"]}
                                iconPath={require("../../../assets/iconTrainingPart1.png")}
                                data={data[0]}
                                navigation={navigation}
                            />
                            <TraningPartItem
                                title="Hỏi và tả lời"
                                name="Part 2"
                                backgroundColor={["#7C5FFB", "#9c86fb"]}
                                iconPath={require("../../../assets/iconTraningPart2.png")}
                                data={data[1]}
                                navigation={navigation}
                            />
                            <TraningPartItem
                                title="Đoạn hội thoại"
                                name="Part 3"
                                backgroundColor={["#7C5FFB", "#9c86fb"]}
                                iconPath={require("../../../assets/iconTraningPart3.png")}
                                data={data[2]}
                                navigation={navigation}
                            />
                            <TraningPartItem
                                title="Bài nói chuyện"
                                name="Part 4"
                                backgroundColor={["#7C5FFB", "#9c86fb"]}
                                iconPath={require("../../../assets/iconTraningPart4.png")}
                                data={data[3]}
                                navigation={navigation}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 25, marginBottom: 15 }}>
                        <Text style={styles.titleCategory}>Luyện Đọc</Text>
                        <View
                            style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
                        >
                            <TraningPartItem
                                title="Hoàn thành câu"
                                name="Part 5"
                                backgroundColor={["#4f9cef", "#65a8f1"]}
                                iconPath={require("../../../assets/iconTraningPart5.png")}
                                data={data[4]}
                                navigation={navigation}
                            />
                            <TraningPartItem
                                title="Hoàn thành đoan văn"
                                name="Part 6"
                                backgroundColor={["#4f9cef", "#65a8f1"]}
                                iconPath={require("../../../assets/iconTraningPart6.png")}
                                data={data[5]}
                                navigation={navigation}
                            />
                            <TraningPartItem
                                title="Đọc hiểu"
                                name="Part 7"
                                backgroundColor={["#4f9cef", "#65a8f1"]}
                                iconPath={require("../../../assets/iconTraningPart7.png")}
                                data={data[6]}
                                navigation={navigation}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 25, marginBottom: 15 }}>
                        <Text style={styles.titleCategory}>Kiểm tra</Text>
                        <View
                            style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
                        >
                            <TraningPartItem
                                title="Các part của phần nghe"
                                name="Phần nghe"
                                widthBoxIcon="70%"
                                backgroundColor={["#304A61", "#304A61"]}
                                iconPath={require("../../../assets/iconTrainingAnother1.png")}
                            />
                            <TraningPartItem
                                title="Các part của phần đọc"
                                name="Phần đọc"
                                widthBoxIcon="70%"
                                backgroundColor={["#304A61", "#304A61"]}
                                iconPath={require("../../../assets/iconTrainingAnother2.png")}
                            />
                            <TraningPartItem
                                title="Các part của bài kiểm tra"
                                name="Bài hoàn chỉnh"
                                widthBoxIcon="100%"
                                backgroundColor={["#304A61", "#304A61"]}
                                iconPath={require("../../../assets/iconTrainingAnother3.png")}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "F1F2F4",
        flex: 1,
    },
    listItem: {
        alignItems: "center",
    },
});

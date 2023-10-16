import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentCenter: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    titleRemindTime: {
        fontSize: 18,
        textAlign: "center",
        color: "#666",
        marginVertical: 10
    },
    toggleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    timePickerText: {
        fontSize: 18,
        color: "#000",
        paddingBottom: 12,
        paddingHorizontal: 15,
        borderColor: "#5AA6CD",
        borderWidth: 3,
        borderRadius: 10,
        width: "100%",
        paddingTop: 19
    },
    textSubmitRemind:{
        width: "55%",
        backgroundColor: "#48B759",
        borderRadius: 20,
        color: "#fff",
        textAlign: "center",
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: "500"
    }
})
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        borderBottomWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: "space-evenly",
        width: "95%",
        alignContent: "center",
        marginTop: 10,
    },
    header: {
        fontWeight: "bold",
        fontSize: 17,
    },
    numberQuestion: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#1EBA51",
        lineHeight: 40,
    },
    question: {
        fontWeight: "400",
        fontSize: 17,
        color: "#858585",
        lineHeight: 40,
        paddingHorizontal: 5,
    },
    capacity: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#1EBA51",
        lineHeight: 40,
    },
    box: {
        backgroundColor: "#20BB55",
        height: 30,
        borderRadius: 30,
    },
    textBox: {
        paddingHorizontal: 15,
        lineHeight: 30,
        color: "#ffff",
    },
});

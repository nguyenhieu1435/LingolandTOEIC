import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        margin: 0,
        backgroundColor: "blue",
        width: "100%",
        height: 90,
        flexDirection: "row",
        backgroundColor: "#ffff",
        borderBottomWidth: 4,
        borderBottomColor: "#77757D",
        borderTopColor: "#ffff",
        borderTopWidth: 3,
    },
    left: {
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    right: {
        paddingLeft: 15,
        justifyContent: "center",
    },
    lblTop: {
        fontWeight: "bold",
        fontSize: 25,
        lineHeight: 40,
    },
    lblBottom: {
        fontWeight: 400,
        fontSize: 15,
    },
});

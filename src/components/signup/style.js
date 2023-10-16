import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e9ece3",
        alignItems: "center",
        justifyContent: "center"
    },
    titleSignIn: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#000",
        marginTop: 10,
        marginBottom: 40
    },
    boxTextInput: {
        backgroundColor: "#fff",
        marginBottom: 40,
        borderRadius: 30,
        position: "relative",
    },
    textInput: {
        width: 300,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        paddingRight: 50
    },
    btnSubmitLogin:{ 
        marginTop: 20,
        backgroundColor: "#48B759",
        color: "#fff",
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 15,
    },
    errorMsg: {
        color: "red",
        position: "absolute",
        bottom: -20,
        left: 20
    }
})
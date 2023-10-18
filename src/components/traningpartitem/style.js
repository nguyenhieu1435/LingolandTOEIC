import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {width: "50%", paddingHorizontal: 10},
    containerChild: {
        width: "100%", paddingVertical: 10
    , borderRadius: 12 ,backgroundColor: "#fff"
    , paddingHorizontal: 10, marginBottom: 20,
    shadowColor: "#000",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.1,
        shadowRadius:2,
        elevation: 5
}
})

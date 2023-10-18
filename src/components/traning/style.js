import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f1f6"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        top: 0,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    boxUserInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatarImage:{
        width: 35,
        height: 35, 
        borderRadius: 100
    },
    titleUsername:{
        fontWeight: "500",
        fontSize: 15,
        marginLeft: 4,
    },
    iconUpgradePremium:{
        width: 35,
        height: 35,
        borderRadius: 100
    },
    boxUpgradePremium: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderWidth: 2, 
        borderColor: "#48B759",
        borderRadius: 8,
        paddingRight: 14,
        
    },
    iconDownload:{
        width: 40,
        height: 40,
        borderRadius: 100,
        marginHorizontal: 10

    },
    buttonGetListDownloaded:{
        marginTop: 20,
        borderRadius: 20,
        marginHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 4,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    titleCategory: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20,
        marginBottom: 6
    }
})
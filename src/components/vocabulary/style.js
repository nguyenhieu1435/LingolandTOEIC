import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1
    },
    headerBox:{
        paddingHorizontal: 10,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },  
    titleComponent:{
        fontSize: 24,
        fontWeight: "700",

    },
    titleBody:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 20
    },
    boxVocabulary:{
        flexDirection: "row",
        alignItems :"center",
        
    },
    containerVoca:{
        position: "relative",
        borderRadius: 25,
        overflow: "hidden"
    },
    childVoca:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingVertical: 10
    },
    emptyData:{
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 35
    },
    lingolandVoca:{
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    }
})
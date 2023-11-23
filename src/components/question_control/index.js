
import { View, Text,Pressable } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function QuestionControl(
    {handlePreviousQuestion,  setAllQuestionSelected, handleNextQuestion, allQuestionSelected}
) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10,
        marginTop: 10,
      }}
    >
      <Pressable style={{ padding: 15 }} onPress={handlePreviousQuestion}>
        <Fontisto name="angle-left" size={20} color="black" />
      </Pressable>
      <Pressable style={{ padding: 15 }}>
        <Feather name="heart" size={20} color="black" />
      </Pressable>
      <Pressable
        style={{ padding: 15 }}
        onPress={() => setAllQuestionSelected()}
      >
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={24}
          color={allQuestionSelected ? "#1DB954" : "black"}
        />
      </Pressable>
      <Pressable style={{ padding: 15 }}>
        <Feather name="alert-triangle" size={20} color="black" />
      </Pressable>
      <Pressable style={{ padding: 15 }} onPress={handleNextQuestion}>
        <Fontisto name="angle-right" size={20} color="black" />
      </Pressable>
    </View>
  );
}

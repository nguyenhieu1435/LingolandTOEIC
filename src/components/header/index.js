import { View } from "react-native";
import { styles } from "./style";
import { Image } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";

export const Header = function ({ lblTop, lblBottom, navigation, route }) {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.left}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Image
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                    source={require("../../../assets/backicon.png")}
                />
            </Pressable>
            <View style={styles.right}>
                <Text style={styles.lblTop}>{lblTop}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.lblBottom}>{lblBottom}</Text>
                </View>
            </View>
        </View>
    );
};

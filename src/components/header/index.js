import { View } from "react-native";
import { styles } from "./style";
import { Image } from "react-native";
import { Text } from "react-native";
import { BlurView } from "expo-blur";

export const Header = function ({ lblTop, lblBottom }) {
    return (
        <View blurType="light" style={styles.container}>
            <View style={styles.left}>
                <Image
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                    source={require("../../../assets/backicon.png")}
                />
            </View>
            <View style={styles.right}>
                <Text style={styles.lblTop}>{lblTop}</Text>
                <View style={styles.bottomContainer}>
                    <BlurView blurType="light" style={styles.bottomBlur}>
                        <Text style={styles.lblBottom}>{lblBottom}</Text>
                    </BlurView>
                </View>
            </View>
        </View>
    );
};

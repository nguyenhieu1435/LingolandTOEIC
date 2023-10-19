import { SafeAreaView } from "react-native";
import { styles } from "./style";
import { Header } from "../../components/header";
import { Item } from "../../components/ItemView";
import { FlatList } from "react-native";
import { View } from "react-native";
import { dataView } from "./dataView";

export const Part03 = function () {
    const data = dataView;
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <Header lblTop={"Part 3"} lblBottom={"Đoạn hội thoại"} />
            </View>
            <View style={styles.listItem}>
                <FlatList
                    style={{
                        width: "100%",
                    }}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Item
                                    header={item.header}
                                    numberQuestion={item.numberQuestion}
                                    capacity={item.capacity}
                                    vip={item.vip}
                                    isActive={item.isActive}
                                />
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

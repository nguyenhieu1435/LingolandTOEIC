import { SafeAreaView, View, FlatList } from "react-native";
import { styles } from "./style";
import { Header } from "../../components/header";
import { Item } from "../../components/ItemView";

export const PartItem = function ({ navigation, route }) {
    const { name, title, data } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <Header lblTop={name} lblBottom={title} navigation={navigation} />
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
                                    name={name}
                                    uri={data.uri}
                                    navigation={navigation}
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

import { SafeAreaView, View, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "./style";
import { Header } from "../../components/header";
import { Item } from "../../components/ItemView";
import LoadingOverLay from "../../components/loadingoverlay";



export const PartItem = function ({ navigation, route }) {
  
    const { name, title, data } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View
                
            >
                <View style={{ zIndex: 0 }}>
                    <Header lblTop={name} lblBottom={title} navigation={navigation} />
                </View>
                <View style={styles.listItem}>
                    <FlatList
                        style={{
                            width: "100%",
                        }}
                        data={data}
                        //item is dataViewPartX.js
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
                                        uri={item.uri}
                                        navigation={navigation}
                                    />
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <LoadingOverLay/>
            </View>
        </SafeAreaView>
    );
};

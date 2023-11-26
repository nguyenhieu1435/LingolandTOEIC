import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './ToppicStyles';
import { VocabularySlice } from '../../redux/store';
import { URLVOCABYLARY } from '../InitData/init';

export const Toppic = function () {
    const id = useSelector((state) => state.vocabulary.itemselectId);
    const [data, setData] = useState([]);
    useEffect(function () {
        fetch(URLVOCABYLARY + '/' + id)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => setData(data.topics));
    }, []);
    const navigation = useNavigation();
    const route = useRoute();
    const { key, key2 } = route.params || {};
    const dataView = useSelector((state) => state.vocabulary);
    return (
        <SafeAreaView style={[styles.container]}>
            <FlatList
                data={data}
                numColumns={1}
                style={[{ width: '90%', alignSelf: 'center', flex: 1 }]}
                horizontal={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ItemData item={item} />}
            />
            <View
                style={[
                    {
                        flexDirection: 'row',
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    },
                ]}
            >
                <TouchableOpacity
                    style={{
                        width: '90%',
                        height: 45,
                        borderRadius: 10,
                        backgroundColor: '#0088E6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                    onPress={() => {
                        navigation.navigate('LayoutName', { ...route.params, key: 'Value' });
                    }}
                >
                    <Text
                        style={{
                            color: '#FFFDFD',
                            fontSize: 16,
                            fontWeight: '600',
                        }}
                    >
                        Học tử mới
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export var ItemData = function ({ item }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log('TOPPIC SELECT');
    return (
        <TouchableOpacity
            style={[styles.itemGroup]}
            onPress={() => {
                dispatch(VocabularySlice.actions.setToppicSelect(item));
                console.log('Chuyen qua WordDetail ');
                navigation.navigate('WordDetail');
            }}
        >
            <View style={[{ width: '100%', alignItems: 'center' }]}>
                <Image
                    source={{ uri: item.uri }}
                    style={{
                        width: 80,
                        height: 80,
                        alignSelf: 'center',
                        borderWidth: 7,
                        borderColor: '#1CBA54',
                        borderRadius: 40,
                    }}
                    resizeMode='contain'
                />

                <View style={{ marginVertical: 10, alignSelf: 'center' }}>
                    <Text style={[styles.title]}> {item.title} </Text>
                </View>

                <View style={[styles.grItem]}>
                    <Image
                        source={require('../../../assets/img/check.png')}
                        style={{
                            width: 15,
                            height: 15,
                            marginRight: 7,
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.textCheck]}>
                        {item.learned} / {item?.vocabularies.length || 0}
                    </Text>
                    <Image
                        source={require('../../../assets/img/time.png')}
                        style={{
                            width: 15,
                            height: 15,
                            marginRight: 7,
                            marginLeft: 15,
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.textTime]}>{item.timmer}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

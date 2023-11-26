import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { styles } from './TabVocabularyStyle';
import { VocabularySlice } from '../../redux/store';
import { URLVOCABYLARY } from '../InitData/init';

const ItemVocabulary = function ({
    id,
    bgImg,
    header = 'Demo',
    timmer = '12',
    learned = 12,
    item,
}) {
    console.log('--------------------------');
    console.log(item);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const totalVocabulary = item.topics.reduce((acc, value) => {
        return (acc += value.vocabularies?.length || 0);
    }, 0);

    return (
        <TouchableOpacity
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            }}
            onPress={() => {
                dispatch(VocabularySlice.actions.setTotalVocabulary(totalVocabulary));
                dispatch(VocabularySlice.actions.setSelectItem(id));
                dispatch(VocabularySlice.actions.setURL(bgImg));
                dispatch(VocabularySlice.actions.setTitle(header));
                dispatch(VocabularySlice.actions.setToppicSelect(item));
                navigation.navigate('Toppic');
            }}
        >
            <ImageBackground
                style={[styles.imgbackgroundsStyle]}
                resizeMode='contain'
                source={{ uri: bgImg }}
            >
                <View style={[styles.bgLayer]}>
                    <Text style={[styles.words]}>{header}</Text>
                    <View style={[styles.grItem]}>
                        <Image
                            source={require('../../../assets/img/check.png')}
                            style={{ width: 24, height: 24 }}
                            resizeMode='contain'
                        />
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text style={[styles.textCheck]}>
                                {learned}/{totalVocabulary}
                            </Text>
                        </View>
                        <Image
                            source={require('../../../assets/img/time.png')}
                            style={{ width: 24, height: 24 }}
                            resizeMode='contain'
                        />
                        <View>
                            <Text style={[styles.textTime]}>{timmer}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export const TabVocabulary = function () {
    const [dataItem, setDataItem] = useState([]);
    useEffect(function () {
        fetch(URLVOCABYLARY)
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((data) => {
                setDataItem(data);
            });
    }, []);
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.tabItem]}>
                {dataItem.map((value) => {
                    return (
                        <ItemVocabulary
                            id={value.id}
                            bgImg={value.bgImg}
                            header={value.header}
                            timmer={value.timmerTotal}
                            learned={value.learnedTotal}
                            item={value}
                        />
                    );
                })}
            </View>
            {/* -----------------------------------THU MUCJ----------------------------------------------- */}
            <View style={[styles.lib]}>
                <Text style={[styles.textLib]}> Thư mục của tôi</Text>
                <View
                    style={[
                        {
                            justifyContent: 'center',
                            flex: 1,
                        },
                    ]}
                >
                    <Image
                        source={require('../../../assets/img/direct.png')}
                        style={{
                            width: 60,
                            height: 40,
                            alignSelf: 'center',
                        }}
                        resizeMode='contain'
                    />
                    <Text
                        style={[
                            {
                                color: '#AAAAAA',
                                fontSize: 16,
                                alignSelf: 'center',
                            },
                        ]}
                    >
                        Không có dữ liệu
                    </Text>
                </View>
            </View>
            <View style={[styles.bottom]}>
                <View>
                    <Text style={[styles.textLib]}>* Học từ vựng hiểu quả với Lingoland Voca</Text>
                </View>
                <View style={[{ flexDirection: 'row', marginTop: 10 }]}>
                    <View>
                        <Image
                            source={require('../../../assets/img/logo.png')}
                            style={{
                                width: 56,
                                height: 68,
                                marginRight: 10,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View>
                        <Text style={[styles.textLib]}>Lingoland VOCA</Text>
                        <Text
                            style={[
                                styles.textLib,
                                {
                                    color: '#1ED15E',
                                },
                            ]}
                        >
                            Học từ vựng tiếng Anh miễn phí
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

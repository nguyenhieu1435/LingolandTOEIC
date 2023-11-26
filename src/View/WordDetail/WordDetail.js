import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    ScrollView,
    Image,
} from 'react-native';
import { styles } from './WordDetailStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { URLVOCABYLARY, color_success, rootColor } from '../InitData/init';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { VocabularySlice } from '../../redux/store';
import { Audio } from 'expo-av';
export const WordDetail = function () {
    const [sound, setSound] = useState();
    const [isPlay, setPlay] = useState(false);
    async function playSound(URI) {
        console.log('Loading Sound');
        setPlay(true);
        let audioSource;
        if (URI) {
            audioSource = { uri: URI };
        } else {
            audioSource = require('../../../assets/sound/linkdemo.mp3');
        }
        const { sound } = await Audio.Sound.createAsync(audioSource);
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
    async function stopSound() {
        if (sound) {
            console.log('Stopping Sound');
            await sound.stopAsync();
            console.log('Unloading Sound');
            await sound.unloadAsync();
            setSound(null);
            // setPlay(false);
        }
    }
    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    // console.log('------------WordDetail--------------');
    const data = useSelector((state) => state.vocabulary.toppicSelect.vocabularies);
    const bottomSheetRef = useRef(null);
    const handlerPressModel = function () {
        bottomSheetRef.current?.present();
    };
    const handleCloseModel = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
            setMainBg('#ffff');
        }
    };

    const snapPoints = ['25%', '50%', '75%'];
    const item = useSelector((state) => state.vocabulary.toppicSelect);
    const wordDetailSelect = useSelector((state) => state.vocabulary.wordDetailSelect);
    // console.log('------------------------------');
    // console.log(wordDetailSelect);
    // console.log('Toppic select');
    // console.log(item);
    const [mainBg, setMainBg] = useState('#ffff');
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: mainBg }]}>
                <FlatList
                    data={data}
                    numColumns={1}
                    style={[{ width: '90%', alignSelf: 'center', flex: 1 }]}
                    renderItem={({ item }) => (
                        <Item
                            item={item}
                            handlerPressModel={handlerPressModel}
                            handleCloseModel={handleCloseModel}
                            setMainBg={setMainBg}
                        />
                    )}
                />
                {/* ----------------------------------------- */}
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={2}
                    snapPoints={snapPoints}
                    backgroundStyle={{
                        borderRadius: 50,
                        backgroundColor: '#fff',
                    }}
                >
                    <View style={styles.contentContainer}>
                        <View style={[styles.grSubTop]}>
                            <TouchableOpacity
                                onPress={() => {
                                    stopSound();
                                }}
                            >
                                <Ionicons name='warning' color={rootColor} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Ionicons
                                    name='add'
                                    color={rootColor}
                                    size={30}
                                    style={[styles.subIcon]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleCloseModel();
                                }}
                            >
                                <Ionicons name='close' color={rootColor} size={30} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={[{ width: '100%', paddingHorizontal: 20 }]}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                    style={{
                                        marginTop: 20,
                                        width: '90%',
                                        height: 50,
                                        borderRadius: 10,
                                        backgroundColor: rootColor,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                    }}
                                    onPress={() => {}}
                                >
                                    <Ionicons
                                        name='add'
                                        color={'#ffff'}
                                        size={30}
                                        style={[{ flex: 1, marginLeft: 20 }]}
                                    />
                                    <Text
                                        style={{
                                            color: '#FFFDFD',
                                            fontSize: 20,
                                            fontWeight: '500',
                                            flex: 2,
                                        }}
                                    >
                                        Thêm nghĩa của bạn
                                    </Text>
                                </TouchableOpacity>
                                <View style={[styles.subGrAudio]}>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                padding: 10,
                                                borderWidth: 2,
                                                borderColor: '#39B1FF',
                                                borderRadius: 30,
                                                marginRight: 20,
                                            },
                                        ]}
                                        onPress={() => {
                                            console.log('------------SOUND-------');
                                            console.log(
                                                '--------->>',
                                                wordDetailSelect.sound,
                                                '<<--------------'
                                            );
                                            isPlay
                                                ? stopSound()
                                                : playSound(
                                                      wordDetailSelect.sound ||
                                                          'https://res.cloudinary.com/dttv3mbki/video/upload/v1701003059/sourceproject/h5fvwpenjsyzqnzcnsjm.mp3'
                                                  );
                                        }}
                                    >
                                        <Ionicons
                                            name='volume-high-sharp'
                                            color={'#39B1FF'}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={[styles.vocabylary]}>
                                            {wordDetailSelect.vocabylary || 'Từ vựng'}
                                        </Text>
                                        <Text style={[styles.spelling]}>
                                            {wordDetailSelect.spell || 'Phiên âm'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Image
                                        // source={{ uri: wordDetailSelect.img }}
                                        source={require('../../../assets/img/tuvungdemo.jpg')}
                                        style={{ width: 180, height: 160 }}
                                        resizeMode='contain'
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.type]}>{wordDetailSelect.type} </Text>
                                    <Text style={[styles.mean]}> {wordDetailSelect.mean} </Text>
                                    <Text style={[styles.description]}>
                                        1. {wordDetailSelect.description}
                                    </Text>
                                    <Text style={[styles.example]}> Ví dụ: </Text>
                                    <Text style={[styles.example]}>{wordDetailSelect.example}</Text>
                                    <Text style={[styles.example]}>
                                        {wordDetailSelect.exampleVn}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </BottomSheetModal>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};
export const Item = function ({ item, handlerPressModel, handleCloseModel, setMainBg }) {
    const navigation = useNavigation();
    // console.log(item);
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
            style={[styles.itemGroup]}
            onPress={() => {
                setMainBg('gray');
                dispatch(VocabularySlice.actions.setWordDetailSelect(item));
                handlerPressModel();
            }}
        >
            <View style={[styles.itemLeft]}>
                <View style={[styles.percent]}>
                    <Text style={[styles.pecentText]}> {item.percent || 0} % </Text>
                </View>
                <View style={[styles.grVocabulary]}>
                    <Text style={[styles.vocabylary]}>{item.vocabylary} </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ marginRight: 5 }}>
                            ( {item.type} ) {item.mean}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ padding: 10, alignSelf: 'center' }} onPress={() => {}}>
                <Ionicons name='add' color={color_success} size={30} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

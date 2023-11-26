import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export const HeaderWord = function ({ uri }) {
    const navigation = useNavigation();
    const URL = useSelector((state) => state.vocabulary.URL);
    const title = uri || useSelector((state) => state.vocabulary.titleSelect);
    console.log('------------->', URL);
    const totalVocabulary = useSelector((state) => state.vocabulary.totalVocabulary);
    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomWidth: 5,
                borderBottomColor: '#1CBA54',
                paddingVertical: 15,
                alignItems: 'center',
                backgroundColor: '#fff',
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                styles={{ paddingHorizontal: 20 }}
            >
                <Ionicons
                    name='arrow-back'
                    color={'#000'}
                    size={26}
                    style={{ marginHorizontal: 10 }}
                />
            </TouchableOpacity>
            <Image
                source={{ uri: URL }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 15,
                }}
                resizeMode='contain'
            />
            <View>
                <Text
                    style={[
                        {
                            fontSize: 20,
                            fontWeight: '400',
                        },
                    ]}
                >
                    {title || 'ERRRO'}
                </Text>
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
                    <View
                        style={[
                            {
                                flexDirection: 'row',
                            },
                        ]}
                    >
                        <Text style={[styles.textCheck]}>0 / {totalVocabulary} đã học</Text>
                    </View>
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
                    <View>
                        <Text style={[styles.textTime]}>0 cần luyên tập</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    customLabel: {
        color: '#1CBA54',
        fontSize: 15,
        fontWeight: '600',
    },
    textLabel: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 15,
        paddingVertical: 15,
    },
    grItem: {
        width: '85%',
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
    },
    textCheck: {
        color: '#0287E5',
        fontSize: 13,
        fontWeight: '600',
    },
    textTime: {
        color: '#1ED15E',
        fontSize: 13,
        fontWeight: '600',
    },
});

import { Image, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SettingPage() {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F7FC' }}>
            <StatusBar />
            <SafeAreaView style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 20 }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>Tài khoản</Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}
                        >
                            <Image
                                source={require('../../../assets/img/userSetting.png')}
                                style={{ width: 65, height: 65 }}
                                resizeMode='contain'
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontWeight: 500, fontSize: 17 }}>Hiếu Rio</Text>
                                <Text style={{ fontSize: 15, color: '#333', fontWeight: 400 }}>
                                    Xem thông tin
                                </Text>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 20 }}>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 25,
                                }}
                            >
                                <FontAwesome5 name='medal' size={28} color='#1DB954' />
                                <Text style={{ fontSize: 18, fontWeight: 400, marginLeft: 15 }}>
                                    Mua hàng
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 25,
                                }}
                            >
                                <AntDesign name='tagso' size={28} color='#1DB954' />
                                <Text style={{ fontSize: 18, fontWeight: 400, marginLeft: 15 }}>
                                    Nhập mã mua hàng
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 25,
                                }}
                            >
                                <MaterialIcons name='history' size={28} color='#1DB954' />
                                <Text style={{ fontSize: 18, fontWeight: 400, marginLeft: 15 }}>
                                    Lịch sử mua hàng
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <Text
                        style={{ fontWeight: 600, fontSize: 18, marginTop: 20, marginBottom: 14 }}
                    >
                        Giao diện
                    </Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 25,
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>Giao diện tối</Text>
                                <Switch
                                    style={{
                                        transform: [{ scaleX: 1 }, { scaleY: 1 }],
                                        marginLeft: 20,
                                        color: 'red',
                                    }}
                                    trackColor={{ false: '#888', true: '#8FDDAB' }}
                                    thumbColor={isEnabled ? '#48B759' : '#fff'}
                                    onValueChange={() => setIsEnabled(!isEnabled)}
                                    value={isEnabled}
                                />
                            </View>

                            <View style={{ marginBottom: 25 }}>
                                <Text style={{ fontSize: 18 }}>Ngôn ngữ ứng dụng</Text>
                                <Text style={{ fontSize: 16, color: '#1DB954' }}>Tiếng Việt</Text>
                            </View>
                            <View style={{ marginBottom: 25 }}>
                                <Text style={{ fontSize: 18 }}>Ngôn ngữ gốc của bạn</Text>
                                <Text style={{ fontSize: 16, color: '#1DB954' }}>Tiếng Việt</Text>
                            </View>
                        </View>
                    </View>

                    <Text
                        style={{ fontWeight: 600, fontSize: 18, marginTop: 20, marginBottom: 14 }}
                    >
                        Luyện tập
                    </Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 18,
                                }}
                            >
                                <MaterialCommunityIcons name='dumbbell' size={28} color='#1DB954' />
                                <Text style={{ fontSize: 18, fontWeight: 400, marginLeft: 15 }}>
                                    Cấu hình luyện tập
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <Text
                        style={{ fontWeight: 600, fontSize: 18, marginTop: 20, marginBottom: 14 }}
                    >
                        Cộng đồng
                    </Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 18,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name='comment-edit'
                                    size={28}
                                    color='#1DB954'
                                />
                                <Text style={{ fontSize: 18, fontWeight: 400, marginLeft: 15 }}>
                                    Phản hồi
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <Text
                        style={{ fontWeight: 600, fontSize: 18, marginTop: 20, marginBottom: 14 }}
                    >
                        Các nền tảng khác
                    </Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <Pressable
                            style={{
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}
                        >
                            <Image
                                source={require('../../../assets/img/logoLingoLand.png')}
                                style={{ width: 55, height: 55, borderRadius: 10 }}
                                resizeMode='contain'
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 500 }}>Tải App</Text>
                                <Text style={{ color: '#1DB954', fontSize: 16 }}>
                                    Khả dụng trên cả Android và IOS
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                    <Text
                        style={{ fontWeight: 600, fontSize: 18, marginTop: 20, marginBottom: 14 }}
                    >
                        Các ứng dụng khác
                    </Text>
                    <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff' }}>
                        <Pressable
                            style={{
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}
                        >
                            <Image
                                source={require('../../../assets/img/logo.png')}
                                style={{ width: 55, height: 55, borderRadius: 10 }}
                                resizeMode='contain'
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 500 }}>
                                    Lingoland VOCA
                                </Text>
                                <Text style={{ color: '#1DB954', fontSize: 16 }}>
                                    Học từ vựng tiếng Anh miễn phí
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            style={{
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                                marginTop: 10,
                            }}
                        >
                            <Image
                                source={require('../../../assets/img/logoLingoLand.png')}
                                style={{ width: 55, height: 55, borderRadius: 10 }}
                                resizeMode='contain'
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 500 }}>
                                    Lingoland TOEIC
                                </Text>
                                <Text style={{ color: '#1DB954', fontSize: 16 }}>
                                    Học và luyện thi TOEIC với đầy đủ các phần
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

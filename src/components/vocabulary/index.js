import { View, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native'
import styles from "./style"
import { LinearGradient } from 'expo-linear-gradient';

export default function Vocabulary() {
  return (
    <View style={{flex: 1}}>
        <StatusBar/>
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex: 1}}
              stickyHeaderIndices={[0]}
            >
                <View style={styles.headerBox}>
                  <Text style={styles.titleComponent}>Từ vựng</Text>
                </View>

                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.titleBody}>Từ vựng </Text>
                  <View style={styles.boxVocabulary}>
                      <View style={{paddingHorizontal: 10}}>
                        <View style={styles.containerVoca}>
                          <Image
                            source={require("../../../assets/TOEIC_600WORDS.png")}
                            resizeMode='contain'
                            style={{width: 160, height: 165}}
                          />
                          <LinearGradient
                            colors={['transparent','rgba(0,0,0,0.1)' ,'rgba(0,0,0,.8)']}
                          style={styles.childVoca}>
                            <View style={{height: "100%",justifyContent: "flex-end", alignItems: "center"}}>
                              <Text
                                style={{color: "#f2f2f2", fontSize: 16, fontWeight: "700", marginBottom: 8, fontSize: 18, width: "80%"}}
                              >600 từ vựng TOEIC</Text>
                              <View
                                style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, backgroundColor: "#fff"}}
                              >
                                <Image
                                  source={require("../../../assets/checkVocabulary.png")}
                                  style={{ width: 20, height: 20}}
                                />
                                <Text style={{color: "#0490F1", fontSize: 14, marginHorizontal: 2}}>0/600</Text>
                                <Image
                                  source={require("../../../assets/timeVocabulary.png")}
                                  style={{marginLeft: 5, width: 20, height: 20}}
                                />
                                <Text style={{color: "#1BBA54", fontSize: 14, marginHorizontal: 2}}>0</Text>
                              </View>
                              </View>
                          </LinearGradient>
                        </View>
                      </View>
                      <View style={{paddingHorizontal: 10}}>
                        <View style={styles.containerVoca}>
                          <Image
                            source={require("../../../assets/TOEIC_POPULARWORDS.png")}
                            resizeMode='contain'
                            style={{width: 160, height: 165}}
                          />
                          <LinearGradient
                            colors={['transparent','rgba(0,0,0,.8)']}
                          style={styles.childVoca}>
                            <View style={{height: "100%",justifyContent: "flex-end", alignItems: "center"}}>
                              <Text
                                style={{color: "#f2f2f2", fontSize: 16, fontWeight: "700", marginBottom: 8, fontSize: 18, width: "80%"}}
                              >Từ vựng thông dụng</Text>
                              <View
                                style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, backgroundColor: "#fff"}}
                              >
                                <Image
                                  source={require("../../../assets/checkVocabulary.png")}
                                  style={{ width: 20, height: 20}}
                                />
                                <Text style={{color: "#0490F1", fontSize: 14, marginHorizontal: 2}}>0/600</Text>
                                <Image
                                  source={require("../../../assets/timeVocabulary.png")}
                                  
                                  style={{marginLeft: 5, width: 20, height: 20}}
                                />
                                <Text style={{color: "#1BBA54", fontSize: 14, marginHorizontal: 2}}>0</Text>
                              </View>
                              </View>
                          </LinearGradient>
                        </View>
                      </View>
                  </View>
                </View>
                <View  style={{paddingHorizontal: 10}}>
                  <Text style={styles.titleBody}>
                    Thư mục của tôi
                  </Text>
                  <View style={styles.emptyData}>
                      <View style={{alignItems: 'center'}}>
                          <Image
                            source={require("../../../assets/emptyFolder.png")}
                            resizeMode='contain'
                            style={{width: 50, height: 50}}
                          />
                          <Text
                            style={{marginTop: 20, fontWeight: "500", fontSize: 16}}
                          >Không có dữ liệu</Text>
                      </View>
                  </View>
                </View>
                <View style={{paddingHorizontal: 10}}>
                  <Text
                    style={{fontSize: 18, fontWeight: "500"}}
                  >
                    * Học từ vựng hiểu quả với Lingoland Voca
                  </Text>
                  <View
                    style={styles.lingolandVoca}
                  >
                    <Image
                      source={require("../../../assets/vocaIcon.png")}

                    />
                    <View style={{marginLeft: 8}}>
                      <Text style={{fontSize: 18, fontWeight: "500"}}>Lingoland VOCA</Text>
                      <Text style={{fontSize: 16, marginTop: 10, color: "#1FC355", fontWeight: "500"}}>Học từ vựng tiếng Anh miễn phí</Text>
                    </View>
                  </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
  )
}
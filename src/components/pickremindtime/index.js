import { View, Text, StatusBar, Image, Switch, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useEffect, useLayoutEffect, useState } from 'react';

export default function PickRemindTime() {
    const [dateRemind, setDateRemind] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [isPickShow, setIsPickShow] = useState(false);

    const printDateRemind = () => {
        let splitSpace = dateRemind.toLocaleTimeString().split(" ");
        let hourAndMinute = splitSpace[0].split(":").slice(0, 2).join(":");
        return hourAndMinute + " " + splitSpace[1];
    }
    const changeDateRemind = (event, selectedDate) => {
        const currentDate = selectedDate || dateRemind;
        setDateRemind(currentDate);
        if (Platform.OS === 'android') {
            setIsPickShow(false);
        }
    }

  return (
    <View style={{flex: 1}}>
        <StatusBar/>
        <SafeAreaView style={styles.container}> 
            <View style={styles.contentCenter}>
                <Image
                    source={require("../../../assets/logo_alternative.png")}
                    resizeMode='contain'
                    style={{width: 300, height: 90}}
                />
                <Text
                style={styles.titleRemindTime}
                >
                    Cài đặt thông báo luyện tập hàng ngày
                </Text>
                <View style={styles.toggleButton}>
                    <Text style={{fontSize: 18, marginRight: 20}}>Bật</Text>
                    <Switch
                        style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.3 }] , marginLeft: 20, color: "red"}}
                        trackColor={{ false: "#888", true: "#8FDDAB" }}
                        thumbColor={isEnabled ? "#48B759" : "#fff"}
                        onValueChange={()=>setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                </View>
                <Pressable style={{width: "100%", paddingHorizontal: 40, justifyContent: "center"}}
                    onPress={()=>{
                        setIsPickShow(true);
                    }}
                >
                    <Text style={styles.timePickerText}>
                        {printDateRemind()}
                    </Text>
                </Pressable>
                {isPickShow && isEnabled &&
                    <DateTimePicker
                    value={dateRemind}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={changeDateRemind}
                  />
                }
                <Pressable style={{width: "100%", alignItems: "center", marginTop: 40}}>
                    <Text style={styles.textSubmitRemind}>OK</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    </View>

  )
}
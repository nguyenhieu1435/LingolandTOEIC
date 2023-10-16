import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import styles from './styles'
import { Image } from 'react-native'
import { useEffect } from 'react'


export default function LoadingPage({navigation}) {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('SignIn')
    }, 3000)
  }, [])
  return (
    <View style={{flex: 1}}>
        <StatusBar/>
        <SafeAreaView style={styles.container}>
        <Image
            source={require("../../../assets/logoLayout01.png")}
            resizeMode='contain'
            style={styles.logo}
        ></Image>
        </SafeAreaView>
    </View>
  )
}
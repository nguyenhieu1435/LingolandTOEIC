import { View, Text, Pressable, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import styles from "./style"

export default function TraningPartItem({title, name, backgroundColor, iconPath, widthBoxIcon = "60%"}) {
  return (
    <Pressable style={styles.container}>
        <View style={styles.containerChild}>
            <Text style={{fontSize: 13, color: "#827ba5", fontWeight: "500", marginBottom: 6}}
            >{title}</Text>

                <LinearGradient style={{width: widthBoxIcon, flexDirection: "row",  paddingVertical: 7, paddingHorizontal: 15, borderRadius: 8
                    , alignItems: "center", justifyContent :"center", }}    colors={backgroundColor}
                    start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
                >
                    <Image
                        source={iconPath}
                        resizeMode='contain'
                        style={{width: 25, height: 20, marginHorizontal: 5}}
                    />
                    <Text style={{color: "#fff", fontSize: 13, fontWeight: "700", marginLeft: 2}}>{name}</Text>
                </LinearGradient>
                
        </View>
    </Pressable>
  )
}
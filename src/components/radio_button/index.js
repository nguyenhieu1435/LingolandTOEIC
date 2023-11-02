import { View, Text, Pressable } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

export default function RadioButton() {
  return (
    <View style={{width: "100%",flexDirection: "row", alignItems: "flex-start"}}>
        <Pressable
            style={{padding: 15}}
        >
            <Ionicons name="radio-button-off" size={24} color="#666" />
        </Pressable>
        <View style={{flex: 1, paddingTop: 15}}>
            <View style={{flexDirection: "row", width: "100%", flexWrap: "nowrap"}}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{fontSize: 17, fontWeight: "500"}}>A. </Text>
                    <Text style={{fontSize: 17, color: "#333"}}>One of the men is writing on a document.</Text>
                </View>
                <AntDesign name="check" size={24} color="#59BB51" style={{marginRight: 15}}/>
            </View>
            <View style={{backgroundColor: "#EBF5FC", borderRadius: 15, marginTop: 10, marginRight: 15}}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", }}>
                    <MaterialIcons name="translate" size={18} color="#188DD8" 
                        style={{padding: 15}}
                    />
                    <Text style={{flex: 1,color: "#3FA0DE", fontWeight: "500", fontSize: 17 , paddingVertical: 15, paddingRight: 20}}
                    >12312asdasdasdbasdhasdhjabsdjbasjhdbasjhdbajhsdbjas</Text>
            

                </View>
                <View style={{flexDirection: "row",}}>
                    <MaterialIcons name="highlight" 
                        size={18} color="#188DD8" 
                        style={{padding: 15}}
                    />
                    <Text style={{flex: 1,color: "#3FA0DE", fontSize: 17,fontWeight: "500",  paddingVertical: 15,}}>123123</Text>
                </View>
            </View>
        </View>
    </View>
  )
}
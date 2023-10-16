import { View, Text, StatusBar, SafeAreaView, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import styles from './style'
import { Image } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    username: yup.string().required('Username không được để trống')
    .min(6, 'Username phải có ít nhất 6 ký tự')
    .max(32, 'Username không được vượt quá 32 ký tự')
    .matches(/^[a-zA-Z0-9]+$/, 'Username không được chứa ký tự đặc biệt')
    ,
    password: yup.string().required('Password không được để trống')
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .max(32, 'Password không được vượt quá 32 ký tự')
    .matches(/^[a-zA-Z0-9]+$/, 'Password không được chứa ký tự đặc biệt')
})

const defaultValues = {
    username: '',
    password: ''
}

export default function SignIn({navigation}) {
    const {control, handleSubmit, setValue ,formState: { errors, isValid }} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),

    });

    const [toggleShowPassword, setToggleShowPassword] = useState(false);
    const submitLogin = (data) => {
        if (isValid){
            console.log(data)
        }
    }
  return (
    <View style={{flex: 1}}>
        <StatusBar/>
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../../../assets/logo_alternative.png")}
                style={{width: 295, height: 58}}
                resizeMode='contain'
            />
            <Text style={styles.titleSignIn}>Đăng Nhập</Text>
            <View style={styles.boxTextInput}>
                <Controller
                    name='username'
                    defaultValue={defaultValues.username}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder='Username'
                            style={[styles.textInput]}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(text)=>setValue('username', text)}
                        />
                    ) }
                />

                {errors.username?.message && <Text style={styles.errorMsg}>{errors.username?.message}</Text>}
            </View>
            <View style={styles.boxTextInput}>
                <Controller
                    name='password'
                    defaultValue={defaultValues.password}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={!toggleShowPassword}
                            onBlur={onBlur}
                            style={[styles.textInput]}
                            value={value}
                            onChangeText={(text)=>setValue('password', text)}
                            
                        />
                    ) }
                />
                {
                    errors.password?.message && <Text style={styles.errorMsg}>{errors.password?.message}</Text>
                }
                <Pressable
                    style={{position: "absolute", right: 20, top: 12}}
                    onPress={() => {setToggleShowPassword(!toggleShowPassword)}}
                >
                    {
                        toggleShowPassword
                        ?
                        <Ionicons name="eye-off" size={27} color="black" />
                       : 
                        <Ionicons name="eye" size={27} color="black" />
                    }
                </Pressable>
            </View>
            <Pressable
                onPress={handleSubmit(submitLogin)}
            >
                <Text style={styles.btnSubmitLogin}>Xác nhận</Text>
            </Pressable>


            <Pressable style={{width: "100%", alignItems: "center"}}>
                <Text style={{marginTop: 60, color: '#48B759', fontSize: 18, textAlign: "center"
                , textDecorationLine: "underline",
                backgroundColor: "#fff",
                paddingVertical: 8, paddingHorizontal: 30, borderRadius: 15,
                width: "45%", marginHorizontal: "auto"
            }}
                onPress={()=> {navigation.navigate('SignUp')}}
            >Đăng ký</Text>
            </Pressable>
        </SafeAreaView>
    </View>
  )
}
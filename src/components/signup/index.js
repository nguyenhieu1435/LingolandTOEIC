import { View, Text, StatusBar, SafeAreaView, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import styles from './style'
import { Image } from 'react-native'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema2 = yup.object().shape({
    usernameSignUp: yup.string().required('Username không được để trống')
    .min(6, 'Username phải có ít nhất 6 ký tự')
    .max(32, 'Username không được vượt quá 32 ký tự')
    .matches(/^[a-zA-Z0-9]+$/, 'Username không được chứa ký tự đặc biệt')
    ,
    passwordSignUp: yup.string().required('Password không được để trống')
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .max(32, 'Password không được vượt quá 32 ký tự')
    .matches(/^[a-zA-Z0-9]+$/, 'Password không được chứa ký tự đặc biệt')
    ,
    confirmPasswordSignUp: yup.string().required('Confirm password không được để trống')
    .oneOf([yup.ref('passwordSignUp'), null], 'Confirm password không trùng khớp')
})

const defaultValues2 = {
    usernameSignUp: '',
    passwordSignUp: '',
    confirmPasswordSignUp: ''
}

export default function SignUp({navigation}) {
    const {control : control2, handleSubmit : handleSubmit2, formState: { errors : errors2, isValid: isValid2 }} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema2),

    });
    const [toggleShowPasswordSignUp, setToggleShowPasswordSignUp] = useState(false);
    const [toggleShowPasswordConfirmSignUp, setToggleShowPasswordConfirmSignUp] = useState(false);

    const submitSignUp = (data) => {
        if (isValid2){
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
            <Text style={styles.titleSignIn}>Đăng Ký</Text>
            <View style={styles.boxTextInput}>
                <Controller
                    name='usernameSignUp'
                    defaultValue={defaultValues2.usernameSignUp}
                    control={control2}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder='Username'
                            style={[styles.textInput]}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    ) }
                />

                {errors2.usernameSignUp?.message && <Text style={styles.errorMsg}>{errors2.usernameSignUp?.message}</Text>}
            </View>
            <View style={styles.boxTextInput}>
                <Controller
                    name='passwordSignUp'
                    defaultValue={defaultValues2.passwordSignUp}
                    control={control2}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={!toggleShowPasswordSignUp}
                            onBlur={onBlur}
                            style={[styles.textInput]}
                            value={value}
                            onChangeText={onChange}
                            
                        />
                    ) }
                />
                {
                    errors2.passwordSignUp?.message && <Text style={styles.errorMsg}>{errors2.passwordSignUp?.message}</Text>
                }
                <Pressable
                    style={{position: "absolute", right: 20, top: 12}}
                    onPress={() => {setToggleShowPasswordSignUp(!toggleShowPasswordSignUp)}}
                >
                    {
                        toggleShowPasswordSignUp
                        ?
                        <Ionicons name="eye-off" size={27} color="black" />
                       : 
                        <Ionicons name="eye" size={27} color="black" />
                    }
                </Pressable>
            </View>
            <View style={styles.boxTextInput}>
                <Controller
                    name='confirmPasswordSignUp'
                    defaultValue={defaultValues2.confirmPasswordSignUp}
                    control={control2}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder='Confirm password'
                            secureTextEntry={!toggleShowPasswordConfirmSignUp}
                            onBlur={onBlur}
                            style={[styles.textInput]}
                            value={value}
                            onChangeText={onChange}
                            
                        />
                    ) }
                />
                {
                    errors2.confirmPasswordSignUp?.message && <Text style={styles.errorMsg}>{errors2.confirmPasswordSignUp?.message}</Text>
                }
                <Pressable
                    style={{position: "absolute", right: 20, top: 12}}
                    onPress={() => {setToggleShowPasswordConfirmSignUp(!toggleShowPasswordConfirmSignUp)}}
                >
                    {
                        toggleShowPasswordConfirmSignUp
                        ?
                        <Ionicons name="eye-off" size={27} color="black" />
                       : 
                        <Ionicons name="eye" size={27} color="black" />
                    }
                </Pressable>
            </View>
            <Pressable
                onPress={handleSubmit2(submitSignUp)}
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
                onPress={()=>{navigation.goBack()}}
            
            >Đăng Nhập</Text>
            </Pressable>
        </SafeAreaView>
    </View>
  )
}
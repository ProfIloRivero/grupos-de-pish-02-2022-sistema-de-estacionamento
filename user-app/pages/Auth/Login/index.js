import React, { useContext, useState, useEffect } from "react"
import { View, TextInput, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native"
import AuthenticationContext from "../../../config/Context/Authentication"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo'
import Button from "../../../components/Button"
import { apiUrl } from "../../../config"
import logo from '../../../assets/logo.png'
import style from "./style"

const Login = ({ navigation }) => {
    
    const {isLoading, setIsLoading, setIsLogged} = useContext(AuthenticationContext)
    const [isConnected, setIsConnected] = useState(true)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                if (!isConnected) {
                    setIsConnected(true)
                }
            } else {
                if (isConnected) {
                    setIsConnected(false)
                }
            }
        })  

        try {
            (async () => {

                setIsLoading(true)

                const data = await AsyncStorage.getItem('@data')
                
                if(data){
                    setIsLogged(true)
                }else{
                    setIsLoading(false)
                }
            })()   
        } catch (error) {
            console.log(error)
        }

        return (() => {unsubscribe()})
    }, [])

    const Login = () => {

        if(!isConnected) {
            alert('[CONEXAO] sem conexao')
            return 
        }

        (async () => {
            try {                
                setIsLoading(true)

                if(!user || !password){
                    throw Error('Preencha Usuario e Senha')
                }

                const res = await fetch(
                    `${apiUrl}login/`, {
                        method: 'post',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: user,
                            password: password,
                        })
                    }
                )

                if(res.status == 502){
                    throw Error('Nao foi possivel conectar ao servidor')
                }    

                if(res.status != 200){
                    throw Error(await res.text())
                }

                const data = await res.json()

                const {id, name} = data

                await AsyncStorage.setItem(
                    '@data',
                    JSON.stringify({
                        id: id,
                        name: name,
                    })
                )

                const dataStored = await AsyncStorage.getItem('@data')
                
                if (!dataStored) {
                    throw Error('Erro ao armazenar os dados')
                }else{
                    setIsLogged(true)
                }

            } catch (error) {
                setIsLoading(false)
                alert(`[ERRO] ${error}`)
            }
        }
        )()
    }

    return (
        <KeyboardAvoidingView behavior='height'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.container}>
                    <View style={style.formArea}>
                        <View style={style.inputArea}>
                            <View style={{marginBottom: 15, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150, height: 150, backgroundColor: '#fff'}}>
                                <Image source={logo} style={style.logo} />
                            </View>
                            <TextInput style={style.input} value={user} onChangeText={setUser} placeholder='Usuário'/>
                            <TextInput secureTextEntry={true} style={style.input} value={password} onChangeText={setPassword} placeholder='Senha'></TextInput>
                        </View>
                        {
                            isLoading ? <ActivityIndicator style={{position: 'absolute', zIndex: 2}} size={123} color='#bbbb'/> : <></>
                        }
                        <View style={style.buttonArea}>
                            <Button style={{button: style.button, text: style.text}} title='Entrar' action={() => {Keyboard.dismiss();Login()}}/>
                            <Button style={{button: style.link, text: style.textLink}} title='Cadastrar' action={() => navigation.navigate('Register')}/>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login
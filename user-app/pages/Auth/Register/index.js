import React, { useState, useContext, useEffect } from "react"
import { View, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator } from "react-native"
import AuthenticationContext from "../../../config/Context/Authentication"
import NetInfo from '@react-native-community/netinfo'
import Button from "../../../components/Button"
import { apiUrl } from "../../../config"
import logo from '../../../assets/usericon.png'
import style from "./style"

const Register = ({ navigation }) => {
    
    const {isLoading, setIsLoading} = useContext(AuthenticationContext)
    const [isConnected, setIsConnected] = useState(true)
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

        return () => {unsubscribe()}
    }, [])

    const Register = () => {

        (async () => {
            try {     
                
                if(!isConnected){
                    throw Error('Sem Conexao')
                }

                setIsLoading(true)

                if(!user){
                    throw Error('Usuario em branco')
                }

                if(!name){
                    throw Error('Nome em branco')
                }

                if(!password){
                    throw Error('Senha em branco')
                }

                if(!confirmPassword){
                    throw Error('Confirmar Senha em branco')
                }

                if(password.localeCompare(confirmPassword) != 0){
                    throw Error('Senhas não são iguais')
                }

                const res = await fetch(
                    `${apiUrl}create/`, {
                        method: 'post',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: user,
                            name: name,
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

                setUser('')
                setName('')
                setPassword('')
                setConfirmPassword('')
                setIsLoading(false)    
                alert('Usuario cadastrado')
            } catch (err) {
                setIsLoading(false)
                alert(`[ERRO] ${err}`)
            }
        }
        )()
    }

    return (
        <KeyboardAvoidingView behavior='height'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.container}>
                    <View style={style.formArea}>
                        <View style={{marginBottom: 10, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 110, height: 110, backgroundColor: '#fff'}}>
                            <Image source={logo} style={style.logo} />
                        </View>
                        <TextInput style={style.input} value={user} onChangeText={setUser} placeholder='Usuário'/>
                        <TextInput style={style.input} value={name} onChangeText={setName} placeholder='Nome'/>
                        <TextInput secureTextEntry={true} style={style.input} value={password} onChangeText={setPassword} placeholder='Senha'/>
                        <TextInput secureTextEntry={true} style={style.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Confirmar Senha'/>
                        <Button style={{button: style.button, text: style.text}} title={'Cadastrar'} action={() => {Keyboard.dismiss();Register()}}/>
                        <Button style={{button: style.link, text: style.textLink}} title={'Entrar'} action={() => navigation.navigate('Login')}/>
                    </View>
                    {
                        isLoading ? <ActivityIndicator style={{position: 'absolute', zIndex: 2}} size={123} color='#bbbb'/> : <></>
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Register
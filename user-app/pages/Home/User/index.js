import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import AuthenticationContext from "../../../config/Context/Authentication"
import NetInfo from '@react-native-community/netinfo'
import Button from "../../../components/Button"
import { apiUrl } from "../../../config";
import style from "./style"

const User = () => {

    const {isLoading, setIsLoading, setIsLogged} = useContext(AuthenticationContext)
    const [isConnected, setIsConnected] = useState(true)
    const [idQR, setIdQR] = useState('')
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
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
          
        Init()
        
        return (() => {unsubscribe()})
    }, [])

    const Init = async () => {
        try {  

            setIsLoading(true)
            
            const dataStored = await AsyncStorage.getItem('@data')
            
            const {id, name} = await JSON.parse(dataStored)

            if(!id || !name) {
                throw Error('Erro ao buscar os dados')
            }

            if(!isConnected){
                throw Error('Sem conexão')
            }

            const res = await fetch(
                `${apiUrl}read/${id}`, {
                    method: 'get',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )

            if(!res.ok){
                throw Error('Nao foi possivel conectar ao servidor')
            }
            
            const data = await res.json()

            if(!data){
                throw Error('Nao foi possivel buscar os dados')
            }

            if(!data.user || !data.name){
                throw Error('Nao foi possivel buscar os dados')
            }

            setIdQR(id)
            setUser(data.user)
            setName(data.name)
            setNewPassword('')
            setConfirmNewPassword('')
            setConfirmPassword('')
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            alert(`[ERRO] ${err}`)
        }
    }

    const Update = async () => {
        try {  

            setIsLoading(true)
            
            if(!isConnected){
                throw Error('Sem conexão')
            }

            let body = {}

            if(user.trim()){
                body.user = user
            }

            if(name.trim()){
                body.name = name
            }

            if(confirmNewPassword.trim() && newPassword.trim()){
                body.newPassword = newPassword
            }

            if(!confirmPassword){
                throw Error('Insira a senha atual')
            }

            body.password = confirmPassword

            const res = await fetch(
                `${apiUrl}update/${idQR}`, {
                    method: 'post',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            )

            if(res.status == 502){
                throw Error('Nao foi possivel conectar ao servidor')
            }

            if(res.status != 200){
                throw Error(await res.text())
            }

            Init()
            
            alert('Atualização sucedida')
        }catch(err){
            setIsLoading(false)
            alert(`[ERRO] ${err}`)
        }
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.contentArea}>
                <ScrollView>
                    <View style={style.header}>
                        <Text style={style.text}>Atualizar Cadastro</Text>
                    </View>
                    <View style={style.formArea}>
                        {
                            isLoading ? <ActivityIndicator style={{position: 'absolute', zIndex: 2}} size={123} color='#bbbb'/> : <></>
                        }
                        <TextInput style={style.input} value={user} onChangeText={setUser} placeholder='Usuário'/>
                        <TextInput style={style.input} value={name} onChangeText={setName} placeholder='Nome'/>
                        <TextInput secureTextEntry={true} style={style.input} value={newPassword} onChangeText={setNewPassword} placeholder='Nova Senha'/>
                        <TextInput secureTextEntry={true} style={style.input} value={confirmNewPassword} onChangeText={setConfirmNewPassword} placeholder='Confirmar nova Senha'/>
                        <TextInput secureTextEntry={true} style={style.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Senha Atual'/>
                        <Button style={style.button} title='Atualizar' action={Update}/>
                    </View>
                    <View style={style.buttonArea}>
                        <Button style={style.exit} title='Sair' action={() => {AsyncStorage.clear(); setIsLogged(false)}}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default User
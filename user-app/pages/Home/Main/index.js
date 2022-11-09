import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AuthenticationContext from "../../../config/Context/Authentication";
import StatusTime from "../../../components/StatusTime";
import NetInfo from '@react-native-community/netinfo'
import QRCode from "react-native-qrcode-svg";
import { apiUrl } from "../../../config";
import style from "./style";

const Main = ({ navigation }) => {

    const {isLoading, setIsLoading, setIsLogged} = useContext(AuthenticationContext)
    const [isConnected, setIsConnected] = useState(true)
    const [isPaying, setIsPaying] = useState(false)
    const [name, setName] = useState('')
    const [idQR, setIdQR] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [cost, setCost] = useState(null)

    useEffect(() => {
        
        try {
            (async () => {
                const data = await AsyncStorage.getItem('@data')

                if(data){                
                    const {id, name} = JSON.parse(data)
                    setIdQR(id)
                    setName(name)
                    setIsLoading(false) 
                }else{
                    setIsLogged(false)
                }
            })()   
        } catch (error) {
            AsyncStorage.clear()
            setIsLogged(false)
        }

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

        return (() => {unsubscribe()})
    }, [])

    useEffect(() => {
        if(idQR){
            GetTime_Cost()
        }
    }, [idQR])

    const GetTime_Cost = () => {
        fetch(
            `${apiUrl}time_cost/${idQR}`, {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject('Não foi possivel conectar ao servidor')
        })
        .then(data => {
            setCost(data.cost)
            setStartTime(data.startTime)
            setEndTime(data.endTime)
        })
        .catch(err => {
            alert(`[ERRO] Não foi possível encontrar os dados\n${err}`)
        })
    }

    const GetPay = () => {
        setIsPaying(true)
        if(isConnected){
            fetch(
                `${apiUrl}pay/${idQR}`, {
                    method: 'get',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                return Promise.reject('Não foi possivel conectar ao servidor')
            })
            .then(data => {
                setCost(data.cost)
                setStartTime(data.startTime)
                setEndTime(data.endTime)
                setIsPaying(false)
                alert('[PAGAMENTO] Pagamento efetuado com sucesso!')
            })
            .catch(err => {
                setIsPaying(false)
                alert(`[ERRO] Não foi possível realizar o pagamento\n${err}`)
            })
        }else{
            alert(`[ERRO] Sem conexão`)
        }
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.text}>{isLoading ? '...' : `Ola, ${name.split(' ')[0]}`}</Text>
            </View>
            <View style={style.contentArea}>
                <View style={style.qrc}>
                    {
                        isLoading ? 
                            <ActivityIndicator style={{position: 'absolute', zIndex: 2}} size={123} color='#bbbb'/>
                        :
                            <QRCode size={200} value={JSON.stringify({id: idQR})}/>
                    }
                </View>
                <StatusTime enterTime={startTime} exitTime={endTime} loading={isLoading} pay={cost} act={GetPay}/>
            </View>
            {
                isPaying ? <ActivityIndicator style={{position: 'absolute', zIndex: 2}} size={123} color='#bbbb'/> : <></>
            }
        </View>
    )
}

export default Main
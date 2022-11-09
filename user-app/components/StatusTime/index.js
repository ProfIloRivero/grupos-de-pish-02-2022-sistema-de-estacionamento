import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Button from "../Button";

const StatusTime = ({ enterTime, exitTime, loading, pay, act}) => {

    return (
        <View style={style.container}>
            <View style={style.area}>
                <View style={style.valueArea}>
                    <Text style={style.title}>Entrada</Text>
                    <View style={style.values}>
                        {   
                            loading ? 
                                <>
                                    <ActivityIndicator style={{position: 'absolute'}} size={100} color='#bbbb'/>
                                    <Text style={style.value}>--/--/--</Text>
                                    <Text style={style.value}>--:--:--</Text> 
                                </>
                            :
                                <>
                                    <Text style={style.value}>{enterTime ? new Date(enterTime).toLocaleDateString('pt-br') : '--/--/--'}</Text>
                                    <Text style={style.value}>{enterTime ? new Date(enterTime).toLocaleTimeString('pt-br') : '--:--:--'}</Text> 
                                </>
                        }
                    </View>
                </View>
                <View style={style.valueArea}>
                    <Text style={style.title}>Saida</Text>
                    <View style={style.values}>
                        {   
                            loading ? 
                                <>
                                    <ActivityIndicator style={{position: 'absolute'}} size={100} color='#bbbb'/>
                                    <Text style={style.value}>--/--/--</Text>
                                    <Text style={style.value}>--:--:--</Text> 
                                </>
                            :
                                <>
                                    <Text style={style.value}>{exitTime ? new Date(exitTime).toLocaleDateString('pt-br') : '--/--/--'}</Text>
                                    <Text style={style.value}>{exitTime ? new Date(exitTime).toLocaleTimeString('pt-br') : '--:--:--'}</Text> 
                                </>
                        }
                    </View>
                </View>
            </View>
            <View style={style.pay}>
                {
                    loading ? 
                        <>
                            <ActivityIndicator style={{position: 'absolute'}} size={50} color='#fcea00'/>
                            <Text style={style.text}>R$ --.--</Text>
                        </>
                    :
                        <Text style={style.text}>{pay != null ? `R$ ${parseFloat(pay).toFixed(2)}` : 'R$ ----'}</Text>
                }
            </View>
            <Button style={style.botton} title='Pagar' action={act}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: '50%',
        minHeight: 300,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0E52BF',
    },  
    area: {
        flexDirection: 'row',
        height: '60%',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        height: '20%',
        fontWeight: 'bold',
        color: '#ef8f22',
        marginBottom: 10,
        marginTop: 10,
        textShadowRadius: 3,
        textShadowColor: '#a14700',
        textShadowOffset: {
            width: 1,
            height: 1,
        },     
    },
    valueArea: {
        width: '50%',
        backgroundColor: '#0E52BF',
    },
    values: {
        backgroundColor: '#fff',
        borderColor: '#ababaa',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    value: {
        color: '#202020',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    pay: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fcea00',
    },  
    botton: {
        button: {
            width: '100%',
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#04EE51',
            borderColor: '#00d446',
            borderWidth: 2,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },  
        text: {
            fontSize: 25,
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadowRadius: 3,
            textShadowColor: '#616161',
                textShadowOffset: {
                width: 1,
                height: 1,
            },     
        }
    },
})

export default StatusTime
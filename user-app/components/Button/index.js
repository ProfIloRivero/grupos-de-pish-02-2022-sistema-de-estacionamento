import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ( { title, action, style }) => {
    return (
        <Pressable style={style ? style.button ? style.button : defaultStyle.button : defaultStyle.button} onPress={action}>
            <Text style={style ? style.text ? style.text : defaultStyle.text : defaultStyle.text}>{title}</Text>
        </Pressable>
    )
}

const defaultStyle = StyleSheet.create({
    button: {
        backgroundColor: '#ffff',
        borderWidth: 1,
        padding: 10,
        width: '33%'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
})

export default Button
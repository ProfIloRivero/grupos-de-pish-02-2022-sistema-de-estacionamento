import { StatusBar, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E52BF',
        height: '100%',
        width: '100%',
        padding: 4,
    },
    contentArea: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#cfcfcf',
        borderWidth: 4,
        borderColor: '#8a8a8a',
        borderRadius: 10,
    },
    formArea: {
        paddingTop: 30,
        paddingBottom: 50,
        backgroundColor: '#fffa',
        justifyContent: 'center',
        alignItems: 'center',
    },    
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#278afc',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    button: {
        button: {
            marginTop: 20,
            backgroundColor: '#278afc',
            height: 70,
            width: '60%',
            borderRadius: 10,
            borderWidth: 4,
            borderColor: '#1a6091',
            borderTopWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
        },
        text: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
    },
    buttonArea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    exit: {
        button: {
            width: '100%',
            padding: 15,
            backgroundColor: '#f42b1c',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
        },
    },
    logo: {
        resizeMode: 'stretch',
        width: 100,
        height: 100,
    },
    inputArea: {
        width: '100%',
        height: '70%',
        backgroundColor: '#278afc',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        color: '#111f',
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#0004',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: 10
    },
    link: {
        marginTop: 15,
    }, 
    textLink: {
        color: '#0E52BF',
        fontSize: 20,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    qrc: {
        width: 200,
        height: 200,
        borderWidth: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default style
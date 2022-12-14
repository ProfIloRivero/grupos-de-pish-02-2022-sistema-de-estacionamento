import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E52BF',
        height: '100%',
        width: '100%',
    },
    formArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bcbcbc',
        borderWidth: 5,
        borderColor: '#8a8a8a',
        height: 650,
        width: '95%',
        padding: 5,
        borderRadius: 10,
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
    buttonArea: {
        width: '100%',
        height: '30%',
        backgroundColor: '#bcbcbc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    button: {
        backgroundColor: '#278afc',
        height: 60,
        width: '70%',
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
    }
})

export default style
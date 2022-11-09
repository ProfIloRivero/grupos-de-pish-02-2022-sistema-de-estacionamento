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
    header: {
        backgroundColor: '#278afc',
        height: 60,
        width: '98%',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderWidth: 4,
        borderBottomWidth: 0,
        borderColor: '#8a8a8a',
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
    contentArea: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#cfcfcf',
        borderWidth: 4,
        borderTopWidth: 0,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderColor: '#8a8a8a',
        height: '90%',
        width: '98%',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    qrc: {
        width: 230,
        height: 230,
        borderWidth: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
})

export default style
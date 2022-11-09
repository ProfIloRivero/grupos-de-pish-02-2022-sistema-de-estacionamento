import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Button, AppState } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [lifeState, setLifeState] = useState(AppState.currentState)
  const [idQR, setIdQR] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {

    const eventListner = AppState.addEventListener('change', () => {
      setLifeState(AppState.currentState)
    })

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    return () => {
      getBarCodeScannerPermissions()
      eventListner.remove()
    }
  }, [])
       
  const fetchData = async (id) => {
    const res = await fetch(`https://c540-2804-14c-5bb1-4188-29a1-b175-b83b-b8e0.sa.ngrok.io/pish-64141/us-central1/app/api/access/${id}`, {
      method: 'get',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
    })
    if(res.status != 200){
      setErr('err')
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    
    const {id} = JSON.parse(data)

    if(id){
      setIdQR(id)
      fetchData(id)
    }
    WaitTime()
  }

  const QRreader = () => {
    if(lifeState == 'active'){
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    }else {
      return (<></>)
    }
  }

  const WaitTime = () => {
    setTimeout(() => {
      setScanned(false)
      setErr(false)
    }, 10000) // 10 segundos
  }

  return (
    <View style={styles.container}>
      {QRreader()}
      {scanned ? <Button title={`-----[${err ? err : idQR}]-----`}/> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
})
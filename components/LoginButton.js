import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginButton = (props) => {

  return (
    <TouchableOpacity
        style={{
            ...styles.btn,
            ...props.style
        }}
        onPress={props.onPress}
    >
        <Text style={{
            fontSize: 20,
            fontWeight: '800',
            color: 'white'
        }}>
            {props.title}
        </Text>
    </TouchableOpacity>
  )
}

export default LoginButton

const styles = StyleSheet.create({
    btn:{
        paddingVertical: 18,
        borderColor: '#41ADFA',
        borderWidth: 1,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#41ADFA'
    }
})
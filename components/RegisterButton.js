import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RegisterButton = (props) => {
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
            color: '#2D2D2D'
        }}>
            {props.title}
        </Text>
    </TouchableOpacity>
  )
}

export default RegisterButton

const styles = StyleSheet.create({
    btn:{
        paddingVertical: 18,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9'
    }
})
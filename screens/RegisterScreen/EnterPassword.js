import { StyleSheet, Text, View,TextInput, Pressable, } from 'react-native'
import React, { useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const EnterPassword = ({ onIsNextButtonDisabledChange, onSubmitPass }) => {
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const isNextButtonDisabled = password !== '' && !error;
        onIsNextButtonDisabledChange(isNextButtonDisabled);
    }, [error, password]);

    const handleTextChange = (text) => {
        if (text.length < 6) {
            setError('Mật khẩu phải từ 6 ký tự trở lên');
          }else{
            setError('');
            onSubmitPass(text);
        }
    };

    const handleFocusChange = (fieldName) => {
        setFocusedInput(fieldName);
      };
  return (
    <View>
      <View style={{ position: 'relative' }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        handleTextChange(text)}}
                    style={[
                        styles.textInputPass,
                        focusedInput === 'password' && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
                    ]}
                    placeholder='Mật khẩu'
                    secureTextEntry={!showPassword}
                    onFocus={() => {
                        handleFocusChange('password');
                    }}
                    onBlur={() => handleFocusChange('')}
                    
                />
                <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#757575'}
                    style={{ position: 'absolute', right: 10, top: 30 }}
                    onPress={() => setShowPassword(!showPassword)}
                />
                {password !== '' && error && <Text style={{ color: 'red', marginTop: 10}}>{error}</Text>}
            </View>
    </View>
  )
}

export default EnterPassword

const styles = StyleSheet.create({
    textInputPass: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        padding: 4,
        fontSize: 18,
        marginTop: 20,
    },
})
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import icons from '../../constants/icons';

const EnterEmail = ({ onIsNextButtonDisabledChange, onSubmitEmail }) => {
    const [email, setEmail] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isNextButtonDisabled = email !== '' && !error;
        onIsNextButtonDisabledChange(isNextButtonDisabled);
    }, [error, email]);

    const regexEmail = /^([a-zA-Z0-9_\-\+\.]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z]{2,63})$/;
    const handleTextChange = (text) => {
        if (!regexEmail.test(text)) {
            setError('Email chưa đúng định dạng');
          }else{
            setError('');
            onSubmitEmail(text);
        }
    };

    const handleFocusChange = (fieldName) => {
        setFocusedInput(fieldName);
      };

      const handleClearText = () => {
        setEmail('');
        setFocusedInput('');
    };
  return (
    <View>
            <View style={{ position: 'relative' }}>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        handleTextChange(text)}}
                    style={[
                        styles.textInputEmail,
                        (focusedInput === 'email') && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
                    ]}
                    placeholder='Email'
                    onFocus={() => {
                        handleFocusChange('email');
                    }} 
                    onBlur={() => handleFocusChange('')}
                    keyboardType="email-address"
                />
                {email !== '' && error && <Text style={{ color: 'red', marginTop: 10,}}>{error}</Text>}
                {email !== '' && (
                    <TouchableOpacity onPress={handleClearText} style={{ position: 'absolute', right: 10, top: 25 }}>
                        <Image source={icons.clear}/>
                    </TouchableOpacity>
                )}
            </View>
    </View>
  )
}

export default EnterEmail

const styles = StyleSheet.create({
    textInputEmail: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        padding: 4,
        fontSize: 18,
        marginTop: 15,
    },
})
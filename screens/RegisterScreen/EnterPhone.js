import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, Image} from 'react-native'
import React, { useState, useEffect} from 'react'
import icons from '../../constants/icons';

const EnterPhone = ({ onIsNextButtonDisabledChange, onSubmitPhone }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isNextButtonDisabled = phoneNumber !== '' && !error;
        onIsNextButtonDisabledChange(isNextButtonDisabled);
    }, [error, phoneNumber]);

    const regexVNPhoneNumber = /^0[35789]\d{8}$/;

    const handleTextChange = (text) => {
        if (!regexVNPhoneNumber.test(text)) {
            setError('Số điện thoại chưa đúng. Phải đủ 10 số');
          }else{
            setError('');
            onSubmitPhone(text);
        }
    };

    const handleFocusChange = (fieldName) => {
        setFocusedInput(fieldName);
      };

      const handleClearText = () => {
        setPhoneNumber('');
        setFocusedInput('');
    };

  return (
    <View>
            <View style={{ position: 'relative' }}>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        handleTextChange(text)}}
                    style={[
                        styles.textInputPhone,
                        (focusedInput === 'phoneNumber') && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
                    ]}
                    placeholder='Số điện thoại'
                    onFocus={() => {
                        handleFocusChange('phoneNumber');
                    }} 
                    onBlur={() => handleFocusChange('')}
                    keyboardType={'numeric'}
                />
                {phoneNumber !== '' && error && <Text style={{ color: 'red', marginTop: 10,}}>{error}</Text>}
                {phoneNumber !== '' && (
                    <TouchableOpacity onPress={handleClearText} style={{ position: 'absolute', right: 10, top: 25 }}>
                        <Image source={icons.clear}/>
                    </TouchableOpacity>
                )}
            </View>
    </View>
  )
}

export default EnterPhone

const styles = StyleSheet.create({
    textInputPhone: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        padding: 4,
        fontSize: 18,
        marginTop: 15,
    },
})
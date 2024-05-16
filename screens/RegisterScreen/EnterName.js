import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react'
import icons from '../../constants/icons';

const EnterName = ({ onIsNextButtonDisabledChange, onSubmitName }) => {
    const [name, setName] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isNextButtonDisabled = name !== '' && !error;
        onIsNextButtonDisabledChange(isNextButtonDisabled);
    }, [error, name]);

    const handleTextChange = (text) => {
        if( /[0-9]/.test(text)) {
            setError('Tên không được chứa chữ số');
        } else if(text.length < 2 || text.length > 40){
            setError('Tên quá ngắn. Tên hợp lệ phải gồm 2-40 ký tự');
        } else{
            setError('');
            onSubmitName(text);
        }
    };

    const handleFocusChange = (fieldName) => {
        setFocusedInput(fieldName);
      };

    const handleClearText = () => {
        setName('');
        setFocusedInput('');
    };

  return (
    <View>
        <View style={{ position: 'relative'}}>
        <TextInput
            value={name}
            onChangeText={(text) => {
                setName(text);
                handleTextChange(text)}}
            style={[
                styles.textInputName,
                (focusedInput === 'name') && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
            ]}
            placeholder='Tên hiển thị'
            onFocus={() => {
                handleFocusChange('name');
            }} 
            onBlur={() => handleFocusChange('')}
        />
        {name !== '' && error && <Text style={{ color: 'red', marginTop: 10}}>{error}</Text>}
        {name !== '' && (
            <TouchableOpacity onPress={handleClearText} style={{ position: 'absolute', right: 10, top: 30 }}>
                <Image source={icons.clear}/>
            </TouchableOpacity>
        )}
        </View>    
    </View>
  )
}

export default EnterName

const styles = StyleSheet.create({
    textInputName: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        padding: 4,
        fontSize: 18,
        marginTop: 20,
    },
})
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, ActivityIndicator} from 'react-native'
import React, { useState} from 'react'
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import icons from '../constants/icons';
import images from '../constants/images';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleFocusChange = (fieldName) => {
      setFocusedInput(fieldName);
    };
  
    const handleClearText = () => {
      setEmail('');
      setFocusedInput('');
      setIsFocused(true);
    };

    const forgotPasssword = async () => {
      return sendPasswordResetEmail(auth, email)
        .then((userCredential) => {
          alert('Đã gửi email đặt lại mật khẩu!');
          navigation.goBack();
        })   
        .catch((error) => {
          alert(error);
        });
    };

    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        forgotPasssword()
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      }, 3000);
    };
  
    return (
      <View style={styles.container}>
  
        <Header title="Lấy lại mật khẩu"/>
  
        <View style={styles.requestContainer}>
            <Text style={{fontSize: 14, color: '#4F4F4F'}}>Nhập email để lấy lại mật khẩu</Text>
        </View>
  
        <View style={styles.infoContainer}>
          <Image source={images.pass} style={{top: 20}}/>
  
          <View style={{ position: 'relative' }}>
                  <TextInput
                      value={email}
                      onChangeText={(text) => {setEmail(text)}}
                      style={[
                          styles.textInputEmail,
                          (isFocused || focusedInput === 'email') && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
                      ]}
                      placeholderTextColor={'#939393'}
                      placeholder='Email'
                      onFocus={() => {handleFocusChange('email');}} 
                      onBlur={() => handleFocusChange('')}
                      keyboardType="email-address"
                  />
                  {email !== '' && (
                      <TouchableOpacity onPress={handleClearText} style={{ position: 'absolute', right: 0, top: 50 }}>
                          <Image source={icons.clear}/>
                      </TouchableOpacity>
                  )}
              </View>
        </View>

        <View style={styles.btnNextContainer}>    
        {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#41ADFA" />  
            </View>
        ) : (  
            <Pressable 
                style={[styles.nextContainer, { alignItems: 'center' }]}
                onPress={handleSubmit}
            >
                <Image
                    source={icons.next}
                    style={styles.nextIcon}
                />
            </Pressable>
        )}
        </View>
  
      </View>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      requestContainer: {
        alignItems:'flex-start',
        backgroundColor: '#ECECEC',
        height: 40,
        left: 20,
        justifyContent: 'center'
      },
      infoContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      textInputEmail: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        padding: 4,
        fontSize: 18,
        marginTop: 40,
    },
      btnNextContainer: {
        alignItems:'flex-end',
        backgroundColor: 'white',
        orderRadius: 20,
    },
    nextContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#41ADFA',
        padding: 15,
        borderRadius: 10,
        right: 15,
        bottom: 15
    },
    loadingContainer: {
      position: 'absolute',
      top: -100,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextIcon: {
      width: 20,
      height: 20,
      tintColor: 'white',
      alignSelf: 'center'
  },
})
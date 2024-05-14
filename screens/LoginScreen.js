import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native'
import React, { useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import icons from '../constants/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { useAuth, AuthContextProvider } from '../context/authContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const handleFocusChange = (fieldName) => {
        setFocusedInput(fieldName);
      };
    
    const handleForgotPasswordScreen = () => {
        navigation.navigate('ForgotPasswordScreen');
    };

    const handleClearText = () => {
        setEmail('');
        setFocusedInput('');
    };

    const signIn = async () => {
        await login(email, password);
      };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
          signIn()
            .then(() => {
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }, 3000);
      };

  return (
    <View style={styles.container}>

        <Header title="Đăng nhập"/>

        <View style={styles.requestContainer}>
          <Text style={{fontSize: 14, color: '#4F4F4F'}}>Vui lòng nhập email và mật khẩu để đăng nhập</Text>
        </View>

        <View style={styles.infoContainer}>
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
                    onFocus={() => {
                        handleFocusChange('email');
                        setIsFocused(true);
                    }} 
                    onBlur={() => handleFocusChange('')}
                    keyboardType="email-address"
                />
                {email !== '' && (
                    <TouchableOpacity onPress={handleClearText} style={{ position: 'absolute', right: 0, top: 30 }}>
                        <Image source={icons.clear}/>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ position: 'relative' }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={[
                        styles.textInputPass,
                        focusedInput === 'password' && { borderBottomColor: '#41ADFA', borderBottomWidth: 2, },
                    ]}
                    placeholderTextColor={'#939393'}
                    placeholder='Mật khẩu'
                    secureTextEntry={!showPassword}
                    onFocus={() => {
                        handleFocusChange('password');
                        setIsFocused(false);
                    }}
                    onBlur={() => handleFocusChange('')}
                />
                <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#757575'}
                    style={{ position: 'absolute', right: 0, top: 5 }}
                    onPress={() => setShowPassword(!showPassword)}
                />
            </View>

            <Text onPress={handleForgotPasswordScreen} style={styles.resetContainer}>Lấy lại mật khẩu</Text>
        </View>

        <View style={styles.btnNextContainer}>  
        {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#41ADFA" />  
            </View>
        ) : (    
            <Pressable 
                style={[styles.nextContainer, 
                    { backgroundColor: (!email || !password) ? '#DDDDDD' : '#41ADFA'},
                    { alignItems: 'center' }]}
                disabled={!email || !password}
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

const LoginScreenWithContext = () => {
    return (
      <AuthContextProvider>
        <LoginScreen />
      </AuthContextProvider>
    );
  };
  
export default LoginScreenWithContext;

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
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
    },
    textInputEmail: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        paddingBottom: 8,
        fontSize: 16,
        marginVertical: 30,
    },
    textInputPass: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width: 320,
        paddingBottom: 8,
        fontSize: 16,
    },
    resetContainer: {
        marginTop: 30,
        marginRight: 200,
        fontSize: 16, 
        color: '#41ADFA', 
        fontWeight: '800',
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
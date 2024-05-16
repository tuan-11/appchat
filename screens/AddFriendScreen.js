import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import icons from '../constants/icons';
import { useAuth, AuthContextProvider } from '../context/authContext';

const AddFriendScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const {notRegistered, getPhoneNumberUserData} = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);

    const regexVNPhoneNumber = /^0[35789]\d{8}$/;

    useEffect(() => {
        console.log('minh' + notRegistered);
        setIsRegistered(notRegistered);
    }, [notRegistered]);

    const handleTextChange = (text) => {
        if (!regexVNPhoneNumber.test(text)) {
            setError('Số điện thoại chưa đúng. Phải đủ 10 số');
          }else{
            setError('');
        }
    };

    const handleSubmit = async () => {
        const isRegistered = await getPhoneNumberUserData(phoneNumber);
        console.log(isRegistered);
        if(!isRegistered){
            navigation.navigate('OrtherUserScreenWithContext', { phoneNumber });
        }else{
            alert('Số điện thoại này chưa được đăng ký!');
        }
    }

    const handlePhoneBookPress = () => {
        navigation.navigate('Phonebook');
    }

  return (
    <View style={styles.container}>
      <Header title="Thêm bạn"/>

      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
            <TextInput
                value={phoneNumber}
                onChangeText={(text) => {
                    setPhoneNumber(text);
                    handleTextChange(text)}}
                style={styles.input}
                placeholder="Nhập số điện thoại"
                keyboardType={'numeric'}
            />
            <Pressable 
                style={[styles.nextContainer,
                    { backgroundColor: (error === '' && phoneNumber.length === 10) ? '#41ADFA' : '#DDDDDD'}]}
                disabled={error !== '' || phoneNumber.length !== 10}
                onPress={handleSubmit}
            >
                <Image source={icons.next} style={styles.nextIcon}/>
            </Pressable>
        </View>

        {phoneNumber !== '' && error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable style={styles.phonebookContainer} onPress={handlePhoneBookPress}>
            <View style={styles.phoneBook}>
                <Image source={icons.phonebookOutline} style={styles.phonebookIcon}/>
            </View>

            <View style={styles.phonebookTextContainer}>
                <Text style={styles.phonebookText}>Danh bạ máy</Text>
            </View>
        </Pressable>

        <Text style={styles.addFriendText}>Xem lời mời kết bạn đã gửi tại trang Danh bạ Sunchat</Text>
      </View>
    </View>
  )
}

const AddFriendScreenWithContext = () => {
    return (
      <AuthContextProvider>
        <AddFriendScreen/>
      </AuthContextProvider>
    );
  };
export default AddFriendScreenWithContext

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        height: 50,
        flex: 1,
        borderColor: '#41ADFA',
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 15,
        fontSize: 16,
        marginRight: 10,
    },
    nextContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#41ADFA',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    phonebookIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    phonebookContainer: {
        flexDirection: 'row',
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 20
    },
    phoneBook: {
        width: 40,
        height: 40,
        backgroundColor: '#41ADFA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phonebookTextContainer: {
        justifyContent: 'center',
        height: 40,
        marginLeft: 20,
    },
    phonebookText: {
        fontSize: 16,
    },
    addFriendText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        color: 'black',
        paddingVertical: 20,
        paddingHorizontal: 40,
    },

    errorText: {
        flexDirection: 'row',
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 20,
        color: 'red', marginTop: 10,
    },
    notRegisteredText: {
        flexDirection: 'row',
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 20,
        color: 'red', marginTop: 10,
    }
})
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native'
import React, { useState} from 'react'
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import {useAuth, AuthContextProvider} from '../context/authContext'
import { StreamChat } from 'stream-chat';

const EditNameScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const {user, getUserData, updateUserNameData} = useAuth();
    const [loading, setLoading] = useState(false);

    const showToast = () => {
        ToastAndroid.show(
          "Tên mới được cập nhật thành công!",
          5000,
          ToastAndroid.BOTTOM
        )
      }

    const handleSave = async () => {
        try {
          if (name.trim() === '') {
            console.log('Vui lòng nhập tên mới');
            return;
          }
    
          await updateUserNameData(name);
          await getUserData(user.userId);

          showToast();
          navigation.goBack();

        } catch (error) {
          console.error('Lỗi khi cập nhật tên mới:', error);
        }
      };

      const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            handleSave()
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

        <Header title="Đổi tên hiển thị"/>
  
        <View style={styles.infoContainer}>
  
          <View style={{ position: 'relative' }}>
                  <TextInput
                    value={name}
                    onChangeText={(text) => {setName(text)}}
                    style={styles.input}
                    placeholder="Nhập tên mới"
                    />
          </View>
            {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#41ADFA" />  
            </View>
            ) : (
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
            )}
        </View>
      </View>
    )
}

const EditNameScreenWithContext = () => {
    return (
      <AuthContextProvider>
        <EditNameScreen />
      </AuthContextProvider>
    );
  };
  
export default EditNameScreenWithContext;

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
    input: {
        height: 50,
        width: 300,
        borderColor: '#41ADFA',
        borderWidth: 1.5,
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
        marginTop: 40,
        fontSize: 16,
      },
      saveButton: {
        backgroundColor: '#41ADFA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
})
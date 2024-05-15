import { StyleSheet, Text, View, Image,TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import icons from '../constants/icons'
import { useNavigation } from '@react-navigation/native';
import {useAuth, AuthContextProvider} from '../context/authContext'
import * as ImagePicker from 'expo-image-picker'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {user, logout, getUserData, updateUserUrlData } = useAuth();

  useEffect(() => {
    if (user && user.userId) {
        getUserData(user.userId);
    }
  }, [user]);

  const showToast = () => {
    ToastAndroid.show(
      "Ảnh đại diện mới được cập nhật thành công!",
      5000,
      ToastAndroid.BOTTOM
    )
  }

  const handleEditPress = () => {
    navigation.navigate('EditNameScreenWithContext');
  };
  
  const handleLogout = async () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              await logout();
              navigation.navigate('LoginScreenWithContext'); 
            } catch (error) {
              console.error('Lỗi khi đăng xuất:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await updateUserUrlData(result.assets[0].uri);
      await getUserData(user.userId);
      showToast();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
      <View style={{flex: 1}} />

        <TouchableOpacity>
          <Image source={{ uri: user?.userUrl }} style={styles.avatar} />
          <TouchableOpacity onPress={pickImage} style={styles.cameraIconContainer}>
            <Image source={icons.camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={icons.logout} style={styles.logout} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.requestContainer}>
      <View style={styles.infoRow1}>
        <Text style={styles.label}>Tên hiển thị:</Text>
        <Text style={styles.value}>{user?.name}</Text>
        <TouchableOpacity onPress={handleEditPress}>
          <Image source={icons.edit} style={styles.edit} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{user?.phoneNumber}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Ngày sinh:</Text>
        <Text style={styles.value}>{user?.dayOfbirth}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Giới tính:</Text>
        <Text style={styles.value}>{user?.gender}</Text>
      </View>
      </View>
      
    </View>
  )
}

const ProfileScreenWithContext = () => {
  return (
    <AuthContextProvider>
      <ProfileScreen />
    </AuthContextProvider>
  );
};

export default ProfileScreenWithContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A4CEFF',
  },
  requestContainer: {
    alignItems:'flex-start',
    backgroundColor: '#FFFFFF',
    height: 550,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 250
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginRight: 20,
  },
  logout: {
    marginRight: 30,
    marginBottom: 100
  },
  infoRow1: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 20
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 14
  },
  value: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    marginRight: 5
  },
  edit: {
    marginRight: 15
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#A4CEFF',
  },
  cameraIcon: {
    width: 20, 
    height: 20,
  },
})
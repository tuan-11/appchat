import { StyleSheet, Text, View, Image,TouchableOpacity, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import icons from '../constants/icons'
import { useNavigation } from '@react-navigation/native';
import {useAuth, AuthContextProvider} from '../context/authContext'

const OrtherUserScreen = ({ route }) => {
  const navigation = useNavigation();
  const {otherUser, getPhoneNumberUserData} = useAuth();
  const { phoneNumber } = route.params;

  useEffect(() => {
    if (phoneNumber) {
      getPhoneNumberUserData(phoneNumber);
    }
  }, [phoneNumber]);

  const handleSubmitMessage = () => {

  }

  const handleSubmitvoiceCall = () => {

  };
  
  const handleSubmitvideoCall = () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Image source={{ uri: otherUser?.userUrl }} style={styles.avatar} />
        <Text style={styles.valueName}>{otherUser?.name}</Text>

        <View style={styles.iconContainer}>
          <Pressable style={[styles.contactContainer]} onPress={handleSubmitMessage}>
            <Image source={icons.chat} style={styles.contactIcon}/>
          </Pressable>

          <Pressable style={[styles.contactContainer]} onPress={handleSubmitvoiceCall}>
            <Image source={icons.phone} style={styles.contactIcon} />
          </Pressable>

          <Pressable style={[styles.contactContainer]} onPress={handleSubmitvideoCall}>
            <Image source={icons.videoCall} style={styles.contactIcon} />
          </Pressable>
        </View>
      </View>
      
        <View style={styles.requestContainer}>
          <View style={styles.infoRow1}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{otherUser?.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{otherUser?.phoneNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Ngày sinh:</Text>
            <Text style={styles.value}>{otherUser?.dayOfbirth}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Giới tính:</Text>
            <Text style={styles.value}>{otherUser?.gender}</Text>
          </View>
      </View>
    </View>
  )
}

const OrtherUserScreenWithContext = ({ route }) => {
  return (
    <AuthContextProvider>
      <OrtherUserScreen route={route}/>
    </AuthContextProvider>
  );
};

export default OrtherUserScreenWithContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A4CEFF',
  },
  requestContainer: {
    alignItems:'flex-start',
    backgroundColor: '#FFFFFF',
    height: 500,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    top: 330,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute'
  },
    profileInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
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
  valueName: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '800',
    color: 'black'
  },
  backIconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  contactContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#0784DF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  contactIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import icons from '../constants/icons';

const FriendRequestItem = ({ requester, onAccept, onDecline }) => {

  return (
    <View style={styles.container}>
      {requester.data.image ? (
        <Image source={{ uri: requester.data.image }} style={styles.avatar} /> 
      ):(
        <Image source={icons.avatar} style={styles.avatar} /> 
      )}
      <Text style={styles.name}>{requester.data.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Text style={styles.buttonAcceptText}>Chấp nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
          <Text style={styles.buttonRejectText}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin:4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  acceptButton: {
    width: 80,
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#c1dcff',
    borderRadius: 5,
  },
  declineButton: {
    marginLeft: 10,
    width: 80,
    padding: 5,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
  },
  buttonAcceptText: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonRejectText:{
    color:'red',
    textAlign: 'center',
    fontWeight: '700',
  }
});

export default FriendRequestItem;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { OnlineIndicator } from "./OnlineIndicator";
import { Icon } from "react-native-elements";
import icons from "../constants/icons";

const ContactResult = ({
    user,
    contact,
    isFriend,
    onCall,
    onAddFriend,
    isCurrentUser,
  }) => {
    // if (isCurrentUser) {
    //   return null;
    // }
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            {console.log('image' + user.userUrl)}
            {user.userUrl? (
              <Image source={{ uri: user.userUrl }} style={styles.avatar} />
            ) : (
              <Image
                source={icons.avatar}
                style={styles.avatar}
              />
            )}
            <View style={styles.onlineIndicator}>
              <OnlineIndicator online={user.online} />
            </View>
          </View>
          <View>
            {contact && <Text style={styles.contactName}>{contact.name}</Text>}
            <Text style={styles.userName}>Tên Sunchat: {user.name}</Text>
        </View>
        </View>
  
        {isFriend ? (
          <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.rightItem} >
            <Icon name="call-outline" type="ionicon" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightItem} >
            <Icon name="videocam-outline" type="ionicon" size={24} />
          </TouchableOpacity>
        </View>
        ) : (
          <TouchableOpacity style={styles.actionButton} onPress={onAddFriend}>
            <Text style={styles.actionButtonText}>Kết bạn</Text>
          </TouchableOpacity>
        )}
      </View>
    );
}

export default ContactResult

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      },
      userInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      avatarContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      userName: {
        fontSize: 14,
        color: '#797C7B'
      },
      contactName:{
        fontSize: 18,
        fontWeight: "bold",
      },
      actions: {
        flexDirection: "row",
      },
      actionButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
        borderRadius:25,
        backgroundColor:"#c1dcff"
      },
      actionButtonText: {
        color: "#0784DF",
        fontSize: 14,
        fontWeight:"700",
      },
      onlineIndicator: {
        position: "absolute",
        right: 12,
        bottom: 0,
      },
      rightContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginRight:14,
      },
      rightItem:{
        marginHorizontal:10,
      }
})
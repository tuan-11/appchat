import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import icons from "../constants/icons";

const FriendListItem = ({ user }) => {
  const openCall = () => {};
  const openVideo = () => {};
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={icons.avatar}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.rightItem} onPress={openCall}>
            <Icon name="call-outline" type="ionicon" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightItem} onPress={openVideo}>
            <Icon name="videocam-outline" type="ionicon" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  avatar: {
    marginLeft:10,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    marginLeft:24
  },
  name: {
    marginLeft:8,
    fontSize: 16,
  },
  tinyLogo: {
    width: 24,
    height: 24,
    marginStart: 24,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight:14,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightItem:{
    marginHorizontal:10,
  }
});

export default FriendListItem;

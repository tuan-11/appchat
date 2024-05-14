import React from "react";
import { View, StyleSheet } from "react-native";
import NavigationStack from "../navigations/NavigationStack";

const MessageScreen = ({ userId, userToken }) => {
  return (
    <View style={styles.container}>
      <NavigationStack userId={userId} userToken={userToken}/>
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { ChannelPreviewMessenger, useTheme } from "stream-chat-expo";
import { Icon } from "@rneui/themed";
import { useAppContext } from "../context/AppContext";

const styles = StyleSheet.create({
  rightSwipeableButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 20,
    backgroundColor: "red",
  },
});

export const CustomeListItem = (props) => {
  const { channel } = props;
  const {chatUserId} = useAppContext();
  const {
    theme: {
      colors: { accent_red, white_smoke },
    },
  } = useTheme();
  const deleteMessages = async () => {
    try {
      const response = await channel.truncate({
        hard_delete: true,
        skip_push: false,
        message: {
          text: "Messages were deleted",
          user_id: chatUserId,
        },
      });
    } catch (error) {
      console.log("Error deleting messages:", error);
    }
  };
  return (
    <Swipeable
      overshootLeft={false}
      overshootRight={false}
      renderRightActions={() => (
        <RectButton rippleColor="#fff" onPress={deleteMessages}>
          <View style={styles.rightSwipeableButton}>
            <Icon name="trash-outline" type="ionicon" size={24} color="#fff" />
          </View>
        </RectButton>
      )}
    >
      <ChannelPreviewMessenger {...props} />
    </Swipeable>
  );
};

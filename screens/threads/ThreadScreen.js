import React from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { Channel, Thread} from "stream-chat-expo";

const ThreadScreen = () => {
  const { channel, thread } = useAppContext();

  return (
    <View>
      <Channel channel={channel} thread={thread} threadList>
        <Thread />
      </Channel>
    </View>
  );
};

export default ThreadScreen;
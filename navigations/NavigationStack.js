import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider} from "../context/AppContext";
import ChannelListScreen from "../screens/channels/ChannelListScreen";
import ChannelScreen from "../screens/channels/ChannelScreen";
import ThreadScreen from "../screens/threads/ThreadScreen"
import FriendListScreen from "../screens/FriendListScreen";
import FriendRequestListScreen from "../screens/FriendRequestListScreen";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "../chatConfig";
import useChatClient from "../api/useChatClient";

const Stack = createStackNavigator();

const NavigationStack = ({ userId, userToken }) => {
  console.log("navi usser"+userId );
  console.log("navi token"+userToken);
    const { clientIsReady} = useChatClient(userId, userToken);
    const chatClient = StreamChat.getInstance(chatApiKey);
    if (!clientIsReady) {
      return (
          <ActivityIndicator
            style={{ alignSelf: "auto" }}
            size="large"
            color="#0000ff"
          />
      );
    }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChannelList"
            component={ChannelListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChannelScreen"
            component={ChannelScreen}
            options={{ headerShown: false, tabBarStyle: { display: 'none' }}}
          />
          <Stack.Screen
            name="ThreadScreen"
            component={ThreadScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FriendListScreen"
            component={FriendListScreen}
            options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
          />
          <Stack.Screen
            name="FriendRequestListScreen"
            component={FriendRequestListScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default ({ userId, userToken }) => {
  return (
    <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationStack userId={userId} userToken={userToken}/>
          </SafeAreaView>
        </GestureHandlerRootView>
    </AppProvider>
  );
};

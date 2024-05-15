// useChatClient.js

import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { chatApiKey, chatUserId, chatUserToken } from "../chatConfig";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/authContext";
import { getToken } from "../server/useApi";
const chatClient = StreamChat.getInstance(chatApiKey);
const useChatClient = (userId, userToken) => {
  const { setChatClient, setUser, setChatUserId, chatUserId, chatUserToken } =
    useAppContext();
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        const token = await getToken(userId);
        console.log("get token in usechatclient: " + token);

        const client = await chatClient.connectUser(
          { id: userId },
          chatClient.devToken(userId)
        );
        console.log(
          "client in chat client: " + JSON.stringify(chatClient.userID)
        );
        console.log("user1: " + userId);
        console.log("user1: " + userToken);
        setChatUserId(userId);
        setClientIsReady(true);
        setChatClient(chatClient);
        const response = await chatClient.queryUsers({
          id: { $in: [userId] },
        });
        if (!response.users[0].hasOwnProperty("friends")) {
          try {
            const updatedUser = await chatClient.partialUpdateUser({
              id: userId,
              set: {
                friends: [], // Mảng chứa các ID của bạn bè
              },
            });
          } catch (error) {
            console.error(
              `An error occurred while update user'prop: ${error.message}`
            );
          }
        }
        setUser(response.users[0]);
        console.log("user.friends:  " + response.users[0]);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`
          );
        }
      }
    };

    console.log(1);
    if (!chatClient.userID) {
      setupClient();
    }
  }, [userId]);

  return {
    clientIsReady,
  };
};

export default useChatClient;

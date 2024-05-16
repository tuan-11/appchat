  // useChatClient.js

  import { useEffect, useState } from "react";
  import { StreamChat } from "stream-chat";
  import { chatApiKey, chatUserId, chatUserToken} from "../chatConfig";
  import { useAppContext } from "../context/AppContext";
  import { useAuth } from "../context/authContext";

  // const partialUpdateUser = async () => {
  //   try {
  //     const updatedUser = await chatClient.partialUpdateUser({
  //       ...user,
  //       set: {
  //         friends: [], // Mảng chứa các ID của bạn bè
  //       },
  //     });
  //   } catch (error) {
  //     console.error(`An error occurred while update user'prop: ${error.message}`);
  //   }
  // };
    // const user = {
    //   id: userId,
    //   name: chatUserName,
    // };
  const chatClient = StreamChat.getInstance(chatApiKey, {
    timeout: 6 * 1000,
  });
  const useChatClient = (userId, userToken) => {
    const { setChatClient, setUser, setChatUserId, chatUserId, chatUserToken } =
    useAppContext();
    const [clientIsReady, setClientIsReady] = useState(false);

    useEffect(() => { 
      const setupClient = async () => {
        try {
          console.log('user2: ' + userId);
          console.log('token2: ' + userToken);
          const client = chatClient.connectUser({id: userId}, userToken);

          setClientIsReady(true);
          setChatClient(chatClient);
          // partialUpdateUserQT();
          setChatUserId(userId);
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              `An error occurred while connecting the user: ${error.message}`
            );
          }
      };  
    }
      const getUserInfo = async () => {
        try {
          const response = await chatClient.queryUsers({
            id: { $in: [userId] },
          });
          if (!response.users[0].friends) {
            try {
              const updatedUser = await chatClient.partialUpdateUser({
                id: userId,
                set: {
                  friends: [], // Mảng chứa các ID của bạn bè
                },
              });
            } catch (error) {
              console.error(`An error occurred while update user'prop: ${error.message}`);
            }
          }
          setUser(response.users[0]);
        } catch (error) {
          console.error(`An error occurred while getting user: ${error.message}`);
        }
      };
      getUserInfo();
      if (!chatClient.userID) {
        setupClient();
      }
    }, [userId, userToken]);

    return {
      clientIsReady,
    };
  };

  export default useChatClient;

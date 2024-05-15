import React, { useState, useEffect } from "react";


export const AppContext = React.createContext({
  chatClient: null,
  channel: null,
  setChannel: (channel) => {},
  channelList:null,
  setChannelList:(channelList)=>{},
  thread: null,
  setThread: (thread) => {},
  chatClient: null,
  setChatClient: (chatClient) => {},
  user:null,
  setUser: (user) => {},
  searchResults:null,
  setSearchResults:(results)=>{},
  chatUserId:null,
  setChatUserId: (chatUserId) => {},
});
export const AppProvider = ({ children }) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();
  const [chatClient, setChatClient] = useState();
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [channelList,setChannelList] = useState([]);
  const [chatUserId,setChatUserId] = useState();
  const [chatUserToken, setChatUserToken] = useState();
  return (
    <AppContext.Provider
      value={{
        chatClient,
        setChatClient,
        channel,
        setChannel,
        thread,
        setThread,
        user,
        setUser,
        searchResults,
        setSearchResults,
        channelList,
        setChannelList,
        chatUserId,
        setChatUserId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => React.useContext(AppContext);

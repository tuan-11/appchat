import React, { useState } from "react";
import { View, Button, StyleSheet,TouchableOpacity, Image, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { ChannelList} from "stream-chat-expo";
import { CustomPreviewTitle } from "../../components/PreviewTitle";
import { CustomeListItem } from "../../components/CustomeListItem";
import SearchHeader from "../../components/SearchHeader";

const ChannelListScreen = (props) => {
  const { chatUserId,setChannel, user: currentUser } = useAppContext();
  console.log("user current is "+ chatUserId);
  console.log("user current is "+ JSON.stringify(currentUser));
  const filter = { members: { $in: [chatUserId] } };
  const sort = [{ last_message_at: -1 }];
  const [isSearching, setIsSearching] = useState(false);
  const navigateToFriendListScreen = () => {
    props.navigation.navigate("FriendListScreen");
  };
  return (
    <View style={styles.container}>

      <SearchHeader isSearching={isSearching} setIsSearching={setIsSearching}/>

      {!isSearching && (
        <ChannelList
          onSelect={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate("ChannelScreen");
          }}
          filters={filter}
          sort={sort}
          PreviewTitle={CustomPreviewTitle}
          Preview={CustomeListItem}
        />
      )}

      <TouchableOpacity onPress={navigateToFriendListScreen}>
        <Text style={styles.buttonFriend}>Xem danh sách bạn bè</Text>
      </TouchableOpacity>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    right: 0,
    alignSelf: 'flex-end',
    marginRight: 20,
    top: -40
  },
  buttonFriend: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#41ADFA',
    color: '#fff',
    textAlign:"center",
    padding:20
},
});

export default ChannelListScreen;

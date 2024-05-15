// Channel.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Keyboard, ScrollView, RefreshControl, TouchableWithoutFeedback } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { Channel } from "stream-chat-expo";
import { MessageList, MessageInput, ChannelAvatar } from "stream-chat-expo";
import { SearchBar, Icon } from "@rneui/themed";
import { getOtherUserState, getPreviewName } from "../../hooks/useChannel";
import { OnlineIndicator } from "../../components/OnlineIndicator";
const ChannelScreen = (props) => {
  const { navigation } = props;
  const { chatClient, setChannel, channel, setThread, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState(""); // State for search query
  const [flagSearch, setFlagSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [otherUserState, setOtherUserState] = useState();
  const [isFriend, setIsFriend] = useState();


  // Tạo một tham chiếu tới flat của Message list
  const flatListRef = useRef(null);
  const openCall = () => {};
  const openVideo = () => {};
  const handleSearch = async () => {
    setRefreshing(true);
    try {
      console.log(1);
      const results = await chatClient.search(
        { id: channel.id },
        { text: { $autocomplete: searchTerm } },
        { limit: 15, sort: [{ create_at: -1 }] }
      );
      console.log(1);
      setSearchResults(results.results);
      searchResults.map((data) =>
        console.log("channelScreen line 42: " + data)
      );
    } catch (error) {
      console.error("Error searching messages:", error);
    }
    setRefreshing(false);
  };

  //xử lý khi một kết quả tìm kiếm được chọn => cuộn tới vị trí tin nhắn
  const handleSearchResultSelect = (messageId) => {
    const messageIndex = channel.state.messages.findIndex(
      (message) => message.id === messageId
    );
    flatListRef.current.scrollToIndex({ index: messageIndex });

    setSearchResults([]);
  };
  const openSearchBar = () => {
    setFlagSearch(true);
  };
  const closeSearchBar = () => {
    setFlagSearch(false);
  };
  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const handleBack = () => {
    navigation.goBack();
  };
  // some warning with chatClient.queryUsers!!!!
  useEffect(() => {
    const otherUser = getOtherUserState(channel, user);
    console.log("channelScreen check: " + otherUser.user.id);
    let checkIsFriend ;
    if(user.friends === null){
      setIsFriend(false);
    }else{
      checkIsFriend = user.friends.some(
        (obj) => obj.id === otherUser.user.id
      );
    }
    // if (otherUser) {
    //   chatClient.queryUsers({ members: [otherUser.user.id] }).then(members => {
    //     const status = members[otherUser.user.id].user.online;
    //     setOtherUserState(status);
    //   });
    // }
    // console.log(otherUser.user.online);

    setIsFriend(checkIsFriend);
    setOtherUserState(otherUser.user.online);
  }, [channel, user]);
  return (
    <TouchableWithoutFeedback onPress={() => setSearchResults([])}>
      <View style={styles.container}>
        <Channel
          channel={channel}
          MessageHeader={(props) =>
            props.message?.user?.id !== chatClient.userID ? (
              <View style={{ flexDirection: "row" }}>
                {Object.keys(props.members).length > 2 &&
                props.message.user?.name ? (
                  <Text style={[{ color: "grey", marginRight: 8 }]}>
                    {props.message.user.name}
                  </Text>
                ) : null}
                <Text style={[{ color: "grey", textAlign: props.alignment }]}>
                  {props.formattedDate}
                </Text>
              </View>
            ) : null
          }
          MessageFooter={() => null}
        >
          <View style={{ display: flagSearch ? "block" : "none" }}>
            <SearchBar
              placeholder="Search messages..."
              onChangeText={updateSearch}
              onSubmitEditing={handleSearch}
              platform="android"
              onBlur={closeSearchBar}
              searchIcon={<Icon name="search" size={24} color="#fff" />}
            />
          </View>
          <View style={{ display: flagSearch ? "none" : "block" }}>
            <View style={styles.headerContainer}>
              <View style={styles.leftHeaderContainer}>
                <TouchableOpacity
                  style={{ marginHorizontal: 8 }}
                  onPress={handleBack}
                >
                  <Icon
                    name="arrow-back-outline"
                    type="ionicon"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <View style={styles.avatarContainer}>
                <ChannelAvatar channel={channel} />
                <View style={styles.onlineIndicator}>
                  <OnlineIndicator online={otherUserState} />
                </View>
                </View>
                
                <View style={styles.groupHeader}>
                  <Text style={styles.channelName}>
                    {getPreviewName(channel)}
                  </Text>
                </View>
              </View>
              <View style={styles.rightHeadrContainer}>
                <TouchableOpacity
                  style={{ marginHorizontal: 8 }}
                  onPress={openSearchBar}
                >
                  <Icon
                    name="search-outline"
                    type="ionicon"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 8 }}
                  onPress={openCall}
                >
                  <Icon
                    name="call-outline"
                    type="ionicon"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 8 }}
                  onPress={openVideo}
                >
                  <Icon
                    name="videocam-outline"
                    type="ionicon"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {!isFriend && (
            <TouchableOpacity>
              <View style={styles.btnAddFriend}>
                <Icon name="person-add-outline" type="ionicon" size={24} />
                <Text style={{ fontWeight: "bold", margin: 4 }}>Kết bạn</Text>
              </View>
            </TouchableOpacity>
          )}
          {searchResults.length > 0 && (
            <View style={styles.searchResultsContainer}>
              <View style={styles.headerSearchResultContainer}>
                <Text style={styles.headerSearchResult}>Tin nhắn</Text>
              </View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleSearch}
                  />
                }
              >
                {searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchResultItem}
                    onPress={() => handleSearchResultSelect(result.message.id)}
                  >
                    <View>
                      <View>
                        <View style={styles.headerMessage}>
                          <Text style={styles.senderName}>
                            Name: {result.message.user.name}
                          </Text>
                          <Text style={styles.timestamp}>
                            {result.message.created_at}
                          </Text>
                        </View>
                        <Text
                          style={styles.searchResultText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Message: {result.message.text}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <MessageList
            setFlatListRef={(ref) => (flatListRef.current = ref)}
            onThreadSelect={(message) => {
              if (channel?.id) {
                setThread(message);
                navigation.navigate("ThreadScreen");
              }
            }}
          />
          <MessageInput />
        </Channel>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-between",
    backgroundColor: "#41ADFA",
  },
  channelName: {
    fontSize: 16,
    lineHeight: 16,
    color: "#fff",
    fontWeight: "700",
  },
  channelConnectivity: {
    marginTop: 4,
    lineHeight: 12,
    fontSize: 12,
    color: "#fff",
  },
  groupHeader: {
    marginStart: 12,
  },
  container: {
    flex: 1,
  },
  rightHeadrContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSearchResultContainer: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSearchResult: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchResultsContainer: {
    borderColor: "black",
    borderBottomWidth: 0.7,
    backgroundColor: "white",
    maxHeight: 300,
    overflow: "scroll",
  },
  searchResultItem: {
    backgroundColor: "#E5E4E2",
    marginLeft: 16,
    marginRight: 16,
    height: 56,
    margin: 2,
    borderRadius: 8,
  },
  searchResultText: {
    fontSize: 16,
    padding: 2,
    marginLeft: 8,
    textAlignVertical: "center",
    overflow: "hidden",
  },
  headerMessage: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  senderName: {
    fontWeight: "bold",
    padding: 2,
    marginLeft: 8,
  },
  timestamp: {
    marginRight: 8,
    fontSize: 12,
    padding: 2,
    color: "#777",
  },
  btnAddFriend: {
    height: 46,
    backgroundColor: "#bbbbbb",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    position: "absolute",
    right:4,
    bottom: 0,
  },
  avatarContainer: {
    position: "relative",
    flexDirection: "row",
  },
});

export default ChannelScreen;

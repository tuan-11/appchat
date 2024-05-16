import React, { useEffect, useState } from "react";
import { View, Text, FlatList,TouchableOpacity,StyleSheet} from "react-native";
import FriendListItem from "../components/FriendListItem";
import { useAppContext } from "../context/AppContext";
import { Icon } from "react-native-elements";
import SearchComponent from "../components/SearchComponent";


const FriendListScreen = (props) => {
  const { user, chatClient } = useAppContext();
  const [isSearching, setIsSearching] = useState(false);
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const handleViewFriendRequests = () => {
    props.navigation.navigate("FriendRequestListScreen"); 
  };
  const renderItem = ({ item }) => <View></View>;
  const fetchData = async (searchTerm, setSearchResults) => {
    if (searchTerm && searchTerm !== "") {
      try {
        setSearchResults();
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  useEffect(() => {
    console.log('User:', user);
    if (user.friend_requests) {
      setFriendRequestCount(user.friend_requests.length);
    } else {
      setFriendRequestCount(0);
    }
  }, [user.friend_requests]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SearchComponent
        chatClient={chatClient}
        currentUser={user}
        fetchData={fetchData}
        renderItem={renderItem}
        setIsSearching={setIsSearching}
      />
      <View style={styles.friendRequests}>
        <TouchableOpacity 
        onPress={handleViewFriendRequests}
        style={styles.btnFriendRequests}>
          <View style={styles.leftFriendRequests}>
            <View style={styles.iconRequest}>
              <Icon
                name="people-outline"
                type="ionicon"
                borderRadius={8}
                size={24}
                color={"#FFFFFF"}
              />
            </View>
            <Text style={styles.textRequest}>Lời mời kết bạn</Text>
          </View>
          {friendRequestCount>0 && (
            <Text style={ styles.requestCount}>{friendRequestCount}</Text>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={user.friends}
        renderItem={({ item }) => <FriendListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconRequest: {
    backgroundColor: "#088AE8",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  friendRequests: {
    paddingHorizontal: 12,
    height: 40,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  btnFriendRequests: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftFriendRequests: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textRequest: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  requestCount:{
    height:20,
    width:20,
    borderRadius: 50,
    backgroundColor:"red",
    color:"white",
    textAlign:"center",
    fontWeight:"700",
  }
});
export default FriendListScreen;

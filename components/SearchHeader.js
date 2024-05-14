import React, { useState } from "react";
import { View, Button, StyleSheet,TouchableOpacity,Animated } from "react-native";
import { useAppContext } from "../context/AppContext"
import SearchComponent from "../components/SearchComponent";
import UserSearchResult from "../components/UserSearchResults";
import { handleAddFriend } from "../api/useUser";

const SearchHeader = ({ isSearching, setIsSearching }) => {
  const { chatClient, user: currentUser, channelList } = useAppContext();
  const [friendRequestStatus, setFriendRequestStatus] = useState(null);
  console.log("user current is "+ currentUser);

  const fetchUsers = async (searchTerm, setSearchResults) => {
    if (searchTerm && searchTerm !== "") {
      try {
        const response = await chatClient.queryUsers({
          name: { $autocomplete: searchTerm },
        });
        setSearchResults(response.users);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  const handleAddFriendWrapper = async (user) => {
    const existingRequest = await handleAddFriend(currentUser, user, chatClient);
    setFriendRequestStatus(existingRequest);
    console.log(existingRequest);
  };
  const isFriend = (user) => {
    if(currentUser.friends){
      const friendIds = currentUser.friends.map((friend) => friend.id);
    console.log("friends : "+friendIds);
    return friendIds.includes(user.id);
    }else{
      return false;
    }
  };

  const isCurrentUser = (user) => {
    return user.id === currentUser.id;
  };

  const renderItem = ({ item }) => (
    <UserSearchResult
      user={item}
      isFriend={isFriend(item)}
      isCurrentUser={isCurrentUser(item)}
      onCall={() => handleCall(item)}
      // onAddFriend={() => handleAddFriend(item)}
      onAddFriend={() => handleAddFriendWrapper(item)}
      friendRequestStatus={friendRequestStatus}
    />
  );


  return (
    <SearchComponent
        chatClient={chatClient}
        currentUser={currentUser}
        fetchData={fetchUsers}
        renderItem={renderItem}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
  )
}

export default SearchHeader

const styles = StyleSheet.create({})
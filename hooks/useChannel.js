import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
} from "../chatConfig";
import { useAppContext } from "../context/AppContext";
export const getPreviewName = (channel) => {
    const {user} = useAppContext();
    try {
      // If the channel is a direct message between two users
      if (channel.data.member_count === 2) {
        // Get the list of members in the channel
        const members = Object.values(channel.state.members);
        // Find the member who is not the current user
        const otherUser = members.find((member) => member.user.id !== user.id);
        // Return the name of the other user
        return otherUser.user.name;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    // If it's not a direct message, return the channel name
    return channel.data.name;
  };
export const getOtherUserState = (channel, currentUser) => {
    try {
      if (channel.data.member_count === 2) {
        const members = Object.values(channel.state.members);
        const otherUser = members.find(member => member.user.id !== currentUser.id);
        return otherUser;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    return false;
  };
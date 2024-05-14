import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';
import { useAuth, AuthContextProvider } from '../context/authContext';
import ContactResult from '../components/ContactResult';
import SearchHeader from '../components/SearchHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import icons from '../constants/icons';
import { useAppContext } from '../context/AppContext';
import { handleAddFriend } from "../api/useUser";

const PhonebookScreen = () => {
  const [contacts, setContacts] = useState(undefined);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const {getAllUserData, user} = useAuth();
  const navigation = useNavigation();
  const { chatClient, setChannel, user: currentUser} = useAppContext();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);

          const users = await getAllUserData();
          const matchedUsers = users.filter((user1) => {
            return (
              user1.phoneNumber !== (user && user.phoneNumber) &&
              data.some((contact) => {
                return (
                  contact.phoneNumbers &&
                  contact.phoneNumbers.some((number) => {
                    return number.number === user1.phoneNumber;
                  })
                );
              })
            );
          });

          setMatchedUsers(matchedUsers);

        } else {
          console.log('No contacts found');
        }
      } else {
        console.log('Permission to access contacts denied.');
      }
    };

    fetchData();
  }, [getAllUserData]);

  const isFriend = (user1) => {
    if(user.friends){
      const friendIds = user.friends.map((friend) => friend.id);
    console.log("friends : "+friendIds);
    return friendIds.includes(user1.id);
    }else{
      return false;
    }
  };
  const handleAddFriendWrapper = (user1) => {
    handleAddFriend(user, user1, chatClient);
  };
  const isCurrentUser = (user1) => {
    return user1.id === user.id;
  };

  const renderContactItem = ({ item }) => {
    const contact = contacts.find(
      (contact) =>
        contact.phoneNumbers &&
        contact.phoneNumbers.some(
          (number) => number.number === item.phoneNumber
        )
    );

    return (
      <ContactResult
      user={item}
      contact={contact}
      isFriend={isFriend(item)}
      isCurrentUser={isCurrentUser(item)}
      onCall={() => handleCall(item)}
      onAddFriend={() => handleAddFriendWrapper(item)}
    />
    );
  };


  return (
    <SafeAreaView style={styles.container}>

      <SearchHeader isSearching={isSearching} setIsSearching={setIsSearching}/>

      {matchedUsers.length === 0 ? (
        <Text style={styles.emptyMessage}>Danh sách liên hệ trống</Text>
      ) : (
        <FlatList
          data={matchedUsers}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={renderContactItem}
        />
      )}
    </SafeAreaView>
  )
}

const PhonebookScreenWithContext = () => {
  return (
    <AuthContextProvider>
      <PhonebookScreen />
    </AuthContextProvider>
  );
};

export default PhonebookScreenWithContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
    color: '#888',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
})
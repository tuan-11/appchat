import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import SearchComponent from '../components/SearchComponent'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../constants/icons'
import FriendListScreen from './FriendListScreen';

const FriendScreen = () => {
  const navigation = useNavigation();
  
  // useEffect(() => {
  //   navigation.navigate('FriendListScreen');
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      
      <SearchComponent/>

      {/* <TouchableOpacity onPress={handleAddFriend}>
        <Image source={icons.userAdd} style={styles.icon} />
      </TouchableOpacity> */}
      
    </SafeAreaView>
  )
}

export default FriendScreen

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
})
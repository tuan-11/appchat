import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SearchBar, Icon  } from '@rneui/themed';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchComponent = ({
  chatClient,
  currentUser,
  fetchData, // Hàm tìm kiếm dữ liệu
  renderItem, // Hàm render item trong FlatList
  useEffectDependencies = [], // Các dependencies cho useEffect
  isSearching,
  setIsSearching,
}) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showIcon, setShowIcon] = useState(true);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if(fetchData){
        fetchData(searchTerm, setSearchResults);
        setIsSearching(searchTerm.length > 0);
    }
  }, [searchTerm, chatClient, ...useEffectDependencies]);

  const handleSearchBarFocus = () => {
    setIsSearchBarFocused(true);
    setShowIcon(false);
  };

  const handleSearchBarBlur = () => {
    setIsSearchBarFocused(false);
    setShowIcon(true);
  };

  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleIconPress = () => {
    navigation.navigate('AddFriendScreenWithContext');
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholderTextColor="#EDEDED"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChangeText={updateSearch}
          platform="android"
          leftIconContainerStyle={styles.iconContainer}
          inputContainerStyle={
            isSearchBarFocused
            ? [styles.inputContainerFocused, { height: 40 }]
            : [styles.inputContainerDefault, { height: 40 }]
          }
          containerStyle={styles.containerSearch}
          onFocus={handleSearchBarFocus}
          onBlur={handleSearchBarBlur}
          searchIcon={<Icon name="search" color="#fff" />}
        />
        {showIcon && (
          <FontAwesome5 name="user-plus" size={21} color="white" style={styles.rightIcon} onPress={handleIconPress}/>
        )}
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'relative',
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    top: 17,
  },
  containerSearch: {
    backgroundColor: '#41ADFA',
    padding: 8,
    paddingVertical: 12,
    
  },
  inputContainerDefault: {
    borderRadius: 12,
    backgroundColor: '#41ADFA',
  },
  inputContainerFocused: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  iconContainer: {
    tintColor: '#fff',
  },
  rightIconContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchComponent;
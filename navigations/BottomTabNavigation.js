import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from '../screens/MessageScreen';
import icons from '../constants/icons';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreenWithContext from '../screens/ProfileScreen';
import PhonebookScreenWithContext from '../screens/PhonebookScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ route }) => {
        const { userId, userToken } = route.params;

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle:{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: 60,
            }
    }}
    >
        <Tab.Screen
            name="Message" 
            options = {{
                tabBarIcon:({focused}) => {
                    return(
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image
                                source={focused ? icons.message : icons.messageOutline}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#41ADFA' : 'black',
                                }}
                            />

                            {focused && <Text style={{color: "#41ADFA", fontSize: 12, fontWeight: 'bold'}}>Tin nhắn</Text>}
                        </View>
                    )
                },
                tabBarStyle: ({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChannelList';
                    if (routeName === 'FriendListScreen') {
                      return { display: 'none' };
                    }
                    return {};
                  }
        }}> 
            {props => <MessageScreen {...props} userId={userId} userToken={userToken}/>}
        </Tab.Screen>

        <Tab.Screen
            name="Phonebook" 
            component={PhonebookScreenWithContext} 
            options={{
                tabBarIcon:({focused}) => {
                    return(
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image
                                source={focused ? icons.phonebook : icons.phonebookOutline}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#41ADFA' : 'black',
                                }}
                            />
                            {focused && <Text style={{color: "#41ADFA", fontSize: 12, fontWeight: 'bold'}}>Danh bạ</Text>}
                        </View>
                    )
                },
        }}/>

        {/* <Tab.Screen
            name="Friend" 
            component={FriendScreen} 
            options={{
                tabBarIcon:({focused}) => {
                    return(
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image
                                source={focused ? icons.friend : icons.friendOutline}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#41ADFA' : 'black',
                                }}
                            />
                            {focused && <Text style={{color: "#41ADFA", fontSize: 12, fontWeight: 'bold'}}>Bạn bè</Text>}
                        </View>
                    )
                }
        }}/>   */}

        <Tab.Screen
            name="Profile" 
            component={ProfileScreenWithContext} 
            options={{
                tabBarIcon:({focused}) => {
                    return(
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image
                                source={focused ? icons.user : icons.userOutline}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#41ADFA' : 'black',
                                }}
                            />
                            {focused && <Text style={{color: "#41ADFA", fontSize: 12, fontWeight: 'bold'}}>Cá nhân</Text>}
                        </View>
                    )
                }
        }}/>   

    </Tab.Navigator>
  )
}

export default BottomTabNavigation
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase/firebaseConfig'
import {doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where} from "firebase/firestore";
import { ToastAndroid} from 'react-native'
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { StreamChat } from 'stream-chat';
// import { useChatClient } from "../api/useChatClient";
import { useAppContext } from "./AppContext";
import { getToken } from '../server/useApi';

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [notRegistered, setNotRegistered] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    const showToast = () => {
        ToastAndroid.show(
          "Đăng nhập thành công!",
          5000,
          ToastAndroid.BOTTOM
        )
      }
    
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                getUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, [])

    useEffect(() => {
      if (userId && userToken) {
        console.log('user:', userId);
        console.log('token:', userToken);
        navigation.navigate('BottomTabNavigation', { userId: userId, userToken: userToken });
      }
    }, [userId,userToken]);

    const getUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, userId: userId, name: data.name, email: data.email, phoneNumber: data.phoneNumber, gender: data.gender, dayOfbirth: data.dayOfbirth, userUrl: data.userUrl})
        }
        
    }

    const getPhoneNumberUserData = async (phoneNumber) => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const userId = querySnapshot.docs[0].id;
          setOtherUser({...userData, userId: userId});
          setNotRegistered(false);
        }else{
          setNotRegistered(true);
        }
      } catch (error) {
        console.log('Error getting user data:', error);
      }
    }

    const getAllUserData = async () => {
        try {
          const usersRef = collection(db, 'users');
          const querySnapshot = await getDocs(usersRef);
          const users = querySnapshot.docs.map((doc) => doc.data());
          return users;
        } catch (error) {
          console.error('Error getting all users:', error);
          return [];
        }
      };
/////const users = await client.queryUsers({}, { id: 1 });
    const updateUserNameData = async (newName) => {
      const client = new StreamChat.getInstance('bt2cwnkjayw3');
      console.log(1);
      const users = await client.queryUsers({}, { id: 1 });
      console.log(2);
      if (typeof users === 'object' && !Array.isArray(users)) {
        try {
          const userValues = Object.values(users);
          const userObjects = userValues[0];
          const userToUpdate = userObjects.find(user1 => {

            return user1.id === user.userId});

            const docRef = doc(db, 'users', user.userId);
            await updateDoc(docRef, {name: newName});
            if (userToUpdate) {
            await client.updateUser({
              id: userToUpdate.id,
              name: newName, 
            });
          } else {
            console.log('User not found with uid:', uid);
          }
        } catch (error) {
          console.log('Error finding user:', error);
        }
      } else {
        console.log('users is not an object');
      }
    }

    const updateUserUrlData = async (newuserUrl) => {
        const client = new StreamChat.getInstance('bt2cwnkjayw3', '8u648gm3myz87c2gfrjddbubahyqyydapx6sskcbyqbgagq3bgdyngyu7pw2nk6n');
                const users = await client.queryUsers({}, { id: 1 });
                if (typeof users === 'object' && !Array.isArray(users)) {
                  try {
                    const userValues = Object.values(users);
                    const userObjects = userValues[0];
                    const userToUpdate = userObjects.find(user1 => {

                      return user1.id === user.userId});

                      const docRef = doc(db, 'users', user.userId);
                      await updateDoc(docRef, {userUrl: newuserUrl});
                    if (userToUpdate) {
                      await client.updateUser({
                        id: userToUpdate.id,
                        image: newuserUrl, 
                      });
                    } else {
                      console.log('User not found with uid:', uid);
                    }
                  } catch (error) {
                    console.log('Error finding user:', error);
                  }
                } else {
                  console.log('users is not an object');
                }
    }

    const updateStream = async (userId)=> {
        const client = new StreamChat.getInstance('bt2cwnkjayw3', '8u648gm3myz87c2gfrjddbubahyqyydapx6sskcbyqbgagq3bgdyngyu7pw2nk6n');
        const users = await client.queryUsers({}, { id: 1 });
        if (typeof users === 'object' && !Array.isArray(users)) {
          try {
            let name;
            let newImageUrl;
            const userValues = Object.values(users);
            const userObjects = userValues[0];
            const userToUpdate = userObjects.find(user1 => {return user1.id === userId});
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              name = userData.name;
              console.log('nam ' + name);
              newImageUrl = userData.userUrl;
            }
            if (userToUpdate) {
              await client.updateUser({
                id: userToUpdate.id,
                name: name,
                image: newImageUrl, 
              });
            }
          } catch (error) {
            console.log('Error finding user:', error);
          }
        } else {
          console.log('users is not an object');
        }
    }

    const login = async (email, password)=> {
        return signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user2 = userCredential.user;
            if (user2.emailVerified) {
                showToast();

                // try {
                //   const token = await getToken();
                //   console.log('Token:', token);
                  // navigation.navigate('BottomTabNavigation');
                // } catch (error) {
                //   console.error('Error getting token:', error);
                // }
                // setUser({ ...user, userId: user2.uid });
                // setUserIdChatClient(user2.uid);

                const token = await getToken(user2.uid);
                console.log("get token1 "+ token);
                setUserId(user2.uid);
                setUserToken(token);
            } else {
                alert('Vui lòng xác minh Email!');
                const actionCodeSettings = {
                    url: 'https://appchat-a969d.firebaseapp.com',
                    handleCodeInApp: true,
                  };
                return sendEmailVerification(user2, actionCodeSettings)
                  .then(() => {
                    alert("Email xác minh đã được gửi thành công!");
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
            }
          })   
          .catch(() => {
            alert('Đăng nhập không thành công!');
          });
    };

    const logout = async ()=>{
        try {
            const client = new StreamChat.getInstance('bt2cwnkjayw3');
            console.log("client in logout1: "+ JSON.stringify(client.userID));
            await client.disconnectUser();
            console.log("client in logout2: "+ JSON.stringify(client.userID));
            setUserToken(null);
          } catch (error) {
            console.error('Error logging out:', error);
            throw error;
          }
    }

    const register = async (name, email, phoneNumber, gender, dayOfbirth, password)=>{
        const querySnapshot = await getDocs(collection(db, 'users'));
        const existingUsers = querySnapshot.docs.filter(doc => doc.data().phoneNumber === phoneNumber);
        if (existingUsers.length > 0) {
            alert('Số điện thoại đã được đăng ký. Vui lòng thử một số điện thoại khác.');
        return;
        }

        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              const actionCodeSettings = {
                url: 'https://appchat-a969d.firebaseapp.com',
                handleCodeInApp: true,
              };
              return sendEmailVerification(user, actionCodeSettings)
                .then(() => {
                  alert("Email xác minh đã được gửi thành công. Vui lòng vào Email để xác minh!");
                }).catch((e) => {
                  alert(e.message);
                })
                .then(async() => {
                  let userUrl = '';
                  try {
                    const defaultAvatarRef = ref(storage, "default_avatar/avatar.jpg");
                    userUrl = await getDownloadURL(defaultAvatarRef);
                  } catch (error) {
                    console.error("Error getting default avatar URL:", error);
                    alert("Không thể lấy ảnh đại diện mặc định. Vui lòng thử lại sau.");
                    return;
                  }       
                  const userRef = doc(db, "users", user.uid);
                  const userData = {
                    name,
                    email,
                    phoneNumber,
                    gender,
                    dayOfbirth,
                    userUrl,
                    userId: user.uid
                  };
                  return setDoc(userRef, userData)
                    .then(() => {
                      console.log("User information saved to Firestore successfully!");
                      // const { getToken } = require('../server/useApi');
                      // return getToken(user.uid);
                    })
                    .then((token) => {
                      console.log('Token:', token);
                    })
                    .catch((error) => {
                      console.error("Error saving user information to Firestore or getting token:", error);
                    });
                }).catch((e) => {
                  alert(e.message);
                })
                .finally(() => {
                  navigation.goBack();
                });
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                alert('Email đã được sử dụng. Vui lòng thử một email khác.');
              } else {
                console.error('Authentication error:', error.message);
              }
            });
    }

    return(
        <AuthContext.Provider value={{user, otherUser, isAuthenticated, notRegistered, login, logout, register, getUserData, updateUserNameData, updateUserUrlData, 
          getAllUserData, getPhoneNumberUserData
          }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }   
    return value;
}

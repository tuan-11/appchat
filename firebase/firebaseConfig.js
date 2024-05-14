import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCYCs75sYMpDT66wHv6PERU3zC0d_G3ETY",
    authDomain: "appchat-a969d.firebaseapp.com",
    projectId: "appchat-a969d",
    storageBucket: "appchat-a969d.appspot.com",
    messagingSenderId: "369871973573",
    appId: "1:369871973573:web:516d480666d19ba2c154ac",
    measurementId: "G-1M0BFH3N1W"
  };

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);
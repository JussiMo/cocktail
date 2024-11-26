import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMlN_kD9TvQIfgTQEHFFS-PuD7oIPpPXM",
  authDomain: "cocktail-86886.firebaseapp.com",
  projectId: "cocktail-86886",
  storageBucket: "cocktail-86886.firebasestorage.app",
  messagingSenderId: "806308764845",
  appId: "1:806308764845:web:d8f6cef85d5a4c2df2fa24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  export { auth };
  
  export const db = getFirestore(app);
  export const USERS_REF = 'users';
  export const DRINKS_REF = 'drinks';
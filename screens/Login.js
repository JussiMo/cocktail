import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, Button } from 'react-native';
import { logout, signIn, resetPassword } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style/style';

export default function Login({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [emailForgotPw, setEmailForgotPw] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handlePressLogin = () => {
    if (!email) {
      Alert.alert('Email is required.');
    }
    else if (!password) {
      Alert.alert('Password is required.');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setEmail('');
          setPassword('');
          navigation.navigate('Tabs', { screen: 'Profile'});
        }
      });
    }
  };

  const handlePressLogout = () => {
    logout();
  }

  const handlePressResetPw = () => {
    if (!emailForgotPw) {
      Alert.alert('Email is required.');
    }
    else {
      resetPassword(emailForgotPw);
      setShowForgotPw(false);
    }
  }

  const handlePressForgotPw = () => {
    setShowForgotPw(!showForgotPw);
  }

  const goBack = () => {
    navigation.goBack();
  }

  if (isLoggedIn) {
    return (
        <LinearGradient
        colors={['#2c0305', '#511414',]} // Gradient colors 
        style={[styles.gradient]}
      >
      <View style={styles.container}>
        <Pressable onPress={goBack} style={styles.backButton}>
         <MaterialIcons name="keyboard-backspace" size={40} color="#F1E9DC" />
        </Pressable>
        <View style={styles.headerItem}>      
          <Text style={styles.header}>Login</Text>
          <Pressable style={styles.logout} onPress={handlePressLogout}>
            <Text style={styles.logout}>Logout </Text>
            <MaterialIcons name="logout" size={24} color="red" />
          </Pressable>
        </View>
        <Text style={styles.header}>
          You are logged in!
        </Text>
        <Pressable style={styles.button} title="Profile" onPress={goBack}>
          <Text>PROFILE</Text>
        </Pressable>
      </View>
      </LinearGradient>
    )
  }
  else {
    return (
        <LinearGradient
        colors={['#2c0305', '#511414',]} // Gradient colors 
        style={[styles.gradient]}
      >
      <View style={styles.container}>
        <Pressable onPress={goBack} style={styles.backButton}>
         <MaterialIcons name="keyboard-backspace" size={40} color="#F1E9DC" />
        </Pressable>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Login</Text>
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter your email*"
          placeholderTextColor="#805252"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter your password*"
          placeholderTextColor="#805252"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} title="Login" onPress={handlePressLogin}>
          <Text style={styles.loginButtonText} >LOGIN</Text>
        </Pressable>
        <Text style={styles.infoText}>Dont have a profile yet?</Text>
        <Pressable style={styles.button} title="Register" onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginButtonText}>REGISTER</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text
            style={styles.loginButtonText}
            onPress={handlePressForgotPw}>Forgot password</Text>
        </Pressable>
        {showForgotPw &&
          <>
            <TextInput
              style={styles.textinput}
              placeholder="Enter your email*"
              placeholderTextColor="#805252"
              value={emailForgotPw}
              onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable style={styles.button} title="Reset password" onPress={() => handlePressResetPw()}>
              <Text style={styles.resetButtonText} >RESET PASSWORD</Text>
            </Pressable>
            <Text style={styles.infoText}>
              Be sure to check your spam folder after resetting!
            </Text>
          </>
        }
      </View>
      </LinearGradient>
    );
  }
}
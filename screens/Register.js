import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable } from 'react-native';
import { logout, signUp } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handlePressRegister = () => {
    if (!nickname) {
      Alert.alert('Nickname is required');
    } else if (!email) {
      Alert.alert('Email is required.');
    } else if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      signUp(nickname, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setNickname('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigation.navigate('Tabs', { screen: 'Profile'});
        } 
      });
    }
  };

  const handlePressLogout = async () => { 
    logout();
    navigation.navigate('Login');
  }

  const goBack = () => {
    navigation.goBack();
  }
  
  if (isLoggedIn) {
    return(
      <LinearGradient
      colors={['#2c0305', '#511414',]} // Gradient colors 
      style={[styles.gradient]}
    >
      <View style={styles.container}>
        <View style={styles.headerItem}>
        <Pressable onPress={goBack} style={styles.backButton}>
         <MaterialIcons name="keyboard-backspace" size={40} color="#F1E9DC" />
        </Pressable>
          <Text style={styles.header}>Register</Text>
          <Pressable style={styles.logout} onPress={handlePressLogout}>
            <Text style={styles.logout}>Logout </Text>
            <MaterialIcons name="logout" size={24} color="red" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in as {auth.currentUser.nickname}
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Random drink"
            onPress={() => navigation.navigate('Random')} />
        </Pressable>
        <Text style={styles.infoText}>
          Or manage your Profile
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')} />
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
          <Text style={styles.header}>Register</Text>
        </View>
        <Text style={styles.registerText}>Create an account</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Nickname*"
          placeholderTextColor="#805252"
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname.trim())}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter your email*"
          placeholderTextColor="#805252"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
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
        <TextInput
          style={styles.textinput}
          placeholder="Confirm password*"
          placeholderTextColor="#805252"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} title="Register" onPress={handlePressRegister}>
          <Text style={styles.registerButtonText} >REGISTER</Text>
        </Pressable>
          <Text style={styles.infoText}>Already have an account?</Text>
        <Pressable style={styles.button} title="Login" onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerButtonText} >LOGIN</Text>
        </Pressable>
      </View>
      </LinearGradient>
    );
  }
}
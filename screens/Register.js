import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable } from 'react-native';
import { logout, signUp } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';

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
          navigation.navigate('Profile');
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
      <View style={styles.container}>
        <View style={styles.headerItem}>
        <Pressable onPress={goBack} style={styles.backButton}>
         <MaterialIcons name="keyboard-backspace" size={40} color="black" />
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
    )
  }
  else {
    return (
      <View style={styles.container}>
             <Pressable onPress={goBack} style={styles.backButton}>
         <MaterialIcons name="keyboard-backspace" size={40} color="black" />
        </Pressable>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Register</Text>
        </View>
        <Text style={styles.infoText}>Create an account</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Nickname*"
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname.trim())}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Confirm password*"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} title="Register" onPress={handlePressRegister}>
          <Text>REGISTER</Text>
        </Pressable>
          <Text style={styles.infoText}>Already have an account?</Text>
        <Pressable style={styles.button} title="Login" onPress={() => navigation.navigate('Login')}>
          <Text>LOGIN</Text>
        </Pressable>
      </View>
    );
  }
}
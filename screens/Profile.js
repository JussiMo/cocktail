import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, ScrollView } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';
import { changePassword, logout, removeUser } from '../components/Auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';

export default function Profile({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        (async () => {
          const docRef = doc(db, USERS_REF, auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setNickname(userData.nickname);
            setEmail(userData.email);
          }
          else {
            console.log("Error: No such document!");
          }
        })();
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const updateUserData = async () => {
    const colRef = collection(db, USERS_REF);
    await updateDoc(doc(colRef, auth.currentUser.uid), {
      nickname: nickname
    })
      .then(() => {
        Alert.alert("Account updated.")
      })
      .catch((error) => {
        console.log("Update failed: " + error.message);
        Alert.alert("Update failed: " + error.message);
      })
  }

  const handlePressLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const handlePressChangePw = () => {
    if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      setPassword('');
      setConfirmPassword('');
      changePassword(password, navigation);
    }
  };

  const handlePressDelete = () => {
    if (confirmDelete !== "DELETE") {
      Alert.alert('You must type DELETE to confirm.');
    }
    else {
      removeUser();
      setConfirmDelete('');
      logout();
      navigation.navigate('Login');
    }
  }

  const handlePressSettings = () => {
    setShowSettings(!showSettings);
  }

  if (!isLoggedIn) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Profile</Text>
          </View>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text title="Login">LOGIN</Text>
          </Pressable>
          <Text style={styles.infoText}>Dont have a profile yet?</Text>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text title="Register">REGISTER</Text>
          </Pressable>
        </View>
      </ScrollView>
    )
  }
  else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Profile</Text>
          <Text style={styles.label}>Logged in as: {nickname}</Text>
            <Pressable style={styles.logout} onPress={handlePressLogout}>
              <Text style={styles.logout}>Logout </Text>
              <MaterialIcons name="logout" size={24} color="red" />
            </Pressable>
          </View>
          <Pressable style={styles.button}>
          <Text
            style={styles.link}
            onPress={handlePressSettings}>SETTINGS</Text>
        </Pressable>
          {showSettings &&
          <>
          <Text style={styles.header}>Change your Nickname</Text>
          <TextInput
            value={nickname}
            style={styles.textinput}
            onChangeText={setNickname}
          />
          <Pressable style={styles.button} title="Update" onPress={() => updateUserData()}>
            <Text>UPDATE</Text>
          </Pressable>
          <Text style={styles.header}>Change your password</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your new password*"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Confirm your new password*"
            value={confirmPassword}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            secureTextEntry={true}
          />
          <Pressable style={styles.button} title="Change password" onPress={handlePressChangePw}>
            <Text>CHANGE PASSWORD</Text>
          </Pressable>
          <Text style={styles.header}>Delete account</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Type DELETE here to confirm"
            value={confirmDelete}
            onChangeText={(confirmDelete) => setConfirmDelete(confirmDelete)}
            autoCapitalize="characters"
          />
          <View style={styles.buttonDelete} title="Delete account" color="red" onPress={() => handlePressDelete()}>
            <Text>DELETE ACCOUNT</Text>
          </View>
          <Text style={styles.infoText}>
            Your data will be removed from the database!
          </Text>
          </>
        }
        </View>
      </ScrollView>
    );
  }
}
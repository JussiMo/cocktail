import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, ScrollView, FlatList, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF, DRINKS_REF } from '../firebase/Config';
import { changePassword, logout, removeUser } from '../components/Auth';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import styles from '../style/style';
import { LinearGradient } from 'expo-linear-gradient';


export default function Profile({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [drinksList, setDrinksList] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

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

  const fetchDrinksList = async () => {
    try {
      const userId = auth.currentUser.uid;
      const drinksRef = collection(db, 'users', userId, 'drinks');
      const querySnapshot = await getDocs(drinksRef);
      const drinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Drinks fetched:', drinks);
      setDrinksList(drinks);
    } catch (error) {
      console.log('Error fetching drinks:', error);
      Alert.alert('Failed to fetch drinks. Please try again later.');
    }
  }
  

  const toggleDrinksList = () => {
    if (!showDrinks) {
      fetchDrinksList();
    }
    setShowDrinks(!showDrinks);
  }

  const fetchDrinkDetails = async (drinkId) => {
    try {
      console.log('Fetching drink details for drinkId:', drinkId);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      const data = await response.json();
      
      if (data.drinks && data.drinks.length > 0) {
        setSelectedDrink(data.drinks[0]);
      } else {
        Alert.alert('Failed to fetch drink details.');
      }
    } catch (error) {
      console.error('Error fetching drink details:', error);
    }
  }

  const closeDrinkDetails = () => {
    setSelectedDrink(null);
  }

  if (!isLoggedIn) {
    return (
      <LinearGradient
      colors={['#2c0305', '#511414',]} // Gradient colors 
      style={[styles.gradient]}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Profile</Text>
          </View>
          <Pressable style={styles.profileButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.profileButtonText} title="Login">LOGIN</Text>
          </Pressable>
          <Text style={styles.profileText}>Dont have a profile yet?</Text>
          <Pressable style={styles.profileButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.profileButtonText} title="Register">REGISTER</Text>
          </Pressable>
        </View>
      </ScrollView>
      </LinearGradient>
    )
  }
  else {
    return (
      <LinearGradient
      colors={['#2c0305', '#511414',]} // Gradient colors 
      style={[styles.gradient]}
    >
      <FlatList
        data={showDrinks ? drinksList : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.drinkItem}
            onPress={() => fetchDrinkDetails(item.id)}
          >
            <Text style={styles.drinkName}>{item.name}</Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={styles.headerItem}>
              <Text style={styles.header}>Profile</Text>
              <Text style={styles.labelProfile}>Logged in as: {nickname}</Text>
              <Pressable style={styles.logout} onPress={handlePressLogout}>
                <Text style={styles.logout}>Logout </Text>
                <MaterialIcons name="logout" size={24} color="red" />
              </Pressable>
            </View>
            <Pressable style={styles.profileButton} onPress={toggleDrinksList}>
              <Text style={styles.profileButtonText} >{showDrinks ? 'HIDE FAVORITES' : 'SHOW FAVORITES'}</Text>
            </Pressable>
            {selectedDrink && (
              <Animated.View
                style={styles.drinkDetailsContainer}
                entering={FadeIn.duration(500)}
                layout={Layout}
              >
                <Pressable onPress={closeDrinkDetails}>
                  <Text style={styles.backButton}>Back</Text>
                </Pressable>
                <Text style={styles.header}>{selectedDrink.strDrink}</Text>
                <Image
                  source={{ uri: selectedDrink.strDrinkThumb }}
                  style={styles.drinkImage}
                />
                <Text style={styles.instructions}>
                  {selectedDrink.strInstructions}
                </Text>
              </Animated.View>
            )}
            <Pressable style={styles.button}>
              <Text style={styles.profileButtonText} onPress={handlePressSettings}>
                SETTINGS
              </Text>
            </Pressable>
            {showSettings && (
              <>
                <Text style={styles.labelProfile}>Change your Nickname</Text>
                <TextInput
                  value={nickname}
                  style={styles.textinput}
                  onChangeText={setNickname}
                />
                <Pressable
                  style={styles.button}
                  title="Update"
                  onPress={updateUserData}
                >
                  <Text style={styles.profileButtonText} >UPDATE</Text>
                </Pressable>
                <Text style={styles.labelProfile}>Change your password</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter your new password*"
                  placeholderTextColor="#805252"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry
                />
                <TextInput
                  style={styles.textinput}
                  placeholder="Confirm your new password*"
                  placeholderTextColor="#805252"
                  value={confirmPassword}
                  onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                  secureTextEntry
                />
                <Pressable
                  style={styles.profileButton}
                  title="Change password"
                  onPress={handlePressChangePw}
                >
                  <Text style={styles.profileButtonText} >CHANGE PASSWORD</Text>
                </Pressable>
                <Text style={styles.labelProfile}>Delete account</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type DELETE here to confirm"
                  placeholderTextColor="#805252"
                  value={confirmDelete}
                  onChangeText={(confirmDelete) => setConfirmDelete(confirmDelete)}
                  autoCapitalize="characters"
                />
                <View
                  style={styles.buttonDelete}
                  title="Delete account"
                  color="red"
                  onPress={handlePressDelete}
                >
                  <Text style={styles.deleteButtonText} >DELETE ACCOUNT</Text>
                </View>
                <Text style={styles.infoText}>
                  Your data will be removed from the database!
                </Text>
              </>
            )}
          </View>
        }
      />
      </LinearGradient>
    );
  }
}    
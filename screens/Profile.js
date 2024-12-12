import { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, Alert, ScrollView, FlatList, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';
import { changePassword, removeUser, logout } from '../components/Auth';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
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
        const docRef = doc(db, USERS_REF, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNickname(userData.nickname);
          setEmail(userData.email);
        } else {
          console.log('Error: No such document!');
        }
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const fetchDrinksList = async () => {
    try {
      const userId = auth.currentUser.uid;
      const drinksRef = collection(db, 'users', userId, 'drinks');
      const querySnapshot = await getDocs(drinksRef);

      const drinks = [];
      for (const doc of querySnapshot.docs) {
        const { id } = doc.data();
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.drinks && data.drinks.length > 0) {
          drinks.push(data.drinks[0]);
        }
      }
      setDrinksList(drinks);
    } catch (error) {
      console.log('Error fetching drinks:', error);
      Alert.alert('Failed to fetch drinks. Please try again later.');
    }
  };

  const toggleDrinksList = () => {
    if (!showDrinks) {
      fetchDrinksList();     
    }
    setShowDrinks(!showDrinks);
    closeCard();
  };

  const updateUserData = async () => {
    const colRef = collection(db, USERS_REF);
    await updateDoc(doc(colRef, auth.currentUser.uid), { nickname })
      .then(() => Alert.alert('Account updated.'))
      .catch((error) => {
        console.log('Update failed: ' + error.message);
        Alert.alert('Update failed: ' + error.message);
      });
  };

  const handlePressChangePw = () => {
    if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      changePassword(password, navigation);
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handlePressDelete = () => {
    if (confirmDelete !== 'DELETE') {
      Alert.alert('You must type DELETE to confirm.');
    } else {
      removeUser();
      navigation.navigate('Login');
    }
  };

  const handlePressLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const closeCard = () => {
    setSelectedDrink(null);
  };

  const Card = ({ drink }) => {
    if (!drink) return null;

    const {
      strDrink: name,
      strDrinkThumb: image,
      strInstructions: instructions,
    } = drink;

    const ingredients = Object.keys(drink)
      .filter((key) => key.startsWith('strIngredient'))
      .map((key) => drink[key])
      .filter(Boolean);

    const measures = Object.keys(drink)
      .filter((key) => key.startsWith('strMeasure'))
      .map((key) => drink[key])
      .filter(Boolean);

    return (
      <View style={styles.cardProfile}>
        <Image source={{ uri: image }} style={styles.cardImageProfile} onError={()=> console.log('failed to load image')} />
        <Text style={styles.cardTitleProfile}>{name}</Text>
        <Text style={styles.cardInstructions}>{instructions}</Text>
        <View>
          {ingredients.map((ingredient, index) => (
            <Text key={index}>
              {measures[index] || ''} {ingredient}
            </Text>
          ))}
        </View>
        <Pressable style={styles.profileButton} onPress={closeCard}>
          <Text style={styles.profileButtonText}>CLOSE</Text>
        </Pressable>
      </View>
    );
  };

  if (!isLoggedIn) {
    return (
      <LinearGradient colors={['#2c0305', '#511414']} style={styles.gradient}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Pressable style={styles.profileButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.profileButtonText}>LOGIN</Text>
            </Pressable>
            <Text style={styles.profileText}>Don't have a profile yet?</Text>
            <Pressable style={styles.profileButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.profileButtonText}>REGISTER</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient colors={['#2c0305', '#511414']} style={styles.gradient}>
        <FlatList
          data={[]}
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.header}>Profile</Text>
              <Text style={styles.labelProfile}>Logged in as: {nickname}</Text>
              <Pressable style={styles.logout} onPress={handlePressLogout}>
                <Text style={styles.logout}>Logout </Text>
                <MaterialIcons name="logout" size={24} color="red" />
              </Pressable>
              <Pressable style={styles.profileButton} onPress={toggleDrinksList}>
                <Text style={styles.profileButtonText}>
                  {showDrinks ? 'HIDE FAVORITES' : 'SHOW FAVORITES'}
                </Text>
              </Pressable>
              {showDrinks && (
                <FlatList
                  data={drinksList}
                  style={styles.drinksListContainer}
                  keyExtractor={(item) => item?.idDrink?.toString() || Math.random().toString()}
                  renderItem={({ item }) => (
                    <Pressable style={styles.drinkItem} onPress={() => setSelectedDrink(item)}>
                      <Text style={styles.drinkName}>{item.strDrink}</Text>
                    </Pressable>
                  )}
                />
              )}
              {selectedDrink && <Card drink={selectedDrink} />}
              <Pressable style={styles.profileButton} onPress={() => setShowSettings(!showSettings)}>
                <Text style={styles.profileButtonText}>SETTINGS</Text>
              </Pressable>
              {showSettings && (
                <>
                  <Text style={styles.labelProfile}>Change your Nickname</Text>
                  <TextInput
                    value={nickname}
                    style={styles.textinput}
                    onChangeText={setNickname}
                  />
                  <Pressable style={styles.button} onPress={updateUserData}>
                    <Text style={styles.profileButtonText}>UPDATE</Text>
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
                  <Pressable style={styles.profileButton} onPress={handlePressChangePw}>
                    <Text style={styles.profileButtonText}>CHANGE PASSWORD</Text>
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
                  <Pressable style={styles.buttonDelete} onPress={handlePressDelete}>
                    <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
                  </Pressable>
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

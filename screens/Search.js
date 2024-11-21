import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../style/style';

export default function Search() {

  const [ingredient, setIngredient] = useState('')
  const [cocktails, setCocktails] = useState([])
  const [error, setError] = useState(null)

  const searchCocktails = async () => {
    setError(null)
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
      const data = await response.json()
      console.log(data);
      
      if (data.drinks === "no data found") {
        setError("No cocktails found with this ingredient")
        setCocktails([])
      }
      else {
        setCocktails(data.drinks) 
      }

    } catch (error) {
      setError("Something went wrong")
    }
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        style={styles.textinput}
        placeholder='Search cocktails by ingredient'
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
      />
      <Pressable style={styles.button} onPress={searchCocktails}>
        <Text>Search</Text>
      </Pressable>
      {error && <Text>{error}</Text>}
      <FlatList 
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.strDrink}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}
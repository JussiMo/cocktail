import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Keyboard, Pressable, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import styles from '../style/style';
import { RadioButton, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, FadeOutUp, Layout } from 'react-native-reanimated';



export default function Search() {

  // const [ingredient, setIngredient] = useState('')
  const [cocktails, setCocktails] = useState([])
  const [error, setError] = useState(null)
  const [selectedCocktail, setSelectedCocktail] = useState(null)
  const [CocktailVisible, setCocktailVisible] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [name, setName] = useState('')
  const [image, setImage] = useState()
  const [instructions, setInstructions] = useState('')
  const [measures, setMeasures] = useState([])
  const [searchType, setSearchType] = useState("ingredient")
  const [query, setQuery] = useState('')
  const [showIngredients, setShowIngredients] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const searchCocktails = async () => {
    setError(null)
    let URL = ''
    if (searchType === "ingredient") {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    }

    try {
      const response = await fetch(URL)
      const data = await response.json()
      // console.log(data)

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

  const CocktailData = async (idDrink) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      )
      const data = await response.json()


      if (!data.drinks || data.drinks.length === 0) {
        setError("Something went wrong")
      }
      else {
        const drink = data.drinks[0]

        setName(drink.strDrink)
        setImage(drink.strDrinkThumb)
        setInstructions(drink.strInstructions)

        const ingredientList = Object.keys(drink)
          .filter(key => key.startsWith("strIngredient"))
          .map(key => drink[key])
          .filter(Boolean)

        const measuretList = Object.keys(drink)
          .filter(key => key.startsWith("strMeasure"))
          .map(key => drink[key])
          .filter(Boolean)

        setIngredients(ingredientList)
        setMeasures(measuretList)

        setSelectedCocktail(drink)
        setCocktailVisible(true)
      }

    } catch (error) {
      setError("Something went wrong2")
      console.log(error);

    }
  }

  const goBack = () => {
    setSelectedCocktail(null)
    setCocktailVisible(false)
  }

  const Card = ({ cocktail, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => onPress(cocktail.idDrink)}>
        <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{cocktail.strDrink}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#2c0305', '#511414',]} // Gradient colors 
      style={[styles.gradient]}
    >
      <View>
        {selectedCocktail ? (
            <ScrollView contentContainerStyle={[styles.randomcontainer]}>
              <View style={{ alignSelf: 'flex-start'}}>
              <Pressable onPress={goBack}>
                <Text style={styles.back}>Back</Text>
              </Pressable>
              </View>
              <View style={styles.container}>
                <Text style={styles.header}>{name}</Text>
                <Image source={{ uri: image }} style={styles.image} />
                <Pressable
                  style={[styles.randombutton]}
                  onPress={() => setShowIngredients(!showIngredients)}>
                  <Text style={styles.randombuttontext}>
                    {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
                  </Text>
                  <MaterialIcons name="chevron-right" size={24} color={"#511414"} />
                </Pressable>
                {showIngredients && (
                  <Animated.View
                    style={styles.ingredientContainer}
                    entering={FadeIn.duration(500)} // Sisääntuloefekti
                    layout={Layout}
                  >
                    {ingredients.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientRow}>
                        <Text style={styles.ingredient}>
                          {ingredient} - {measures[index] || ''}
                        </Text>
                      </View>
                    ))}
                  </Animated.View>
                )}
                <Pressable
                  style={[styles.randombutton]}
                  onPress={() => setShowInstructions(!showInstructions)}
                >
                  <Text style={styles.randombuttontext}>
                    {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
                  </Text>
                  <MaterialIcons name="chevron-right" size={24} color={"#511414"} />
                </Pressable>
                {showInstructions && (
                  <Animated.View
                    style={styles.ingredientContainer}
                    entering={FadeIn.duration(500)} // Sisääntuloefekti
                    layout={Layout}
                  >
                    <Text style={styles.text}>{instructions}</Text>
                  </Animated.View>
                )}
              </View>
            </ScrollView>
        ) : (
          <FlatList
            data={cocktails}
            keyExtractor={(item) => item.idDrink}
            ListHeaderComponent={
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.header}>Search</Text>
                <RadioButton.Group onValueChange={(value) => setSearchType(value)} value={searchType}>
                  <View>
                    <TouchableOpacity
                      style={styles.radioButtonRow}
                      onPress={() => setSearchType('ingredient')}>
                      <RadioButton value="ingredient" />
                      <Text style={styles.radioButtonText}>Search by ingredient</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.radioButtonRow}
                      onPress={() => setSearchType('name')}>
                      <RadioButton value="name" />
                      <Text style={styles.radioButtonText}>Search by name</Text>
                    </TouchableOpacity>
                  </View>
                </RadioButton.Group>
                <TextInput
                  style={styles.textinput}
                  placeholder={`Search cocktails by ${searchType}`}
                  placeholderTextColor="#662929"
                  value={query}
                  onChangeText={(text) => setQuery(text)}
                />
                <Pressable style={styles.button} onPress={searchCocktails}>
                  <Text style={styles.searchButtontext}>Search</Text>
                </Pressable>
                {error && <Text>{error}</Text>}
              </View>
            }
            renderItem={({ item }) => <Card cocktail={item} onPress={CocktailData}></Card>}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </LinearGradient>
  );
}
import React, { useState, useEffect } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import styles from '../style/style'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

const App = () => {
  const [ingredients, setIngredients] = useState([])
  const [name, setName] = useState('')
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    fetch(URL) 
      .then(response => response.json())
      .then(data => {
        const drink = data.drinks[0]
        
        setName(drink.strDrink)

        const ingredientList = Object.keys(drink)
          .filter(key => key.startsWith("strIngredient"))
          .map(key => drink[key])
          .filter(Boolean)

        setIngredients(ingredientList)
      })
      .catch(error => {
        console.log(error)
      })
  }, [refresh])

  const getNewCocktail = () => {
    setRefresh({})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <Text style={styles.text}>ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text style={styles.text} key={index}>{ingredient}</Text>
      ))}
      <Pressable style={styles.button} onPress={getNewCocktail}>
        <Text>new Drink</Text>
      </Pressable>
    </View>
  )
}

export default App

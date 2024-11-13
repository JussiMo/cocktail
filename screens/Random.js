import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'

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
    <View>
      <Text>{name}</Text>
      <Text>ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}
      <Button title='new Drink' onPress={getNewCocktail}/>
    </View>
  )
}

export default App

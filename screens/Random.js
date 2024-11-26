import React, { useState, useEffect } from 'react'
import { View, Text, Button, Pressable, Image, ScrollView } from 'react-native'
import { collection, addDoc } from 'firebase/firestore'
import { db, USERS_REF, DRINKS_REF } from '../firebase/Config'
import { auth } from '../firebase/Config'
import styles from '../style/style'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

const Random = () => {
  const [ingredients, setIngredients] = useState([])
  const [name, setName] = useState('')
  const [refresh, setRefresh] = useState()
  const [image, setImage] = useState()
  const [measures, setMeasures] = useState([])
  const [instructions, setInstructions] = useState('')
  const [drinkId, setDrinkId] = useState ()

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const drink = data.drinks[0]

        setName(drink.strDrink)
        setImage(drink.strDrinkThumb)
        setInstructions(drink.strInstructions)
        setDrinkId(drink.idDrink)

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
      })
      .catch(error => {
        console.log(error)
      })
  }, [refresh])

  const saveDrink = async (drinkId) => {
    try {
      const docRef = collection(db, USERS_REF, auth.currentUser.uid, DRINKS_REF )
      await addDoc(docRef,{id: drinkId})
      console.log('Drink ID saved: ', docRef.id)
    } catch (error) {
      console.error(error)
    }
  };


  const getNewCocktail = () => {
    setRefresh({})
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{name}</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.text}>ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredient}>{ingredient}</Text>
            <Text style={styles.measure}>{measures[index] || ''}</Text>
          </View>
        ))}
        <Text style={styles.text}> Instructions: </Text>
        <Text>{instructions}</Text>
        <Pressable style={styles.button} onPress={getNewCocktail}>
          <Text>new Drink</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={saveDrink}>
          <Text>save drink</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default Random

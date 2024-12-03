import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style/style';

export default function Home({navigation}) {
    return (
      <LinearGradient
      colors={['#2c0305', '#511414', ]} // Gradient colors 
      style={[styles.gradient]}
    >
      <View style={styles.homecontainer}>
        <Image 
          source={require('../assets/logo-cocktailapp-bg.png')}
          style={styles.homeimage}/>
        <Text style={[styles.homeheading, {marginTop: 0}]}>Welcome to Cocktail Quest!</Text>
        <Text style={[styles.hometext]}>Embark on your journey to becoming a true mixologist. Explore exciting recipes, master creative techniques, and craft cocktails that amaze. </Text>
        <Text style={[styles.homeheading, {marginTop: 20, marginBottom: 20}]}>Create. Sip. Repeat.</Text>
        <TouchableOpacity style={styles.homebutton} onPress={() => navigation.navigate('Random')}>
          <Text style={[styles.homebuttontext]} >Let's go!</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
          </LinearGradient>
    );
  }
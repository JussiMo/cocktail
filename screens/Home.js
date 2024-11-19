import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../style/style';

export default function Home() {
    return (
      <ScrollView contentContainerStyle={{  alignItems: 'center', backgroundColor: '#ffffff'}}>

        <Text style={styles.header}>Cocktail Quest</Text>
        <Text style={styles.text}>Shake things up and stir your imagination!</Text>
        <Text style={[styles.text, {marginTop: 30}]}>Dive into the vibrant world of cocktails, where every sip tells a story. Whether you’re in the mood for something classic, daring, or completely unexpected, we’ve got you covered.</Text>
        <Text style={[styles.text, {marginTop: 30}]}>✨ Feeling adventurous? Discover random cocktail recipes with a single tap.</Text>
        <Text style={[styles.text, {marginTop: 30}]}>🔍 On the hunt? Search for your perfect mix.</Text>
        <Text style={[styles.text, {marginTop: 30}]}>❤️ Found a favorite? Save it and build your personal collection of go-to drinks.</Text>
        <Text style={[styles.text, {marginTop: 30}]}>Cocktails aren’t just drinks—they’re experiences in a glass. Let’s craft your next unforgettable one!</Text>
        <Text style={[styles.text, {marginTop: 30}]}>Cheers! 🥂</Text>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
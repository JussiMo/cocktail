import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from '../style/style';

export default function Search() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Search</Text>
        <TextInput style={styles.textinput} placeholder='Search cocktails'
        />
        <StatusBar style="auto" />
      </View>
    );
  }
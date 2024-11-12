import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Home() {
    return (
      <View style={styles.container}>
        <Text>Tästä se lähtee</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
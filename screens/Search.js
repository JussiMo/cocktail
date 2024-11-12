import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Search() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
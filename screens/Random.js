import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Random() {
    return (
      <View style={styles.container}>
        <Text>Random</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Profile() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
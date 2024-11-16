import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Home() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tästä se lähtee</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula est sed elit semper pellentesque ac nec ex. Ut vel odio ac libero iaculis viverra. Duis nec vehicula diam. 
          Vestibulum lectus ligula, vehicula ac malesuada ut, faucibus at ligula. Pellentesque malesuada vel diam in vehicula. Nullam fringilla placerat nunc ac laoreet. Sed nunc diam,
           lobortis ut congue eu, congue sit amet tellus.</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
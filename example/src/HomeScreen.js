import React, { useEffect, useState, useRef } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PixelRatio,
  UIManager,
  findNodeHandle,
} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Liveness')} style={styles.btn_liveness}>
                <Text>Start LiveNess</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    btn_liveness: {
        padding: 10,
        backgroundColor: '#c0c0c0',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 24,
    },
});
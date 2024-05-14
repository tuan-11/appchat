import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import images from '../constants/images';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Onboarding');
        }, 3000);
      }, []);
      return (
        <View style={styles.container}>
          <Image source={images.splash} style={styles.splashImage} />
        </View>
      )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      splashImage: {
        width: 150,
        height: 150,
      },
})
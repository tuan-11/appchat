import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

const OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions();
    const [isFirstImage, setIsFirstImage] = useState(item.id === '1');

    useEffect(() => {
        setIsFirstImage(item.id === '1');
      }, [item]);

    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image}
                    style={[styles.image, 
                    {width, resizeMode: 'contain'},
                    isFirstImage ? { opacity: 0.1 } : {}]}/>

            {isFirstImage ? <Text style={styles.pro1}>{item.pro}</Text> : <Text style={styles.pro2}>{item.pro}</Text>}

            <View style={isFirstImage ? {flex:0.8} : {flex:0.6} }>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        justifyContent: 'center',
        marginBottom: 20
    },
    pro1: {
        position: 'absolute',
        fontWeight: '800',
        fontSize: 60,
        textAlign: 'center',
        color: '#088AE8',
        top: 200
    },
    pro2: {
        position: 'absolute',
        fontWeight: '800',
        fontSize: 30,
        textAlign: 'center',
        color: '#088AE8',
        top: 30
    },
    title:{
        fontWeight: '800',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    description: {
        fontWeight: '200',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 40,
    }
})
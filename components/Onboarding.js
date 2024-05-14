import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, { useState , useRef} from 'react'
import slides from '../slides'
import OnboardingItem from './OnboardingItem'
import StatusBar from 'react-native/Libraries/Components/StatusBar/StatusBar'
import Paginator from './Paginator'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

const Onboarding = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor="#A4CEFF" />
        <View style={{flex: 3}}>
            <FlatList 
            data={slides} 
            renderItem={({item}) => <OnboardingItem 
            item={item}/>}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
        />
        </View>
        <Paginator data={slides} scrollX={scrollX}/>
        <LoginButton
            title="Đăng nhập"
            onPress={() => navigation.navigate("LoginScreenWithContext")}
            style={{
                position: 'absolute',
                bottom: 120,
                left: 80,
                right: 80
            }}
        />
        <RegisterButton
            title="Đăng ký"
            onPress={() => navigation.navigate("RegisterScreenWithContext")}
            style={{
                position: 'absolute',
                bottom: 40,
                left: 80,
                right: 80
            }}
        />
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
})
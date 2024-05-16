import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import Onboarding from './components/Onboarding';
import LoginScreenWithContext from './screens/LoginScreen';
import RegisterScreenWithContext from './screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import EditNameScreenWithContext from './screens/EditNameScreen';
import AddFriendScreenWithContext from './screens/AddFriendScreen';
import OrtherUserScreenWithContext from './screens/OrtherUserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRoutName='SplashScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="LoginScreenWithContext" component={LoginScreenWithContext} />
        <Stack.Screen name="RegisterScreenWithContext" component={RegisterScreenWithContext} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="EditNameScreenWithContext" component={EditNameScreenWithContext} />
        <Stack.Screen name="AddFriendScreenWithContext" component={AddFriendScreenWithContext} />
        <Stack.Screen name="OrtherUserScreenWithContext" component={OrtherUserScreenWithContext} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

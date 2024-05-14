  import { StyleSheet, ScrollView, View, Text, Pressable, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native'
  import React, { useState, useEffect} from 'react'
  import icons from '../../constants/icons';
  import Header from '../../components/Header';
  import EnterName from './EnterName';
  import EnterEmail from './EnterEmail';
  import EnterPhone from './EnterPhone';
  import EnterDayofBirthAndGender from './EnterDayofBirthAndGender';
  import EnterPassword from './EnterPassword';
  import { useAuth, AuthContextProvider } from '../../context/authContext';

  const RegisterScreen = () => {
      const [isNextButtonDisabled_name, setIsNextButtonDisabled_name] = useState(false);
      const [isNextButtonDisabled_email, setIsNextButtonDisabled_email] = useState(false);
      const [isNextButtonDisabled_phone, setIsNextButtonDisabled_phone] = useState(false);
      const [isNextButtonDisabled_dayOfbirth, setIsNextButtonDisabled_dayOfbirth] = useState(false);
      const [isNextButtonDisabled_pass, setIsNextButtonDisabled_pass] = useState(false);
      const [name, setReceivedName] = useState('');
      const [email, setReceivedEmail] = useState('');
      const [phoneNumber, setReceivedPhone] = useState('');
      const [dayOfbirth, setReceivedDayOfbirth] = useState('');
      const [gender, setReceivedGender] = useState('');
      const [password, setReceivedPass] = useState('');
      const [loading, setLoading] = useState(false);
      const {register} = useAuth();

      const handleNameSubmit = (name) => {
        setReceivedName(name);
      };
      const handleEmailSubmit = (email) => {
          setReceivedEmail(email);
        };
      const handlePhoneSubmit = (phoneNumber) => {
          setReceivedPhone(phoneNumber);
        };
      const handleDayOfbirthSubmit = (dayOfbirth) => {
          setReceivedDayOfbirth(dayOfbirth);
        };
      const handleGenderSubmit = (gender) => {
          setReceivedGender(gender);
        };
      const handlePassSubmit = (password) => {
          setReceivedPass(password);
        };

      const signUp = async () => {
          await register(name, email, phoneNumber, gender, dayOfbirth, password);
        };

      const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
          signUp()
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
            });
        }, 3000);
      };
      
      const handleIsNextButtonDisabledChange_name = (value) => {
          setIsNextButtonDisabled_name(value);
        };
      const handleIsNextButtonDisabledChange_email = (value) => {
          setIsNextButtonDisabled_email(value);
        };
      const handleIsNextButtonDisabledChange_phone = (value) => {
          setIsNextButtonDisabled_phone(value);
        };
      const handleIsNextButtonDisabledChange_dayOfbirth = (value) => {
          setIsNextButtonDisabled_dayOfbirth(value);
        };
      const handleIsNextButtonDisabledChange_pass = (value) => {
          setIsNextButtonDisabled_pass(value);
        };
        return(
          <View style={styles.container}>
              <Header title="Tạo tài khoản"/>
              <View style={styles.requestContainer}>
                  <Text style={{fontSize: 14, color: '#4F4F4F'}}>Vui lòng nhập đầy đủ các thông tin</Text>
              </View>
              <ScrollView>
                  <View style={styles.infoContainer}>
                      <EnterName onIsNextButtonDisabledChange={handleIsNextButtonDisabledChange_name} onSubmitName={handleNameSubmit}/>
                      <EnterEmail onIsNextButtonDisabledChange={handleIsNextButtonDisabledChange_email} onSubmitEmail={handleEmailSubmit}/>
                      <EnterPhone onIsNextButtonDisabledChange={handleIsNextButtonDisabledChange_phone} onSubmitPhone={handlePhoneSubmit}/>
                      <EnterDayofBirthAndGender onIsNextButtonDisabledChange={handleIsNextButtonDisabledChange_dayOfbirth} onSubmitDayofBirth={handleDayOfbirthSubmit} onSubmitGender={handleGenderSubmit}/>
                      <EnterPassword onIsNextButtonDisabledChange={handleIsNextButtonDisabledChange_pass} onSubmitPass={handlePassSubmit}/>
                  </View>
                  <View style={styles.btnNextContainer}>  
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#41ADFA" />  
                    </View>
                  ) : (    
                      <Pressable 
                          style={[styles.nextContainer, 
                              { backgroundColor: (!isNextButtonDisabled_name || 
                                                  !isNextButtonDisabled_email || 
                                                  !isNextButtonDisabled_phone ||
                                                  !isNextButtonDisabled_dayOfbirth ||
                                                  !isNextButtonDisabled_pass) ? '#DDDDDD' : '#41ADFA'},
                              { alignItems: 'center' }]}
                          disabled={!isNextButtonDisabled_name || 
                                      !isNextButtonDisabled_email ||
                                      !isNextButtonDisabled_phone ||
                                      !isNextButtonDisabled_dayOfbirth ||
                                      !isNextButtonDisabled_pass}
                          onPress={handleSubmit}
                      >
                          <Image
                              source={icons.next}
                              style={styles.nextIcon}
                          />
                      </Pressable>
                      )}
                  </View>
              </ScrollView>
          </View>
      )
  }

  const RegisterScreenWithContext = () => {
    return (
      <AuthContextProvider>
        <RegisterScreen />
      </AuthContextProvider>
    );
  };
  
  export default RegisterScreenWithContext;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
      },
      requestContainer: {
          alignItems:'flex-start',
          backgroundColor: '#ECECEC',
          height: 40,
          paddingLeft: 20,
          justifyContent: 'center'
      },
      infoContainer: {
          alignItems: 'center',
          backgroundColor: 'white',
      },
      btnNextContainer: {
          alignItems:'flex-end',
          backgroundColor: 'white',
          orderRadius: 20,
          marginTop: 100,
      },
      nextContainer: {
          width: 50,
          height: 50,
          backgroundColor: '#41ADFA',
          justifyContent: 'center',
          borderRadius: 10,
          right: 15,
          bottom: 15
      },
      loadingContainer: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      nextIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
        alignSelf: 'center'
      },
  })
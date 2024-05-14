  import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, TextInput } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import RadioForm from 'react-native-simple-radio-button';
  import icons from '../../constants/icons';
  import DateTimePickerModal from "react-native-modal-datetime-picker";

  const EnterDayofBirthAndGender = ({ onIsNextButtonDisabledChange, onSubmitDayofBirth, onSubmitGender }) => {

    const [selectedGender, setSelectedGender] = useState('Nam');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const isNextButtonDisabled = !error;
      onIsNextButtonDisabledChange(isNextButtonDisabled);
  }, [error]);

    useEffect(() => {
      checkAge();
      onSubmitDayofBirth(formatDate(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
      onSubmitGender(selectedGender);
    }, [selectedGender]);

    const checkAge = () => {
      const isUserOldEnough = isOver18(selectedDate);
      if (!isUserOldEnough) {
        setError('Người dùng chưa đủ 18 tuổi');
      } else {
        setError('');
      }
    };

    const calculateAge = (birthDate) => {
      const currentDate = new Date();
      const birthYear = birthDate.getFullYear();
      const age = currentDate.getFullYear() - birthYear;
      const hasPassedBirthdayThisYear = (currentDate.getMonth() >= birthDate.getMonth()) && 
                                      (currentDate.getDate() >= birthDate.getDate());
      if (!hasPassedBirthdayThisYear) {
        age -= 1;
      }
      return age;
    }

    const isOver18 = (birthDate) => {
      const age = calculateAge(birthDate);
      return age >= 18;
    }

    const genderOptions = [
      { label: '', value: 'Nam' },
      { label: '', value: 'Nữ' },
      ];

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };
    return (
      <View>
        <View style={styles.genderContainer}>
          <Text style={styles.gendertitle}>Giới tính</Text>
          <View style={styles.genderIconContainer}>
            <Image source={icons.male} style={styles.genderIcon}/>
            <Image source={icons.female} style={styles.genderIcon}/>
          </View>
          <RadioForm
                radio_props={genderOptions}
                initial={selectedGender === 'Name' ? 0 : 1}
                onPress={(value) => setSelectedGender(value)}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'#2196f3'}
                selectedButtonColor={'#2196f3'}
                formHorizontal={true}
                labelHorizontal={false}
                style={styles.radioForm}
              />
        </View>
        <View style={styles.birthdayContainer}>
              <Text style={styles.birthdaytitle}>Ngày Sinh</Text>

              <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                value={formatDate(selectedDate)}
                editable={false}
                caretHidden={true}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Image source={icons.calendar} style={styles.calendarIcon}/>
                </TouchableOpacity>
              </View>
              
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS="Xác nhận"
                cancelTextIOS="Hủy"
                date={selectedDate}
                maximumDate={new Date()}
              />
            </View>
            {error && <Text style={{ color: 'red', marginTop: 10, marginLeft: 20}}>{error}</Text>}
      </View>
    )
  }

  export default EnterDayofBirthAndGender

  const styles = StyleSheet.create({
    genderContainer: {
      alignItems: 'center',
    },
    gendertitle: {
      fontSize: 18, 
      fontWeight: '800', 
      color: '#41ADFA',
      width: '90%',
      marginTop: 20,
    },
    radioForm: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '59%',
      top: 15,
      left: -5
    },
    genderIconContainer: {
      flexDirection: 'row',
      top: 20
    },
    genderIcon: {
      marginHorizontal: 44,
    },
    birthdayContainer: {
      alignItems: 'center',
    },
    birthdaytitle: {
      fontSize: 18, 
      fontWeight: '800', 
      color: '#41ADFA',
      width: '90%'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '80%',
      borderWidth: 1,
      borderColor: '#088AE8',
      borderRadius: 15,
      paddingHorizontal: 10,
      marginTop: 20
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 18,
      marginLeft: 10,
      color: 'gray',
    },
    calendarIcon: {
      width: 30,
      height: 30,
    },
  })
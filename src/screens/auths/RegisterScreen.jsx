import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableHighlight } from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeInput, setActiveInput] = useState('');

  const inputNameStyle = activeInput === 'name' ? styles.inputActive : styles.input;
  const inputEmailStyle = activeInput === 'email' ? styles.inputActive : styles.input;
  const inputPhoneStyle = activeInput === 'phone' ? styles.inputActive : styles.input;
  const inputPasswordStyle = activeInput === 'password' ? styles.inputActive : styles.input;
  const inputConfirmPasswordStyle = activeInput === 'confirmPassword' ? styles.inputActive : styles.input;

  const handleRegister = () => {
    if (password !== confirmPassword) {
      SweetAlert.showAlertWithOptions({
        title: 'Error',
        subTitle: 'Password and Confirm Password do not match',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#EFC81A',
        style: 'error',
      });
      return;
    }

    axios
      .post('https://rich-blue-shrimp-wig.cyclic.app/auth/register', {
        email: email,
        fullname: name,
        phoneNumber: phone,
        password: password,
      })
      .then(response => {
        SweetAlert.showAlertWithOptions({
          title: 'Success',
          subTitle: 'Registration successful',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#EFC81A',
          style: 'success',
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Error:', error);
        SweetAlert.showAlertWithOptions({
          title: 'Error',
          subTitle: 'Registration failed',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#EFC81A',
          style: 'error',
        });
      });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Let’s Get Started!</Text>
          <Text>Create a new account to access all features</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={inputNameStyle}
            onChangeText={setName}
            onFocus={() => setActiveInput('name')}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={inputEmailStyle}
            onChangeText={setEmail}
            onFocus={() => setActiveInput('email')}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={inputPhoneStyle}
            onChangeText={setPhone}
            onFocus={() => setActiveInput('phone')}
            value={phone}
            placeholder="Phone Number"
          />
          <TextInput
            style={inputPasswordStyle}
            onChangeText={setPassword}
            onFocus={() => setActiveInput('password')}
            value={password}
            secureTextEntry={true}
            placeholder="Create New Password"
          />
          <TextInput
            style={inputConfirmPasswordStyle}
            onChangeText={setConfirmPassword}
            onFocus={() => setActiveInput('confirmPassword')}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm New Password"
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor="white" style={styles.buttonHighlight} onPress={handleRegister}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>CREATE</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In Here</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 30,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: '#EFC81A',
  },
  formContainer: {
    paddingBottom: 100,
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#EFC81A',
  },
  buttonContainer: {
    margin: 12,
  },
  buttonHighlight: {
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EFC81A',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginText: {
    textAlign: 'center',
  },
  loginLink: {
    color: '#EFC81A',
  },
});

export default RegisterScreen;

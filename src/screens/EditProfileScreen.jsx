import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, Avatar } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { AppContext } from '../../AppContext';

const EditProfileScreen = ({ navigation }) => {
  const { token, user, setUser } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(user.profile_picture || '');
  const [email, setEmail] = useState(user.email || '');
  const [fullname, setFullname] = useState(user.fullname || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [password, setPassword] = useState('');

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      res => {
        if (!res.didCancel && !res.errorCode) {
          setSelectedImage({
            uri: res.assets[0].uri,
            name: res.assets[0].fileName,
            type: res.assets[0].type,
          });
        }
      },
    );
  };

  const handleSaveProfile = () => {
    if (!email || !fullname || !phoneNumber || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const profileUpdateData = {
      email: email,
      fullname: fullname,
      phoneNumber: phoneNumber,
      password: password,
    };

    axios
      .patch('https://rich-blue-shrimp-wig.cyclic.app/profile', profileUpdateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log('Profile data updated successfully:', response.data);
        Alert.alert('Success', 'Profile data updated successfully');

        const updatedUser = {
          profile_picture: selectedImage,
          email: response?.data?.data[0]?.email,
          fullname: response?.data?.data[0]?.fullname,
          phone_number: response?.data?.data[0]?.phone_number,
        };
        console.log(JSON.stringify(updatedUser))
        setUser(updatedUser)

        if (selectedImage.uri) {
          const profilePictureFormData = new FormData();
          profilePictureFormData.append('photo', selectedImage);

          axios
            .patch('https://rich-blue-shrimp-wig.cyclic.app/profile/photo', profilePictureFormData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(response => {
              console.log('Profile picture updated successfully:');
              const updatedUser = {
                profile_picture: response?.data?.data?.profile_picture,
                email: response?.data?.data?.email,
                fullname: response?.data?.data?.fullname,
                phone_number: response?.data?.data?.phone_number,
              };
              console.log(JSON.stringify(updatedUser))
              setUser(updatedUser)
            })
            .catch(error => {
              console.error('Error updating profile picture:', error);
              Alert.alert('Error', 'Failed to update profile picture');
            });
        }
        navigation.navigate('Profile');
      })
      .catch(error => {
        console.error('Error updating profile data:');
        Alert.alert('Error', 'Failed to update profile data');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Edit Profile</Title>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{ uri: selectedImage.uri || selectedImage }}
          size={100}
          style={{ backgroundColor: '#EFC81A' }}
        />
        <Button
          mode="contained"
          onPress={handleImagePicker}
          style={styles.uploadButton}
        >
          Upload Photo
        </Button>
      </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Full Name"
        value={fullname}
        onChangeText={text => setFullname(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <Button
        mode="contained"
        onPress={handleSaveProfile}
        style={styles.button}
      >
        Save Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FEFEFE',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EFC81A',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#EEC242',
  },
  uploadButton: {
    backgroundColor: '#EFC81A',
    marginTop: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default EditProfileScreen;

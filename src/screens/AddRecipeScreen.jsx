import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppContext } from '../../AppContext';
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/dist/Feather';

const AddRecipeScreen = ({ navigation }) => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = React.useState('');
  const [ingredients, setIngredients] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { token, user, setRecipes } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      // Redirect to login screen if token is not defined
      navigation.navigate('Login');
    }
  }, []);

  if (!token) {
    // If token is not defined, don't render the screen
    return null;
  }


  const categories = [
    { key: '1', value: 'Main Dish' },
    { key: '2', value: 'Snack' },
    { key: '3', value: 'Dessert' },
    { key: '4', value: 'Salad' },
    { key: '5', value: 'Beverage' },
    { key: '6', value: 'Breakfast' },
  ]


  const handleSubmit = () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('recipePicture', selectedImage);
    formData.append('title', recipeTitle);
    formData.append('category', category);
    formData.append('ingredients', ingredients);
    formData.append('userId', user.id);
    formData.append('videoLink', videoLink);

    axios
      .post('https://rich-blue-shrimp-wig.cyclic.app/recipe', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setIsLoading(false);

        setRecipeTitle('');
        setIngredients('');
        setVideoLink('');
        setSelectedImage(null);

        const newRecipe = response?.data?.data[0];
        console.log(newRecipe);
        setRecipes(prevRecipes => [newRecipe, ...prevRecipes]);

        Alert.alert(
          'Success',
          'Recipe added successfully',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }],
          { cancelable: false }
        );
      })
      .catch(error => {
        setIsLoading(false);

        Alert.alert(
          'Error',
          error?.response?.data?.message || 'An error occurred',
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: false }
        );
      });
  };

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

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Add Your Recipe</Title>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.image}
        />
      )}
      <Button mode="contained" onPress={handleImagePicker} style={styles.button}>
        Upload Recipe Picture
      </Button>
      <TextInput
        label="Recipe Title"
        value={recipeTitle}
        mode="outlined"
        onChangeText={text => setRecipeTitle(text)}
        style={styles.input}
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <SelectList
        style={styles.input}
        setSelected={(val) => setCategory(val)}
        data={categories}
        boxStyles={{
          borderColor: '#EFC81A',
          borderRadius: 2,
        }}
        save="value"
      />
      <TextInput
        label="Ingredients"
        value={ingredients}
        onChangeText={text => setIngredients(text)}
        style={styles.input}
        multiline
        numberOfLines={7}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Link Video"
        value={videoLink}
        onChangeText={text => setVideoLink(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'

      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
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
    borderColor: '#EFC81A',
  },
  button: {
    backgroundColor: "#EEC242",
    marginBottom: 25,
  },
  image: {
    width: "70%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#EEC242',
    borderRadius: 30,
    alignSelf: 'center',
  },
});

export default AddRecipeScreen;

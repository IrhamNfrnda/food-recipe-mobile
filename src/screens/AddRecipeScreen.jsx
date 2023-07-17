import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleAddRecipe = () => {
    setTitle('');
    setIngredients('');
    setVideoLink('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Recipe</Text>

      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        label="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
        multiline
      />

      <TextInput
        label="Video Link"
        value={videoLink}
        onChangeText={setVideoLink}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleAddRecipe}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Post
      </Button>
    </View>
  );
}

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
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '70%',
  },
  buttonContent: {
    height: 50,
  },
});

export default AddRecipeScreen;

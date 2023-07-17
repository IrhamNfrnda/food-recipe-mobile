import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Searchbar, Text, Avatar, Card } from 'react-native-paper';
import axios from 'axios';
import { AppContext } from '../../AppContext';

function Home({ navigation }) {
  const { recipes, setRecipes } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    console.log(recipes);
    axios
      .get('https://rich-blue-shrimp-wig.cyclic.app/recipe?limit=9&page=1')
      .then(response => {
        const { data } = response.data;
        data.shift();
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error, show a message, etc.
      });
  }, []);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Searchbar
          placeholder="Search Pasta, Bread, etc"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />

        {/* Popular Recipes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Recipes</Text>
          <Text style={styles.sectionSubtitle}>Popular check</Text>
          <ScrollView horizontal>
            {recipes.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate('Detail', { recipe: item })}>
                <ImageBackground
                  source={{ uri: item.recipe_picture }}
                  style={styles.recipeCard}
                  imageStyle={styles.recipeCardImage}>
                  <View>
                    <Text style={styles.recipeCardTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* End of Popular Recipes */}

        {/* New Recipes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Recipes</Text>
            <Text style={styles.sectionLink}>More info</Text>
          </View>

          <View style={styles.recipeCategoryContainer}>
            <View style={styles.recipeCategory}>
              <Avatar.Image
                size={80}
                source={require('../assets/images/SoupIcon.png')}
                style={styles.recipeCategoryAvatar}
              />
              <Text style={styles.recipeCategoryTitle}>Soup</Text>
            </View>
            <View style={styles.recipeCategory}>
              <Avatar.Image
                size={80}
                source={require('../assets/images/ChickenIcon.png')}
                style={styles.recipeCategoryAvatar}
              />
              <Text style={styles.recipeCategoryTitle}>Chicken</Text>
            </View>
            <View style={styles.recipeCategory}>
              <Avatar.Image
                size={80}
                source={require('../assets/images/SeafoodIcon.png')}
                style={styles.recipeCategoryAvatar}
              />
              <Text style={styles.recipeCategoryTitle}>Seafood</Text>
            </View>
            <View style={styles.recipeCategory}>
              <Avatar.Image
                size={80}
                source={require('../assets/images/DesertIcon.png')}
                style={styles.recipeCategoryAvatar}
              />
              <Text style={styles.recipeCategoryTitle}>Dessert</Text>
            </View>
          </View>
        </View>
        {/* End of New Recipes */}

        {/* Popular For You */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>New Recipes</Text>

          <ScrollView horizontal>
            {recipes.map((item, key) => (
              <Card style={styles.popularRecipeCard} key={key}>
                <TouchableOpacity
                  key={key}
                  onPress={() => navigation.navigate('Detail', { recipe: item })}>
                  <Card.Cover
                    source={{ uri: item.recipe_picture }}
                    style={styles.popularRecipeCardImage}
                  />
                  <Card.Content style={styles.popularRecipeCardContent}>
                    <Text style={styles.popularRecipeCardTitle}>{item.title}</Text>
                    <Text style={styles.popularRecipeCardBody} numberOfLines={1}>
                      Beef steak with nopales, tartare ....
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>
        {/* End of Popular For You */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    padding: 10,
  },
  searchbar: {
    backgroundColor: '#DDDDDD',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '200',
    marginBottom: 10,
  },
  sectionLink: {
    color: '#6D61F2',
  },
  recipeCard: {
    height: 150,
    justifyContent: 'flex-end',
    padding: 10,
    width: 250,
    marginRight: 10,
  },
  recipeCardImage: {
    borderRadius: 6,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  recipeCardTitle: {
    color: '#fff',
  },
  recipeCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  recipeCategory: {
    alignItems: 'center',
  },
  recipeCategoryAvatar: {
    borderRadius: 20,
    backgroundColor: '#57ce96',
  },
  recipeCategoryTitle: {
    textAlign: 'center',
    marginTop: 5,
  },
  popularRecipeCard: {
    width: 250,
    marginRight: 15,
  },
  popularRecipeCardImage: {
    height: 150,
    borderRadius: 0,
  },
  popularRecipeCardContent: {
    paddingTop: 10,
  },
  popularRecipeCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularRecipeCardBody: {
    fontSize: 14,
  },
});

export default Home;

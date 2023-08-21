import React, { useEffect, useState, useContext } from 'react';
import { Text, Button, Avatar } from 'react-native-paper';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import axios from 'axios';
import { AppContext } from '../../AppContext';

function DetailScreen({ navigation, route }) {
  const { recipe } = route.params || {};
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { token, user } = useContext(AppContext);

  const [type, setType] = useState('ingredients');

  useEffect(() => {
    const currentSlug = recipe.slug;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Fetch current recipe using axios
    axios.get(`https://rich-blue-shrimp-wig.cyclic.app/recipe/detail/${currentSlug}`, {
      headers: headers,
    })
      .then((result) => {
        setComments(result.data?.data?.comments)
        setLiked(result.data?.data?.isLiked)
        setSaved(result.data?.data?.isSaved)
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  }, []);

  const handleLikeButton = () => {
    if (!user.id) {
      return Alert.alert(
        'Failed',
        'Please login first to like',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: false }
      );
    }

    if (!liked) {
      axios.post(`https://rich-blue-shrimp-wig.cyclic.app/recipe/like`, {
        userId: user.id,
        recipeId: recipe.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLiked(!liked);
        })
        .catch((error) => {
          Alert.alert(
            'Failed',
            'Failed to like recipe',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false }
          );
        });
    } else {
      console.log('unliked')
      axios.post(`https://rich-blue-shrimp-wig.cyclic.app/recipe/unlike`, {
        userId: user.id,
        recipeId: recipe.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLiked(!liked);
        })
        .catch((error) => {
          Alert.alert(
            'Failed',
            'Failed to unlike recipe',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false }
          );
        });
    }
  };

  const handleSaveButton = () => {
    if (!user.id) {
      return Alert.alert(
        'Error',
        'Please login first to save',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: false }
      );
    }

    if (!saved) {
      axios.post(`https://rich-blue-shrimp-wig.cyclic.app/recipe/save`, {
        userId: user.id,
        recipeId: recipe.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setSaved(!saved);
        })
        .catch((error) => {
          Alert.alert(
            'Failed',
            'Failed to save recipe',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false }
          );
        });
    } else {
      axios.post(`https://rich-blue-shrimp-wig.cyclic.app/recipe/unsave`, {
        userId: user.id,
        recipeId: recipe.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setSaved(!saved);
        })
        .catch((error) => {
          Alert.alert(
            'Failed',
            'Failed to unsave recipe',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false }
          );
        });
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
        }}>
        {/* Header Background */}
        <View
          style={{
            flex: 0.8,
            width: '100%',
            // backgroundColor: 'gray',
          }}>
          <ImageBackground
            source={{ uri: recipe.recipe_picture }}
            resizeMode="cover"
            style={{
              height: '100%',
              justifyContent: 'flex-end',
              width: '100%',
            }}
            imageStyle={{
              borderRadius: 6,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
            }}>
            <View style={{ position: 'absolute', top: 20, marginLeft: 20 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 25, padding: 20 }}>
              <Text
                variant="titleLarge"
                style={{
                  color: '#fff',
                  fontSize: 25,
                  marginBottom: 2,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
                numberOfLines={1}>
                {recipe.title}
              </Text>

              <View style={{ position: 'absolute', top: 10, right: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSaveButton}>
                  <View style={[styles.actContainer, , { backgroundColor: saved ? '#EEC302' : 'white' }]}>
                    <Icon name="save" size={20} color={saved ? 'white' : '#EEC302'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLikeButton}>
                  <View style={[styles.actContainer, , { backgroundColor: liked ? '#EEC302' : 'white' }]}>
                    <Icon name="hearto" size={20} color={liked ? 'white' : '#EEC302'} style={{ alignSelf: 'center' }} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* <Text
                style={{
                  fontSize: 11,
                  fontWeight: 100,
                  marginBottom: 10,
                  color: '#fff',
                }}
                numberOfLines={1}>
                By Chef Ronald Humson
              </Text> */}
            </View>
          </ImageBackground>
        </View>
        {/* End of Header Background */}

        {/* Main Content */}
        <View
          style={{
            flex: 1,
            minWidth: '100%',
            backgroundColor: 'white',
            marginTop: -20,
            borderRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}>
          {/* Button Switch */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Button
              labelStyle={
                type === 'ingredients'
                  ? styles.buttonActive
                  : styles.buttonNonActive
              }
              onPress={() => setType('ingredients')}>
              Ingredients
            </Button>
            <Button
              labelStyle={
                type === 'video' ? styles.buttonActive : styles.buttonNonActive
              }
              onPress={() => setType('video')}>
              Video Step
            </Button>
          </View>

          <ScrollView>
            {/* Ingridients View */}
            {type === 'ingredients' ? (
              <View style={{ backgroundColor: '#FAF7ED', borderRadius: 10, padding: 20 }}>
                <Text>{recipe.ingredients}</Text>
              </View>
            ) : (
              <>
                {/* Video Step View */}
                {
                  <TouchableOpacity onPress={() => Linking.openURL(recipe.video_link)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#FAF7ED',
                        padding: 10,
                        borderRadius: 15,
                        alignItems: 'center',
                        gap: 25,
                        marginBottom: 15,
                      }}>
                      <Avatar.Image
                        size={60}
                        source={require('../assets/images/play_icon.png')}
                        style={{ borderRadius: 20, backgroundColor: '#efc81a' }}
                      />

                      <View>
                        <Text style={{ fontSize: 18, color: '#B6B6B6' }}>
                          Video
                        </Text>
                        <Text>Click for video step</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              </>
            )}
          </ScrollView>
        </View>
        {/* End Of Main Content */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonActive: {
    color: '#18172B',
    borderBottomWidth: 2,
    borderBottomColor: '#EEC302',

    fontSize: 16,
  },
  buttonNonActive: { color: '#666666', fontSize: 16 },
  actContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    marginEnd: 3,
  }
});

export default DetailScreen;
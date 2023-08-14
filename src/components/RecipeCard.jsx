import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

function PopularRecipeCard(props) {
    const { recipe, navigation, from } = props;
    return (
        <>
            <TouchableRipple
                onPress={() => navigation.navigate('Detail', { recipe })}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: recipe?.recipe_picture }} style={styles.recipeImage} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.recipeTitle}>{recipe?.title}</Text>
                        <Text style={styles.recipeCategory}>category</Text>
                    </View>
                </View>
            </TouchableRipple>
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#EEC302',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 2,
      },
      imageContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#EEC302",
      },
      recipeImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
      },
      detailsContainer: {
        flex: 2,
        padding: 10,
        justifyContent: 'center',
      },
      recipeTitle: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
        marginBottom: 5,
      },
      recipeCategory: {
        fontSize: 14,
        color: '#888',
      },
});

export default PopularRecipeCard;
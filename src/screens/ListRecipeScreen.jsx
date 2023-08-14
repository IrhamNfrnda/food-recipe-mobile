import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { AppContext } from '../../AppContext';

function SearchScreen({ navigation, route }) {
    const { user } = useContext(AppContext);
    const { searchKeyword, searchMode } = route.params; 
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (searchMode === 'search') {
            axios
                .get(`https://rich-blue-shrimp-wig.cyclic.app/recipe`, {
                    params: {
                        keyword: searchKeyword,
                    },
                })
                .then((response) => {
                    const data = response?.data?.data;
                    setSearchResult(data.slice(1));
                })
                .catch((error) => {
                    console.error("Error searching recipes:", error);
                });
        } else if (searchMode === 'myRecipes') {
            axios
                .get(`https://rich-blue-shrimp-wig.cyclic.app/recipe/user/${user.id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    setSearchResult(data.slice(1));
                })
                .catch((error) => {
                    console.error("Error fetching user's recipes:", error);
                });
        }
    }, [searchKeyword, searchMode]);

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="#EFC81A" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>List Recipe</Text>
                </View>
            </View>

            <ScrollView style={{ padding: 10 }}>
                {searchResult.length !== 0 ? (
                    searchResult.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            navigation={navigation}
                            recipe={recipe}
                            from={'search'}
                        />
                    ))
                ) : (
                    <Text style={{ textAlign: 'center' }}>Recipe not found</Text>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        elevation: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#EFC81A',
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default SearchScreen;
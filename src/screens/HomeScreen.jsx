import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Text, Avatar, Card} from 'react-native-paper';

function Home({navigation}) {

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: '#EEEEEE',
            padding: 10
          }}>
          <Searchbar
            placeholder="Search Pasta, Bread, etc"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{backgroundColor: '#DDDDDD', marginBottom: 20}}
          />

          {/* Popular Recipes */}
          <View style={{marginBottom: 35}}>
            <Text variant="labelLarge" style={{fontSize: 20}}>
              Popular Recipes
            </Text>
            <Text
              variant="labelSmall"
              style={{fontSize: 13, fontWeight: 200, marginBottom: 10}}>
              Populer check
            </Text>
            <ScrollView horizontal>
              {[...new Array(4)].map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => navigation.navigate('Detail')}>
                  <ImageBackground
                    source={require('../assets/images/BananaLemonilo.png')}
                    style={{
                      height: 150,
                      justifyContent: 'flex-end',
                      padding: 10,
                      width: 250,
                      marginRight: 10,
                    }}
                    imageStyle={{
                      borderRadius: 6,
                      resizeMode: 'cover',
                      position: 'absolute',
                      top: 0,
                    }}>
                    <View>
                      <Text
                        variant="titleLarge"
                        style={{color: '#fff'}}
                        numberOfLines={1}>
                        Banana Lemonilo
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* End of Popular Recipes */}

          {/* New Recipes */}
          <View style={{marginBottom: 35}}>
            <View style={styles.newRecipeTitle}>
              <Text variant="labelLarge" style={{fontSize: 20}}>
                New Recipes
              </Text>
              <Text style={{color: '#6D61F2'}}>More info</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/SoupIcon.png')}
                  style={{borderRadius: 20, backgroundColor: '#57ce96'}}
                />
                <Text style={{textAlign: 'center', marginTop: 5}}>Soup</Text>
              </View>
              <View>
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/ChickenIcon.png')}
                  style={{borderRadius: 20, backgroundColor: '#fde901'}}
                />
                <Text style={{textAlign: 'center', marginTop: 5}}>Chicken</Text>
              </View>
              <View>
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/SeafoodIcon.png')}
                  style={{borderRadius: 20, backgroundColor: '#57ce96'}}
                />
                <Text style={{textAlign: 'center', marginTop: 5}}>Seafood</Text>
              </View>
              <View>
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/DesertIcon.png')}
                  style={{borderRadius: 20, backgroundColor: '#fde901'}}
                />
                <Text style={{textAlign: 'center', marginTop: 5}}>Dessert</Text>
              </View>
            </View>
          </View>
          {/* End of New Recipes */}

          {/* Popular For you */}
          <View>
            <Text variant="labelLarge" style={{fontSize: 20, marginBottom: 15}}>
              Popular Recipes
            </Text>

            <ScrollView horizontal>
              {[...new Array(4)].map((item, key) => (
                <Card style={{width: 250, marginRight: 15}} key={key}>
                  <Card.Cover
                    source={require('../assets/images/BeefSteak.png')}
                    style={{height: 150, objectFit: 'cover', borderRadius: 0}}
                  />
                  <Card.Content style={{paddingTop: 10}}>
                    <Text variant="titleLarge">Beef Steak</Text>
                    <Text variant="bodyMedium" numberOfLines={1}>
                      Beef steak with nopales, tartare ....
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          </View>
          {/* End of Popular For you */}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  newRecipeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
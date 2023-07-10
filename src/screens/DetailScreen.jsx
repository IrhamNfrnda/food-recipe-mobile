import React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

function DetailScreen({navigation}) {

  const [type, setType] = React.useState('ingredients');

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
            source={require('../assets/images/BananaLemonilo.png')}
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
            <View style={{position: 'absolute', top: 20, marginLeft: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 25, padding: 20}}>
              <Text
                variant="titleLarge"
                style={{
                  color: '#fff',
                  fontSize: 30,
                  marginBottom: 2,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}
                numberOfLines={1}>
                Banana Lemonilo
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 100,
                  marginBottom: 10,
                  color: '#fff',
                }}
                numberOfLines={1}>
                By Chef Ronald Humson
              </Text>
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
          <View style={{flexDirection: 'row', marginBottom: 20}}>
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
              <View
                style={{
                  backgroundColor: '#FAF7ED',
                  borderRadius: 10,
                  padding: 20,
                }}>
                <Text>
                  - 2 slices whole-grain bread (bakery-fresh recommended) {'\n'}
                  - 1 tablespoon hummus {'\n'}- 2 slices tomato - 1/2 small
                  cucumber, thinly sliced lengthwise {'\n'}- 1 slice low-fat
                  cheese
                </Text>
              </View>
            ) : (
              <>
                {/* Video Step View */}
                {[...new Array(5)].map((item, key) => (
                  <View
                    key={key}
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
                      style={{borderRadius: 20, backgroundColor: '#efc81a'}}
                    />

                    <View>
                      <Text style={{fontSize: 18, color: '#B6B6B6'}}>
                        Step 1
                      </Text>
                      <Text>Boil eggs for 3 minutes</Text>
                    </View>
                  </View>
                ))}
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
  buttonNonActive: {color: '#666666', fontSize: 16},
});

export default DetailScreen;
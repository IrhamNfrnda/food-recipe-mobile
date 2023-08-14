import React, { useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import { AppContext } from '../../AppContext';

function ProfileScreen({ navigation }) {
  const { token, setToken, user } = useContext(AppContext);

  React.useEffect(() => {
    if (!token) {
      // Redirect to login screen if token is not defined
      navigation.navigate('Login');
    }
  }, []);

  const handleLogout = () => {
    // Clear token and reset state
    setToken(null);

    // Navigate to the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };


  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user?.profile_picture }}
          style={styles.profileIcon}
        />
        <Text style={styles.profileName}>{user?.fullname}</Text>
      </View>
      <View style={styles.profileCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Icon name="user" size={24} color="#EEC242" />
              <Text style={styles.listItemText}>Edit Profile</Text>
            </View>
            <Icon name="angle-right" size={24} color="#8C8C8C" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListRecipe', { searchMode: 'myRecipes' })}
        >
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Icon name="award" size={25} color="#EEC242" />
            <Text style={styles.listItemText}>My Recipe</Text>
          </View>
          <Icon name="angle-right" size={24} color="#8C8C8C" />
        </View>
        </TouchableOpacity>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Icon name="bookmark" size={24} color="#EEC242" />
            <Text style={styles.listItemText}>Saved Recipe</Text>
          </View>
          <Icon name="angle-right" size={24} color="#8C8C8C" />
        </View>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Icon name="thumbs-up" size={24} color="#EEC242" />
            <Text style={styles.listItemText}>Liked Recipe</Text>
          </View>
          <Icon name="angle-right" size={24} color="#8C8C8C" />
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Icon2 name="sign-out" size={24} color="#EEC242" />
              <Text style={styles.listItemText}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
    backgroundColor: '#EEC242',
  },
  profileIcon: {
    padding: 20,
    width: 124,
    height: 124,
    borderRadius: 100,
  },
  profileName: {
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileCard: {
    marginTop: -24,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TextInput, ScrollView, Text, View, Button } from 'react-native';

const UserDetailsScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState({
    id: 0,
    uid: '',
    password: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    avatar: '',
  });

  const [userId, setUserId] = useState(1);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://random-data-api.com/api/users/random_user?size=80`
      );
      const data = await response.json();
      setUserData(data[userId - 1]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const navigateToPreviousUser = () => {
    setUserId((prevUserId) => Math.max(1, prevUserId - 1));
  };

  const navigateToNextUser = () => {
    setUserId((prevUserId) => Math.min(80, prevUserId + 1));
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>ID</Text>
              <TextInput value={userData.id.toString()} style={styles.input} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>UID</Text>
              <TextInput value={userData.uid} style={styles.input} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={userData.password}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>First Name</Text>
              <TextInput value={userData.first_name} style={styles.input} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput value={userData.last_name} style={styles.input} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Username</Text>
              <TextInput value={userData.username} style={styles.input} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={userData.email}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.navigationButtons}>
        <Button title="Previous" onPress={navigateToPreviousUser} />
        <Button title="Next" onPress={navigateToNextUser} />
      </View>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textInputContainer: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 1,
    color: '#1aacf0',
  },
  input: {
    flex: 2,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 12,
    borderBottomColor: '#0570c9',
    borderBottomWidth: 2,
    backgroundColor: '#a0defb',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});
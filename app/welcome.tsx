// app/welcome.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/beer-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to BarFind</Text>
      <Text style={styles.subtitle}>
        Discover the most popular bars around you. See real-time user ratings, search by your favorite drinks, and swap beers with fellow enthusiasts.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={() => router.push('/auth/signup')}
        />
      </View>
      <TouchableOpacity
        onPress={() => router.push('/auth/signin')}
        style={styles.signInLink}
      >
        <Text style={styles.signInText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
  },
  signInLink: {
    padding: 10,
  },
  signInText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

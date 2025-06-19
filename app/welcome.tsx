import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// --- Function to cache images ---
function cacheImages(images: (string | number)[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function WelcomeScreen() {
  const router = useRouter();
  const [isSignInHovered, setSignInHovered] = useState(false);
  const [isSignUpHovered, setSignUpHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // --- THEME FROM SIGN-IN SCREEN APPLIED HERE ---
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    text: isDarkMode ? '#e1e1e1' : '#00334e',
    mutedText: isDarkMode ? '#a0a0a0' : '#546e7a',
    buttonBackground: '#00b0ff',
    buttonText: '#ffffff',
  };

  useEffect(() => {
    const loadAssets = async () => {
      const imageAssets = cacheImages([
        require('../assets/images/lightningboltblue.png'),
      ]);
      await Promise.all([...imageAssets]);
      setIsReady(true);
    };
    loadAssets();
  }, []);

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  if (!isReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.buttonBackground} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* --- Top Section (Logo & Text) --- */}
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/images/lightningboltblue.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.text }]}>Welcome to BuzzSpot</Text>
        <Text style={[styles.subtitle, { color: theme.mutedText }]}>
          Discover the hottest spots and best deals in town, live!
        </Text>
      </View>

      {/* --- Middle Section (Buttons) --- */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSignIn}
          onHoverIn={() => setSignInHovered(true)}
          onHoverOut={() => setSignInHovered(false)}
          onPressIn={() => setSignInHovered(true)}
          onPressOut={() => setSignInHovered(false)}
          style={[
            styles.button,
            {
              backgroundColor: theme.buttonBackground,
              borderColor: theme.buttonBackground,
              opacity: isSignInHovered ? 0.85 : 1, // Simple hover effect
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Sign In
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSignUp}
          onHoverIn={() => setSignUpHovered(true)}
          onHoverOut={() => setSignUpHovered(false)}
          onPressIn={() => setSignUpHovered(true)}
          onPressOut={() => setSignUpHovered(false)}
          style={[
            styles.button,
            {
              borderColor: theme.buttonBackground,
              backgroundColor: isSignUpHovered
                ? 'rgba(0, 176, 255, 0.1)'
                : 'transparent',
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.buttonBackground }]}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      {/* --- Bottom Section (Footer) --- */}
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: theme.mutedText }]}>
          Your guide to the city's buzz.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// --- StyleSheet remains the same ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: 40, // Increased spacing slightly
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 400, // Max width for larger screens
    alignSelf: 'center',
    paddingVertical: 16,
    borderRadius: 15, // Matched border radius
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
  },
});


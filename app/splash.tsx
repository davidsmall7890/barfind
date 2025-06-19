import { Asset } from 'expo-asset'; // Import the Asset module
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing, Image, StyleSheet } from 'react-native';

// --- NEW: Function to cache all our important images ---
function cacheImages(images: (string | number)[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function SplashScreen() {
  const router = useRouter();

  const popScale = useRef(new Animated.Value(2)).current;
  const popFade = useRef(new Animated.Value(0)).current;
  const secondaryFade = useRef(new Animated.Value(0)).current;
  const screenFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // --- NEW: We start loading all assets in the background ---
    const preloadAssets = async () => {
        const imageAssets = cacheImages([
            require('../assets/images/lightningbolt.png'),      // For Splash Screen
            require('../assets/images/lightningboltblue.png'),   // For Welcome Screen
            require('../assets/images/google.png'),              // For Sign-In Screen
            require('../assets/images/apple_dark.png'),          // For Sign-In Screen
        ]);
        await Promise.all(imageAssets);
    };

    preloadAssets(); // Fire off the preloading

    // The animation sequence runs at the same time
    Animated.sequence([
      Animated.parallel([
        Animated.timing(popFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(popScale, {
          toValue: 1,
          friction: 5,
          tension: 110,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(secondaryFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(screenFade, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
    ]).start(() => router.replace('/welcome'));
  }, [router, popFade, popScale, secondaryFade, screenFade]);

  return (
    <Animated.View style={[styles.container, { opacity: screenFade }]}>
      <Animated.View style={{ opacity: secondaryFade }}>
        <Animated.Image
          source={require('../assets/images/lightningbolt.png')}
          resizeMode="contain"
          style={[styles.bolt, { transform: [{ scale: popScale }] }]}
        />
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: popFade, transform: [{ scale: popScale }] }]}>
        BuzzSpot
      </Animated.Text>
      
      <Animated.Text style={[styles.subtitle, { opacity: secondaryFade }]}>
        Finding the vibe, live.
      </Animated.Text>
      
      <Animated.View style={{ opacity: secondaryFade }}>
        <ActivityIndicator size="small" color="#ffffff" style={styles.loader} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1FA3E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bolt: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 6,
  },
  loader: {
    marginTop: 20,
  },
});
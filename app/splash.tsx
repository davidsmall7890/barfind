import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet
} from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  const opacity = useRef(new Animated.Value(0)).current;
  const boltScale = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;
  const screenFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spinner rotation loop
    Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Entry + transition
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(boltScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(screenFade, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/welcome');
    });
  }, []);

  const rotateInterpolate = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenFade }]}>
      <Animated.Image
        source={require('../assets/images/lightningbolt.png')}
        style={[
          styles.bolt,
          {
            opacity,
            transform: [{ scale: boltScale }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
        BuzzSpot
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: textOpacity }]}>
        Finding the vibe, live.
      </Animated.Text>
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  loader: {
    position: 'absolute',
    bottom: 60,
    width: 42,
    height: 42,
    borderWidth: 4,
    borderColor: '#ffffff',
    borderTopColor: '#1FA3E8',
    borderRadius: 21,
  },
});
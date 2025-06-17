// app/_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="splash" screenOptions={{ headerShown: false }}>
        {/* 1) Splash */}
        <Stack.Screen name="splash" />
        {/* 2) Welcome */}
        <Stack.Screen name="welcome" />
        {/* 3) Auth */}
        <Stack.Screen name="auth/signin" />
        <Stack.Screen name="auth/signup" />
        {/* 4) Main Tabs Group */}
        <Stack.Screen name="(tabs)" />
        {/* 5) 404 */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
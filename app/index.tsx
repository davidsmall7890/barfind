// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Whenever "/" is opened, immediately send users to the splash screen
  return <Redirect href="/splash" />;
}
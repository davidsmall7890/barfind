import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAJSXbQ1B7noDMkQoIYi4QC1M8jVSFfFzY',
  authDomain: 'buzzspot-1357c.firebaseapp.com',
  projectId: 'buzzspot-1357c',
  storageBucket: 'buzzspot-1357c.appspot.com',   // ← typo fixed (.app**spot** vs .storage**spot**)
  messagingSenderId: '785545653359',
  appId: '1:785545653359:web:959ed2ed788884acd8319a',
  measurementId: 'G-69DWRW1HR1',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
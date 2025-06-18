// services/firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAJSXbQ1B7noDMkQoIYi4QC1M8jVSFfFzY',
  authDomain: 'buzzspot-1357c.firebaseapp.com',
  projectId: 'buzzspot-1357c',
  storageBucket: 'buzzspot-1357c.appspot.com',
  messagingSenderId: '785545653359',
  appId: '1:785545653359:web:959ed2ed788884acd8319a',
};

// Initialize Firebase app (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth and Firestore without native persistence for now
export const auth = getAuth(app);
export const firestore = getFirestore(app);

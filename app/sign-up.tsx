import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

/* ─── Firebase ───────────────────────────────────────────── */
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
// Update the path below to the correct relative path to your firebase config file
import { auth } from '../src/lib/firebase';
/* ────────────────────────────────────────────────────────── */

type IconProps = { color: string };
type FieldName = 'username' | 'email' | 'password' | 'confirmPassword';

const EyeIcon = ({ color }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const EyeOffIcon = ({ color }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <Line x1="1" y1="1" x2="23" y2="23" />
  </Svg>
);

export default function SignUpScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [invalidFields, setInvalidFields] = useState<FieldName[]>([]);

  const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    text: isDarkMode ? '#e1e1e1' : '#00334e',
    mutedText: isDarkMode ? '#a0a0a0' : '#546e7a',
    inputBackground: isDarkMode ? '#1e1e1e' : '#f0f2f5',
    inputBorder: isDarkMode ? '#2c2c2e' : '#e1e8ed',
    inputText: isDarkMode ? '#e1e1e1' : '#000000',
    buttonBackground: '#00b0ff',
    buttonText: '#ffffff',
    separator: isDarkMode ? '#2c2c2e' : '#e1e8ed',
    error: isDarkMode ? '#ff5c5c' : '#d93025',
  };

  /* ─── Sign-up handler (now async) ─────────────────────── */
  const handleSignUp = async () => {
    setInvalidFields([]);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errs: FieldName[] = [];

    if (!username) errs.push('username');
    if (!email || !emailRegex.test(email)) errs.push('email');
    if (!password || password.length < 6) errs.push('password');
    if (!confirmPassword) errs.push('confirmPassword');

    if (errs.length) {
      setInvalidFields(errs);
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    if (password !== confirmPassword) {
      setInvalidFields(['password', 'confirmPassword']);
      setErrorMessage('Passwords do not match.');
      setConfirmPassword('');
      return;
    }

    if (!isTermsAccepted) {
      setErrorMessage('You must accept the terms and conditions.');
      return;
    }

    setErrorMessage('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: username });
      router.replace('/(tabs)/map');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('Password must be at least 6 characters.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
      console.error(err);
    }
  };
  /* ─────────────────────────────────────────────────────── */

  const getBorderColor = (field: FieldName) =>
    invalidFields.includes(field) ? theme.error : theme.inputBorder;

  const handleFocus = (field: FieldName) => {
    setErrorMessage('');
    setInvalidFields(invalidFields.filter(f => f !== field));
  };

  const appleLogoStyle = [styles.socialLogo];
  if (isDarkMode) appleLogoStyle.push({ tintColor: '#ffffff' });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Image source={require('../assets/images/lightningboltblue.png')} style={styles.logo} />
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.mutedText }]}>Get started on your BuzzSpot journey.</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Username */}
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: getBorderColor('username'), color: theme.inputText }]}
              placeholder="Username"
              placeholderTextColor={theme.mutedText}
              value={username}
              onChangeText={setUsername}
              onFocus={() => handleFocus('username')}
              autoCapitalize="none"
            />

            {/* Email */}
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: getBorderColor('email'), color: theme.inputText }]}
              placeholder="Email"
              placeholderTextColor={theme.mutedText}
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password */}
            <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground, borderColor: getBorderColor('password') }]}>
              <TextInput
                style={[styles.inputPassword, { color: theme.inputText }]}
                placeholder="Create Password"
                placeholderTextColor={theme.mutedText}
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleFocus('password')}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                {isPasswordVisible ? <EyeOffIcon color={theme.mutedText} /> : <EyeIcon color={theme.mutedText} />}
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground, borderColor: getBorderColor('confirmPassword') }]}>
              <TextInput
                style={[styles.inputPassword, { color: theme.inputText }]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.mutedText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => handleFocus('confirmPassword')}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
                {isConfirmPasswordVisible ? <EyeOffIcon color={theme.mutedText} /> : <EyeIcon color={theme.mutedText} />}
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <TouchableOpacity onPress={() => setIsTermsAccepted(!isTermsAccepted)} style={styles.termsContainer}>
              <View style={[styles.checkbox, { backgroundColor: isTermsAccepted ? theme.buttonBackground : 'transparent', borderColor: isTermsAccepted ? theme.buttonBackground : theme.mutedText }]}>
                {isTermsAccepted && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.termsText, { color: theme.mutedText }]}>
                I agree to the <Text style={{ color: theme.buttonBackground, fontWeight: 'bold' }}>Terms and Conditions</Text>
              </Text>
            </TouchableOpacity>

            {/* Error */}
            {errorMessage ? <Text style={[styles.errorText, { color: theme.error }]}>{errorMessage}</Text> : null}

            {/* Submit */}
            <Pressable onPress={handleSignUp} style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={[styles.separatorLine, { backgroundColor: theme.separator }]} />
              <Text style={[styles.separatorText, { color: theme.mutedText }]}>or</Text>
              <View style={[styles.separatorLine, { backgroundColor: theme.separator }]} />
            </View>

            {/* Socials */}
            <View style={styles.socialsContainer}>
              <Pressable style={[styles.circularSocialButton, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                <Image source={require('../assets/images/google.png')} style={styles.socialLogo} />
              </Pressable>
              <Pressable style={[styles.circularSocialButton, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                <Image key={isDarkMode ? 'dark' : 'light'} source={require('../assets/images/apple_dark.png')} style={appleLogoStyle} />
              </Pressable>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.mutedText }]}>Already have an account? </Text>
              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text style={[styles.footerLink, { color: theme.buttonBackground }]}>Sign In</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─── Styles (unchanged) ───────────────────────────────── */


const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    headerContainer: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    formContainer: {
        width: '100%',
    },
    logo: { width: 50, height: 50, resizeMode: 'contain', marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 16, textAlign: 'center' },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1.5,
        marginBottom: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 15,
        borderWidth: 1.5,
        marginBottom: 12,
    },
    inputPassword: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 20,
        fontSize: 16,
    },
    eyeIcon: { padding: 10 },
    termsContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, alignSelf: 'flex-start' },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    termsText: { fontSize: 14 },
    errorText: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
    separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    separatorLine: { flex: 1, height: 1 },
    separatorText: { marginHorizontal: 10, fontSize: 14 },
    socialsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    circularSocialButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        borderWidth: 1,
    },
    socialLogo: { width: 25, height: 25, resizeMode: 'contain' },
    footer: { 
        paddingBottom: 20, 
        paddingTop: 15, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    footerText: { 
        fontSize: 14 
    },
    footerLink: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
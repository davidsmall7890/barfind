import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // --- THIS IS THE CORRECTED THEME ---
    // The color values from your SignUpScreen have been applied here.
    const theme = {
        background: isDarkMode ? '#121212' : '#ffffff',
        // cardBackground and cardBorder are no longer needed as the card will use the main background
        text: isDarkMode ? '#e1e1e1' : '#00334e',
        mutedText: isDarkMode ? '#a0a0a0' : '#546e7a',
        inputBackground: isDarkMode ? '#1e1e1e' : '#f0f2f5',
        inputBorder: isDarkMode ? '#2c2c2e' : '#e1e8ed',
        inputText: isDarkMode ? '#e1e1e1' : '#000000',
        buttonBackground: '#00b0ff',
        buttonText: '#ffffff',
        separator: isDarkMode ? '#2c2c2e' : '#e1e8ed',
    };

    const handleSignIn = () => console.log('Signing in with:', email, password);
    const handleGoogleSignIn = () => console.log('Signing in with Google');
    const handleAppleSignIn = () => console.log('Signing in with Apple');

    return (
        // The container uses the main background color from the new theme
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* The "card" is now just a content container without its own background color,
                which removes the rectangle box effect. */}
            <View style={styles.contentContainer}>
                <Image
                    source={require('../assets/images/lightningboltblue.png')}
                    style={styles.logo}
                />
                <Text style={[styles.title, { color: theme.text }]}>Sign In to BuzzSpot</Text>
                <Text style={[styles.subtitle, { color: theme.mutedText }]}>Access your account to find the best spots.</Text>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.mutedText }]}>Email</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.inputText }]}
                        placeholder="you@example.com"
                        placeholderTextColor={theme.mutedText}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.mutedText }]}>Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.inputText }]}
                        placeholder="••••••••"
                        placeholderTextColor={theme.mutedText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <Pressable onPress={handleSignIn} style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>Sign In</Text>
                </Pressable>

                <View style={styles.separatorContainer}>
                    <View style={[styles.separatorLine, { backgroundColor: theme.separator }]} />
                    <Text style={[styles.separatorText, { color: theme.mutedText }]}>or</Text>
                    <View style={[styles.separatorLine, { backgroundColor: theme.separator }]} />
                </View>

                <View style={styles.socialsContainer}>
                    <Pressable onPress={handleGoogleSignIn} style={[styles.circularSocialButton, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Image source={require('../assets/images/google.png')} style={styles.socialLogo} />
                    </Pressable>
                    <Pressable onPress={handleAppleSignIn} style={[styles.circularSocialButton, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
                        <Image
                            key={colorScheme}
                            source={require('../assets/images/apple_dark.png')}
                            style={[styles.socialLogo, isDarkMode && { tintColor: '#ffffff' }]}
                        />
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: theme.mutedText }]}>
                        Don't have an account?{' '}
                        <Link href="/sign-up" asChild>
                            <Text style={styles.link}>Sign Up</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}


// --- STYLESHEET UPDATED to remove card-specific styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 15, // Changed from 25 for consistency
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15, // Changed from 25 for consistency
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    separatorLine: {
        flex: 1,
        height: 1,
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 14,
    },
    socialsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    circularSocialButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        borderWidth: 1,
    },
    socialLogo: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
    },
    link: {
        color: '#00b0ff',
        fontWeight: 'bold',
    },
});
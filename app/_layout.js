import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [isReady, setIsReady] = useState(false);

    const loadFontsAsync = async () => {
        await Font.loadAsync({
            DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
            DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
            DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
        });
        setIsReady(true);
        await SplashScreen.hideAsync();
    };

    useEffect(() => {
        loadFontsAsync();
    }, []);

    if (!isReady) return null;

    return <Stack />;
}

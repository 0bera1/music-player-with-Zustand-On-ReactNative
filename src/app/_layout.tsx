import React, { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { SplashScreen } from 'expo-router';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/constants/tokens';


SplashScreen.preventAutoHideAsync();


const App = () => {

	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync();
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded
	})
	useLogTrackPlayerState();


	return (

		<SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
			<GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>

				<RootNavigation />

				<StatusBar backgroundColor={colors.background} style="auto" translucent />
			</GestureHandlerRootView>

		</SafeAreaProvider>
	)
};

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name='(tabs)'
				options={{ headerShown: false, }} />

			<Stack.Screen name="Player" options={{
				presentation: 'transparentModal', // ekran geçiş animasyonu
				headerShown: false, // header gösterme
				statusBarColor: 'transparent', // status bar rengi
				statusBarStyle: 'light', // status bar ikon rengi
				statusBarTranslucent: true, // status bar saydam mı
				

			}} />


			<Stack.Screen name='(modals)/addToPlaylist'
			options={{
				presentation: 'modal',
				headerStyle: { backgroundColor: colors.background },
				headerTitle: 'Add to Playlist',
				headerTitleStyle: { color: colors.text },
			}} />
		</Stack>
	)

}

export default App
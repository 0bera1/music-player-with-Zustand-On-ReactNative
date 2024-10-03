import { View, Text } from 'react-native'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { StatusBar } from 'expo-status-bar'

const PlaylistsScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        headerTitle: 'Playlists',
                        headerTitleAlign: 'left',
                        ...StackScreenWithSearchBar,
                    }} />

                <Stack.Screen
                    name='[name]'
                    options={{
                        headerTitle: '',
                        headerBackVisible: true,
                        headerStyle: {
                            backgroundColor: 'transparent',
                        },
                        headerTintColor: colors.primary,
                        headerLeft: () => (
                            <Text
                                style={{
                                    marginLeft: -8,
                                    fontSize: 14,
                                    color: colors.primary,
                                }}>
                                Go Playlists</Text>
                        ),
                        statusBarColor:'transparent',
                        statusBarStyle:'light',
                        statusBarTranslucent:true,
                        
                    }}
                />
            </Stack>
        </View>
    )
}

export default PlaylistsScreenLayout
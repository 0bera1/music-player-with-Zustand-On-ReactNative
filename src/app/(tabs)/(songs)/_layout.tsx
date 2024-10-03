import { View, Text } from 'react-native'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { StackScreenWithSearchBar } from '@/constants/layout'


const SongsScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        headerTitle: 'Musics',
                        headerTitleAlign: 'left',
                        ...StackScreenWithSearchBar,
                    }} />
                    
            </Stack>
        </View>
    )
}


export default SongsScreenLayout
import { View, Text } from 'react-native'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { StackScreenWithSearchBar } from '@/constants/layout'

const FavoritesScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen
                    name='index' 
                    options={{
                        headerTitle: 'Favorites',
                        headerTitleAlign: 'left',
                        ...StackScreenWithSearchBar,
                    }} />
                    
            </Stack>
        </View>
    )
}

export default FavoritesScreenLayout
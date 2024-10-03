import { StyleSheet,} from 'react-native'
import { Tabs } from 'expo-router'
import { colors, fontSizes } from '@/constants/tokens'
import {  } from '@/styles'
import { BlurView } from 'expo-blur'
import {  } from 'expo-router'
import { MaterialCommunityIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import FloatingPlayer from '@/components/FloatingPlayer'



const TabsNavigator = () => {
  return (
    <>
      <Tabs
        screenOptions={
          {
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: {
              fontSize: fontSizes.xs,
              fontWeight: '600',
              letterSpacing: 1,
            },
            headerShown: false,

            tabBarStyle: {
              position: 'absolute',
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              borderTopWidth: 0,
              paddingTop: 10,
              height: 65,
              paddingBottom: 8,
            },

            tabBarBackground: () => (
              <BlurView
                intensity={140}
                tint='dark'
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: 'hidden',
                  borderTopLeftRadius: 17,
                  borderTopRightRadius: 17,

                }} />
            )
          }
        }>
        <Tabs.Screen name='favorites' options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart" size={size} color={color} />

        }} />
        <Tabs.Screen name='playlists' options={{
          title: 'Playlists',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
        }} />
        <Tabs.Screen name='(songs)' options={{
          title: 'Musics',
          tabBarIcon: ({ color, size }) => <Ionicons name="musical-note-sharp" size={size} color={color} />
        }} />
        <Tabs.Screen name='artists' options={{
          title: 'Artists',
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="users-line" size={size} color={color} />
        }} />
      </Tabs>
      <FloatingPlayer
        style={{
          position: 'absolute',
          bottom: 65,
          left: 8,
          right: 8,
          borderRadius: 10,
        }} 
        />
    </>
  )
}

export default TabsNavigator
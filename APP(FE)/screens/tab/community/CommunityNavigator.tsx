import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import CommunityForumScreen from './CommunityForumScreen'
import CommunityHomeScreen from './CommunityHomeScreen'
import CommunityPostScreen from './CommunityPostScreen'

export type CommunityNavigationParamList = {
	CommunityHome: undefined
	CommunityForum: undefined
	CommunityPost: { postId: number }
}

const Stack = createStackNavigator<CommunityNavigationParamList>()

const CommunityNavigator: React.FC = () => {
	// 타입선언 필요
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="CommunityHome"
				component={CommunityHomeScreen}
				options={{ title: '커뮤니티' }}
			/>
			<Stack.Screen name="CommunityForum" component={CommunityForumScreen} />
			<Stack.Screen
				name="CommunityPost"
				component={CommunityPostScreen}
				options={{ title: '자유게시판' }}
			/>
		</Stack.Navigator>
	)
}

export default CommunityNavigator

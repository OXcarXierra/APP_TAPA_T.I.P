import { PostType } from '@app-types/community'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { samplePost } from '@constants/community'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/core'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getFullTime } from '@utils/time'
import { atom, useAtom } from 'jotai'
import { Text, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityPost'
>
type CommunityPostRouteProp = RouteProp<
	CommunityNavigationParamList,
	'CommunityPost'
>

const currentPostAtom = atom<PostType | null>(null)

const CommunityPostScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	const {
		params: { postId },
	} = useRoute<CommunityPostRouteProp>()
	const [currentPost, setCurrentPost] = useAtom(currentPostAtom)
	const post: PostType = samplePost

	return (
		<>
			<View
				style={css`
					flex: 1;
					padding: 20px 20px;
				`}
			>
				<Text
					style={css`
						font-family: ${FONT.Pretendard.BOLD};
						font-size: 20px;
					`}
				>
					{post.title}
				</Text>
				<Spacer y={6} />
				<Text>{getFullTime(post.created_at)}</Text>
				<Spacer y={20} />
				<Text
					style={css`
						font-family: ${FONT.Pretendard.REGULAR};
						font-size: 14px;
					`}
				>
					{post.content}
				</Text>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default CommunityPostScreen

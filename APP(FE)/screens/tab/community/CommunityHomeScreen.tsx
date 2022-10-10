import PostSummary from '@components/community/PostSummary'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import { COLOR } from '@constants/color'
import { samplePost } from '@constants/community'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { CommunityNavigationParamList } from './CommunityNavigator'

type NavigationProp = StackNavigationProp<
	CommunityNavigationParamList,
	'CommunityHome'
>

const CommunityHomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>()
	return (
		<>
			<View
				style={css`
					flex: 1;
					background-color: ${COLOR.GRAY.NORMAL(1)};
				`}
			>
				<View
					style={css`
						width: 100%;
						padding: 10px 0px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							padding: 0px 20px;
							font-size: 16px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						BEST
					</Text>
					<PostSummary size="large" post={samplePost} />
					<PostSummary size="large" post={samplePost} />
					<PostSummary size="large" post={samplePost} />
				</View>
				<Spacer y={4} />
				<View
					style={css`
						width: 100%;
						padding: 10px 0px;
						background-color: white;
					`}
				>
					<Text
						style={css`
							margin-bottom: 10px;
							padding: 0px 20px;
							font-size: 16px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						NEW
					</Text>
					<PostSummary size="small" post={samplePost} />
					<PostSummary size="small" post={samplePost} />
					<PostSummary size="small" post={samplePost} />
				</View>
				<Spacer y={4} />
				<Pressable onPress={() => navigation.navigate('CommunityForum')}>
					<View
						style={css`
							width: 100%;
							padding: 10px 20px;
							background-color: white;
						`}
					>
						<Text
							style={css`
								font-size: 16px;
								font-family: ${FONT.Pretendard.BOLD};
							`}
						>
							질문 게시판
						</Text>
						<Spacer y={5} />
						<Text>자신이 당한 일에 대해 자유롭게 질문하는 공간</Text>
					</View>
				</Pressable>
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default CommunityHomeScreen

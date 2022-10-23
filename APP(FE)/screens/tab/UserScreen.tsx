import { UserType } from '@app-types/user'
import AnimatedProgressBar from '@components/AnimatedProgressBar'
import DiaryList from '@components/DiaryList'
import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import Spinner from '@components/Spinner'
import TPButton from '@components/TPButton'
import { COLOR } from '@constants/color'
import { FONT } from '@constants/font'
import { css } from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import useAxios from '@hooks/axios'
import { useRootStackNavigation } from '@navigators/RootStack'
import { useFocusEffect } from '@react-navigation/native'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import firebase from '@utils/firebase'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import React, { useCallback } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

const UserScreen: React.FC = () => {
	const navigation = useRootStackNavigation()
	const firebaseUser = useAtomValue(userAtom)
	const axios = useAxios()

	const userQuery = useQuery<UserType>(
		['tapa', '/users/get/myself'],
		async () => {
			const res = await axios.get('/users/get/myself')
			return res.data
		},
		{
			enabled: !!firebaseUser,
		},
	)

	const userDetailQuery = useQuery(
		['tapa', '/users/get/myself/detail'],
		async () => {
			const res = await axios.get('/users/get/myself/detail')
			console.log(res.data)
			return res.data
		},
		{
			enabled: !!firebaseUser,
		},
	)

	const refetch = (force?: boolean) => {
		if (force || userQuery.data) userQuery.refetch()
	}

	useFocusEffect(
		useCallback(() => {
			refetch()
		}, []),
	)

	if (userQuery.isLoading) {
		return (
			<View
				style={css`
					flex: 1;
					justify-content: center;
					align-items: center;
				`}
			>
				<Spinner />
			</View>
		)
	}

	if (!userQuery.data) {
		return (
			<View
				style={css`
					flex: 1;
					justify-content: center;
					align-items: center;
				`}
			>
				<Text
					style={css`
						font-size: 32px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					😢 앗, 오류에요!
				</Text>
				<Text
					style={css`
						margin-top: 4px;
						font-size: 16px;
						color: ${COLOR.BLACK(1)};
					`}
				>
					데이터를 가져오지 못했어요
				</Text>
				<TPButton
					style={css`
						margin-top: 8px;
					`}
					size="small"
					onPress={() => refetch(true)}
				>
					다시 시도하기
				</TPButton>
			</View>
		)
	}

	const serviceProgress =
		DateTime.now()
			.diff(DateTime.fromMillis(userQuery.data.enlisted_at))
			.as('seconds') /
		DateTime.fromMillis(userQuery.data.discharged_at)
			.diff(DateTime.fromMillis(userQuery.data.enlisted_at))
			.as('seconds')

	const serviceDaysLeft = Math.round(
		DateTime.fromMillis(userQuery.data.discharged_at)
			.diff(DateTime.now())
			.as('days'),
	)

	return (
		<>
			<ScrollView
				style={css`
					flex: 1;
					padding: 20px;
				`}
			>
				<View
					style={css`
						padding: 20px;
						border-radius: 12px;
						background: ${COLOR.GRAY.NORMAL(1)};
					`}
				>
					<View
						style={css`
							flex-direction: row;
							justify-content: space-between;
						`}
					>
						<View>
							<Text
								style={css`
									color: ${COLOR.BLACK(1)};
								`}
							>
								{userQuery.data.affiliated_unit}
							</Text>
							<Text
								style={css`
									color: ${COLOR.BLACK(1)};
								`}
							>
								{userQuery.data.position}
							</Text>
							<Text
								style={css`
									font-size: 32px;
									font-family: ${FONT.Pretendard.BOLD};
									color: ${COLOR.BLACK(7)};
								`}
							>
								{userQuery.data.rank} {userQuery.data.name}
							</Text>
						</View>
						<View>
							<Ionicons
								name="settings"
								size={24}
								color={COLOR.GRAY.NORMAL(7)}
							/>
						</View>
					</View>
					{serviceProgress > 0 && (
						<View
							style={css`
								margin-top: 12px;
							`}
						>
							<AnimatedProgressBar value={serviceProgress} />
							<View
								style={css`
									margin-top: 4px;
									flex-direction: row;
									justify-content: space-between;
								`}
							>
								<Text
									style={css`
										color: ${COLOR.BRAND.MAIN};
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									{(serviceProgress * 100).toFixed(2)}%
								</Text>
								<Text
									style={css`
										color: ${COLOR.BLACK(1)};
										font-family: ${FONT.Pretendard.BOLD};
									`}
								>
									D-{serviceDaysLeft}
								</Text>
							</View>
						</View>
					)}
				</View>
				<Spacer y={12} />
				<Text
					style={css`
						font-size: 18px;
						font-family: ${FONT.Pretendard.BOLD};
					`}
				>
					📔 나의 기록 돌아보기
				</Text>
				<Spacer y={8} />
				<DiaryList limit={3} />
				<Spacer y={8} />
				<TPButton
					onPress={() => {
						navigation.push('Diary')
					}}
				>
					더 보기
				</TPButton>
				<Spacer y={24} />
				<TPButton
					onPress={() => {
						Alert.alert('로그아웃', '정말로 로그아웃 하시겠어요?', [
							{
								text: '네, 로그아웃 할게요',
								style: 'destructive',
								onPress: () => {
									firebase.auth.signOut()
								},
							},
							{
								text: '아니요!',
							},
						])
					}}
				>
					로그아웃
				</TPButton>
				<Spacer y={12} />
			</ScrollView>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default UserScreen

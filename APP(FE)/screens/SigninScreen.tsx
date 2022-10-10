import ControlledTPTextInput from '@components/controlled/TPTextInput'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { css } from '@emotion/native'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	RootStackScreenProps,
	useRootStackNavigation,
} from '@navigators/RootStack'
import firebase from '@utils/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth/react-native'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	View,
} from 'react-native'
import { z } from 'zod'

import { FONT } from '@/constants/font'

type Props = RootStackScreenProps<'SignIn'>

const formSchema = z.object({
	email: z.string().email('이메일 형식을 확인해주세요!'),
	password: z.string(),
})

type FieldValues = z.infer<typeof formSchema>

const SigninScreen: React.FC<Props> = props => {
	const navigation = useRootStackNavigation()

	const {
		control,
		handleSubmit,
		formState: { isValid },
		...form
	} = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		mode: 'all',
		reValidateMode: 'onChange',
	})

	const onSubmit = useCallback<SubmitHandler<FieldValues>>(
		async ({ email, password }) => {
			try {
				const credentials = await signInWithEmailAndPassword(
					firebase.auth,
					email,
					password,
				)
				await firebase.auth.updateCurrentUser(credentials.user)
				navigation.pop()
			} catch (error) {
				if (error instanceof FirebaseError) {
					Alert.alert('오류', error.message)
				}
			}
		},
		[],
	)

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={72}
			enabled
			style={css`
				flex: 1;
			`}
		>
			<ScrollView
				contentInset={{
					bottom: 24,
				}}
			>
				<View
					style={css`
						padding: 24px 16px;
					`}
				>
					<Text
						style={css`
							font-size: 32px;
							font-family: ${FONT.Pretendard.BOLD};
						`}
					>
						로그인
					</Text>
					<View
						style={css`
							padding: 24px 0;
						`}
					>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="email"
							control={control}
							keyboardType="email-address"
							label="이메일"
							placeholder="이메일을 입력해주세요"
							autoCapitalize="none"
						/>
						<Spacer y={16} />
						<ControlledTPTextInput
							name="password"
							control={control}
							keyboardType="ascii-capable"
							clearTextOnFocus={false}
							label="비밀번호"
							placeholder="비밀번호를 입력해주세요"
							secureTextEntry
						/>
					</View>
					<TPButton
						disabled={!isValid}
						size="large"
						onPress={handleSubmit(onSubmit)}
					>
						로그인
					</TPButton>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SigninScreen

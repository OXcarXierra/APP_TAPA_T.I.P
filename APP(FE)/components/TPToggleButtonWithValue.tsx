import { COLOR } from '@constants/color'
import { css } from '@emotion/native'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'

type Props = Omit<PressableProps, 'disabled' | 'children'> & {
	title: string
	iconName: string
	count: number
	active: boolean
}

const TPToggleButtonWithValue: React.FC<Props> = ({
	title,
	iconName,
	count,
	active,
	style,
	...passProps
}) => {
	const [isPressed, setIsPressed] = useState<boolean>(false)
	const buttonColor = (active: boolean, pressed: boolean) => {
		return active
			? pressed
				? COLOR.BRAND.SHADE(1)
				: COLOR.BRAND.MAIN
			: pressed
			? COLOR.BRAND.TINT(3)
			: COLOR.GRAY.NORMAL(1)
	}

	return (
		<Pressable
			{...passProps}
			onPressIn={() => {
				setIsPressed(true)
			}}
			onPressOut={() => setIsPressed(false)}
			style={({ pressed }) => [
				css`
					margin: 10px 0px;
					align-self: center;
					align-items: center;
					flex-direction: row;
					border-color: ${buttonColor(active, isPressed)};
					background-color: ${buttonColor(active, isPressed)};
					border-radius: 2px;
					border-width: 1px;
				`,
				typeof style === 'function' ? style({ pressed }) : style,
			]}
		>
			<View
				style={css`
					width: 24px;
					height: 24px;
					align-items: center;
					justify-content: center;
				`}
			>
				<FontAwesome5
					solid
					name={iconName}
					color={isPressed || active ? '#fff' : COLOR.GRAY.NORMAL(6)}
				/>
			</View>
			<View
				style={css`
					width: 28px;
					justify-content: center;
					text-align: center;
				`}
			>
				<Text
					style={css`
						font-size: 12px;
						color: ${isPressed || active ? '#fff' : COLOR.GRAY.NORMAL(6)};
					`}
				>
					{title}
				</Text>
			</View>
			<View
				style={css`
					width: 32px;
					height: 24px;
					text-align: center;
					align-items: center;
					justify-content: center;
					background-color: white;
				`}
			>
				<Text
					style={css`
						font-size: 12px;
						color: ${active || isPressed
							? buttonColor(active, isPressed)
							: COLOR.GRAY.NORMAL(6)};
					`}
				>
					{count}
				</Text>
			</View>
		</Pressable>
	)
}

export default TPToggleButtonWithValue

import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'

const messages = [
	'Hello, how are you?',
	'I am fine, thank you!',
	'What is your name?',
	'My name is John Doe.',
	'Hello, how are you?',
	'I am fine, thank you!',
	'What is your name?',
	'My name is John Doe.',
	'Hello, how are you?',
	'I am fine, thank you!',
	'What is your name?',
	'My name is John Doe.',
	'My name is John Doe.',
	'My name is John Doe.',
	'My name is John Doe.',
	'My name is John Doe.',
]

export default function HomeScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				behavior={'translate-with-padding'}
				style={{ flex: 1, paddingHorizontal: 12 }}
			>
				<FlashList
					maintainVisibleContentPosition={{
						autoscrollToBottomThreshold: 0.2,
						animateAutoScrollToBottom: true,
						startRenderingFromBottom: true,
					}}
					renderItem={({ item }) => (
						<ThemedView style={styles.messageContainer}>
							<ThemedText type='default'>{item}</ThemedText>
						</ThemedView>
					)}
					data={messages}
				/>
				<View>
					<TextInput placeholder='focus here' style={styles.input} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	messageContainer: {
		padding: 16,
		backgroundColor: 'white',
		flexDirection: 'row',
		flexShrink: 0,
		flexGrow: 0,
		width: '50%',
		borderRadius: 8,
		marginBottom: 8,
	},
	input: {
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8,
		marginBottom: 8,
	},
})

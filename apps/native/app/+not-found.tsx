import { Link, Stack } from "expo-router";
import { Text } from "react-native";

import { Container } from "@/components/container";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<Container>
				<Text className="font-bold text-xl">This screen doesn't exist.</Text>
				<Link href="/" className="mt-4 pt-4">
					<Text className="text-[#2e78b7] text-base">Go to home screen!</Text>
				</Link>
			</Container>
		</>
	);
}

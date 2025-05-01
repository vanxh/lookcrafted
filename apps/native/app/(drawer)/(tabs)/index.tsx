import { Container } from "@/components/container";
import { Text, View } from "react-native";

export default function TabOne() {
	return (
		<Container>
			<View className="flex-1 justify-center p-6">
				<Text className="mb-4 text-center font-bold text-2xl text-foreground">
					Tab One
				</Text>
				<Text className="text-center text-foreground">
					This is the first tab of the application.
				</Text>
			</View>
		</Container>
	);
}

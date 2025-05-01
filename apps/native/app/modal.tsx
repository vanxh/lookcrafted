import { Container } from "@/components/container";
import { Text, View } from "react-native";

export default function Modal() {
	return (
		<Container>
			<View className="flex-1 items-center justify-center">
				<Text className="font-bold text-foreground text-xl">Modal View</Text>
			</View>
		</Container>
	);
}

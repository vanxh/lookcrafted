import { SafeAreaView } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			{children}
		</SafeAreaView>
	);
};

import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/orpc";
import { useState } from "react";
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		setIsLoading(true);
		setError(null);

		await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onError: (error) => {
					setError(error.error?.message || "Failed to sign in");
					setIsLoading(false);
				},
				onSuccess: () => {
					setEmail("");
					setPassword("");
					queryClient.refetchQueries();
				},
				onFinished: () => {
					setIsLoading(false);
				},
			},
		);
	};

	return (
		<View className="mt-6 rounded-lg border border-border bg-card p-4">
			<Text className="mb-4 font-semibold text-foreground text-lg">
				Sign In
			</Text>

			{error && (
				<View className="mb-4 rounded-md bg-destructive/10 p-3">
					<Text className="text-destructive text-sm">{error}</Text>
				</View>
			)}

			<TextInput
				className="mb-3 rounded-md border border-input bg-input p-4 text-foreground"
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				placeholderTextColor="#9CA3AF"
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TextInput
				className="mb-4 rounded-md border border-input bg-input p-4 text-foreground"
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				placeholderTextColor="#9CA3AF"
				secureTextEntry
			/>

			<TouchableOpacity
				onPress={handleLogin}
				disabled={isLoading}
				className="flex-row items-center justify-center rounded-md bg-primary p-4"
			>
				{isLoading ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<Text className="font-medium text-primary-foreground">Sign In</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}

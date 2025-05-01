import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { orpc, queryClient } from "@/utils/orpc";

export default function Home() {
	const healthCheck = useQuery(orpc.healthCheck.queryOptions());
	const privateData = useQuery(orpc.privateData.queryOptions());
	const { data: session } = authClient.useSession();

	return (
		<Container>
			<ScrollView className="flex-1">
				<View className="px-4">
					<Text className="mb-4 font-bold font-mono text-3xl text-foreground">
						BETTER T STACK
					</Text>
					{session?.user ? (
						<View className="mb-6 rounded-lg border border-border bg-card p-4">
							<View className="mb-2 flex-row items-center justify-between">
								<Text className="text-base text-foreground">
									Welcome,{" "}
									<Text className="font-medium">{session.user.name}</Text>
								</Text>
							</View>
							<Text className="mb-4 text-muted-foreground text-sm">
								{session.user.email}
							</Text>

							<TouchableOpacity
								className="self-start rounded-md bg-destructive px-4 py-2"
								onPress={() => {
									authClient.signOut();
									queryClient.invalidateQueries();
								}}
							>
								<Text className="font-medium text-white">Sign Out</Text>
							</TouchableOpacity>
						</View>
					) : null}
					<View className="mb-6 rounded-lg border border-border p-4">
						<Text className="mb-3 font-medium text-foreground">API Status</Text>
						<View className="flex-row items-center gap-2">
							<View
								className={`h-3 w-3 rounded-full ${
									healthCheck.data ? "bg-green-500" : "bg-red-500"
								}`}
							/>
							<Text className="text-muted-foreground">
								{healthCheck.isLoading
									? "Checking..."
									: healthCheck.data
										? "Connected to API"
										: "API Disconnected"}
							</Text>
						</View>
					</View>
					<View className="mb-6 rounded-lg border border-border p-4">
						<Text className="mb-3 font-medium text-foreground">
							Private Data
						</Text>
						{privateData && (
							<View>
								<Text className="text-muted-foreground">
									{privateData.data?.message}
								</Text>
							</View>
						)}
					</View>
					{!session?.user && (
						<>
							<SignIn />
							<SignUp />
						</>
					)}
				</View>
			</ScrollView>
		</Container>
	);
}

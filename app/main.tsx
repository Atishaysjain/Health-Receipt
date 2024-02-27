import { Title } from "@/components/StyledText";
import { Stack, router } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
    return <View style={{ height: "100%" }}>
        <Stack.Screen options={{ title: "Home" }} />
        <Title>Health-Receipt</Title>
        <Button onPress={() => router.push("/login")}>Log In</Button>
    </View>
}
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/j7HAVRaN4AB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Text } from "@/components/Themed";
import { useState } from "react"
import { View } from "react-native"
import { Button, Card, TextInput } from "react-native-paper"
import { useAppDispatch, useAppSelector } from "./hooks";
import { setCreds } from "./creds";
import { router } from "expo-router";


export default function Login() {
    const [state, setState] = useState("");
    const creds = useAppSelector(state => state.creds.userId);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <Card.Title title="Sign in to your account">
            </Card.Title>
            <Card.Content>
                <View>
                    <Text>User ID</Text>
                    <TextInput id="userId" placeholder="john.doe" onChangeText={setState} />
                </View>

                <Button onPress={() => { dispatch(setCreds(state)); router.replace("/(tabs)/home") }}>
                    Sign in
                </Button>
            </Card.Content>
        </Card>
    )
}


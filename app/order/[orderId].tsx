import { OrderDisplay } from "@/components/OrderDisplay";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { medium, small, xl } from "@/constants/values";
import { api } from "@/convex/_generated/api";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, useColorScheme } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Divider } from "react-native-paper";

const getColor = (i: number) => {
    if (i > 66) {
        return "green"
    }
    if (i > 33) {
        return "yellow";
    }
    return "red";
}

export default function Page() {
    const colorscheme = useColorScheme();
    const params = useLocalSearchParams();
    const { orderId } = params;
    const date = useQuery(api.item.getPurchaseDate, { orderId: orderId.toString() });

    return <View style={{ padding: medium, height: "100%" }}>
        <Stack.Screen options={{
            title: "Order", headerRight: () => (
                <Link href="/order/about" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                                name="info"
                                size={25}
                                color={Colors[colorscheme ?? 'light'].text}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>)
        }} />
        <ScrollView>
            {date !== undefined ?
                <View>
                    <Text style={{ fontSize: xl }}>Order from {date !== undefined && new Date(date[0]._creationTime).toLocaleDateString()}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: medium }}><Text>Overall score: </Text>
                        <AnimatedCircularProgress
                            size={50}
                            width={3}
                            fill={date[0].score}
                            tintColor={getColor(date[0].score)}
                            backgroundColor="#3d5875">
                            {
                                (fill) => (
                                    <Text>
                                        {fill}
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress></View>
                    <Text>Here's the individual breakdown for your order!</Text>
                </View>
                :
                <Text style={{ fontSize: xl }}>Order details loading...</Text>
            }

            <Divider style={{ margin: small }} />
            <OrderDisplay orderId={orderId.toString()} />
        </ScrollView>
    </View>
}
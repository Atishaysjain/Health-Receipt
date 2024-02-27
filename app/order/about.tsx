import { Title } from "@/components/StyledText";
import { View } from "@/components/Themed";
import { medium, xl } from "@/constants/values";
import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-paper";
import * as Linking from "expo-linking";

export default function About() {
    return <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, height: "40%" }}>
            <Stack.Screen options={{ title: "About" }} />
            <Card style={{ margin: medium }}>
                <Card.Content>
                    <Text style={{ paddingBottom: medium, fontWeight: "bold" }}>Nutri-Score</Text>
                    <Text>The Nutri-Score is a 5-class ranking algorithm for how nutrient-full a
                        given food is. In general, A-class foods in this category are full of
                        important nutrients, while E-class foods have little to no nutritional
                        value. For further information, check out
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Nutri-Score")}> this link.</Text>
                    </Text>
                </Card.Content>
            </Card>

            <Card style={{ margin: medium }}>
                <Card.Content>
                    <Text style={{ paddingBottom: medium, fontWeight: "bold" }}>Eco-Score</Text>
                    <Text>The Eco-Score is a 5-class ranking algorithm for how eco-friendly a
                        given food is. In general, A-class foods in this category took little to no
                        additional energy to reach your plate, while E-class foods took exceptional
                        and expensive journeys to reach your plate. For further information, check out
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Eco-score")}> this link.</Text>
                    </Text>
                </Card.Content>
            </Card>

            <Card style={{ margin: medium }}>
                <Card.Content>
                    <Text style={{ paddingBottom: medium, fontWeight: "bold" }}>Processed Score</Text>
                    <Text>The Nova-Rating is a 5-class ranking algorithm for how processed a
                        given food is. In general, A-class foods in this category took little to no
                        preprocessing, while E-class foods took exceptional amounts of preprocessing
                        to reach your plate. For further information, check out
                        <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://ecuphysicians.ecu.edu/wp-content/pv-uploads/sites/78/2021/07/NOVA-Classification-Reference-Sheet.pdf")}> this link.</Text>
                    </Text>
                </Card.Content>
            </Card>
        </ScrollView>
    </View>
}
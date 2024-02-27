import { lxl, medium } from "@/constants/values";
import React, { PropsWithChildren } from "react";
import { Card, Text } from "react-native-paper";

interface StyledCardProps extends PropsWithChildren {
    title: string,
    type: "input" | "display"
    text?: string
}

export const StyledCard: React.FC<StyledCardProps> = props => {
    return <Card style={{ flexDirection: "row", height: "15%", width: "90%", padding: medium, alignItems: "center" }}>
        <Text style={{ width: "100%", display: "flex" }}>
            <Text style={{ fontSize: lxl }}>{props.title}</Text>
            <Text style={{ fontSize: lxl, textAlign: "right" }}>{props.text}</Text>
        </Text>
    </Card>
}
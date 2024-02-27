import { xl } from "@/constants/values";
import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface TitleProps extends PropsWithChildren {
  style?: object
}

export const Title: React.FC<TitleProps> = props => {
  return <View style={{ ...props.style, justifyContent: "center" }}>
    <Text style={{ fontSize: xl, textAlign: "center" }}>{props.children}</Text>
  </View>
}
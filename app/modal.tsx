
import { View } from '@/components/Themed';
import { Stack, router } from 'expo-router';
import { Button } from 'react-native-paper';
import { medium } from '@/constants/values';
import { Title } from '@/components/StyledText';
import { StyledCard } from '@/components/StyledCard';
import { useAppSelector } from './hooks';

export default function Settings() {
  const userId = useAppSelector(state => state.creds.userId);
  return (
    <View style={{ display: "flex", flex: 0, flexDirection: "column", height: "100%", padding: medium, alignItems: "center" }}>
      <Stack.Screen options={{ title: "Account" }} />
      <Title style={{ height: "30%" }}>Account Settings</Title>
      <StyledCard title='User ID:' text={userId} type='display' />
      <Button onPress={() => router.navigate("main")}>Log out</Button>
    </View>
  );
}

import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from 'react-native-paper';
import { medium } from '@/constants/values';
import { router } from 'expo-router';
import { Title } from '@/components/StyledText';
import { useAppSelector } from '../hooks';

interface HistoryItemProps {
  orderId: string,
  _creationTime: number
}
const HistoryItem: React.FC<HistoryItemProps> = props => {
  return <Card style={{ margin: medium }} onPress={() => router.push(`/order/${props.orderId}`)}>
    <Card.Content>
      <Text>Order from {new Date(props._creationTime).toLocaleDateString()}</Text>
    </Card.Content>
  </Card>
}

export default function HistoryScreen() {
  const userId = useAppSelector(state => state.creds.userId)
  const history = useQuery(api.item.getUserHistory, { userId: userId })
  console.log(history);
  return (
    <View style={{ padding: medium, height: "100%" }}>
      <Title style={{ height: "30%" }}>History</Title>
      {history?.map((val, idx) => <HistoryItem key={idx} {...val} />)}
      {history !== undefined && history.length === 0 && <Text style={{ textAlign: "center" }}>Nothing to see here yet!</Text>}
    </View>
  );
}
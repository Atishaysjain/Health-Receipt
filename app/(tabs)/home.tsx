import { Text, View } from '@/components/Themed';
import { large, lxl, medium, small, xl } from '@/constants/values';
import { Divider } from 'react-native-paper';
import { api } from '@/convex/_generated/api';
import { useAction, useQuery } from 'convex/react';
import { useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Home() {
  const userId = useAppSelector(state => state.creds.userId)
  const pastOrders = useQuery(api.item.getUserHistory, { userId: userId })
  const hasHistory = pastOrders !== undefined && pastOrders.length !== 0
  const pastFoodItems = useQuery(api.item.getMostRecentPurchase, { userId: userId })
  const generateRecipeAction = useAction(api.togetherai.getRecipe);
  const [recipes, setRecipes] = useState("");
  const generateRecipe = () => {
    if (pastFoodItems !== undefined)
      generateRecipeAction({ foodItems: pastFoodItems.map(val => val.name) }).then(setRecipes);
  }
  useEffect(
    () => {
      generateRecipe();
    }, [pastFoodItems, pastOrders]
  )

  return (
    <View style={{ flex: 0, alignItems: 'center', padding: xl, height: "100%" }}>
      <ScrollView style={{ height: "100%" }}>
        <Text style={{ fontSize: lxl }}>Welcome back, {userId}!</Text>
        <Text style={{ paddingBottom: xl }}>Glad to have you with us.</Text>
        {hasHistory ?
          <View>
            <Text style={{ lineHeight: lxl, paddingBottom: xl }}>Great job! You've already taken {pastOrders.length} steps towards living a healthier life! Check out
              the History section to view your previous orders, or check out the below recommendations for how you
              can improve your shopping habits!
            </Text>
            {recipes === "" && <View><Text>Loading delicious recipes based off of your past orders...</Text><ActivityIndicator animating={true} size={xl} /></View>}
            {recipes !== "" && <View><Text style={{ fontSize: lxl }}>Recipes</Text><Text>Based on your past order, we recommend the following recipe! {recipes}</Text></View>}
          </View>
          :
          <Text style={{ lineHeight: lxl }}>You haven't scanned any receipts yet. Scan a Trader Joe's receipt to get started!</Text>
        }
      </ScrollView>
    </View>
  );
};
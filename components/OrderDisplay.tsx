import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { View } from "./Themed"
import { ItemCard } from "./ItemCard"
import { useAppSelector } from "@/app/hooks"

interface OrderDisplayProps {
    orderId: string,
}

export const OrderDisplay: React.FC<OrderDisplayProps> = props => {
    const userId = useAppSelector(state => state.creds.userId);
    const orders = useQuery(api.item.get, { ...props, userId: userId });
    return <View style={{ flexDirection: "column", justifyContent: 'center', alignContent: "center" }}>
        {orders?.map((val, idx) => <ItemCard product_name={val.name} key={idx} />)}
    </View>
}
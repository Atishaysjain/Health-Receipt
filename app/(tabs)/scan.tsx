import React, { useState } from 'react';
import { Image, ScrollView, ScrollViewComponent } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Button } from 'react-native-paper';
import { Text, View } from '@/components/Themed';
import { medium } from '@/constants/values';
import { Title } from '@/components/StyledText';
import { api } from '@/convex/_generated/api';
import { useAction, useMutation } from 'convex/react';
import * as FileSystem from 'expo-file-system'
import { useAppSelector } from '../hooks';
import { router } from 'expo-router';

export default function ImagePickerExample() {
    const [imageUri, setImageUri] = useState<string>("");
    const [base64, setBase64] = useState<string>("");
    const userId = useAppSelector(state => state.creds.userId)
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const base64_ = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });

            setBase64(base64_);
            setImageUri(result.assets[0].uri);
        }
    };

    const takeImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const base64_ = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });

            setBase64(base64_);
            setImageUri(result.assets[0].uri);
        }
    };
    const processReceipt = useAction(api.togetherai.processReceipt);
    const getScore = useAction(api.togetherai.getScore);
    const postFoods = useMutation(api.item.postFoods);
    const postOrder = useMutation(api.item.postOrder);
    const handleClick = () => {

        // display loading state
        setLoading(true);

        // process receipt
        processReceipt({ base64Encoded: base64 }).then(
            resp => {
                setLoading(false);

                // post foods for the order
                postFoods({ userId: userId, foods: resp }).then(
                    uuid => {
                        // get score for the order
                        getScore({ foodItems: resp }).then(
                            // post order details
                            score => postOrder({ userId: userId, orderId: uuid, score: score }).then(() => router.replace(`/order/${uuid}`))
                        )

                    }
                )
            });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', height: "90%" }}>
            <Title style={{ height: "30%" }}>Scan</Title>

            <Card onPress={pickImage} style={{ width: "90%", margin: medium }} >
                <Card.Content >
                    <Text style={{ textAlign: "center" }}>Use existing image</Text>
                </Card.Content>
            </Card>
            <Card onPress={takeImage} style={{ width: "90%", margin: medium }}>
                <Card.Content>
                    <Text style={{ textAlign: "center" }}>Take new image</Text>
                </Card.Content>
            </Card>

            {imageUri !== "" && <Image source={{ uri: imageUri }} style={{ width: 300, height: 250, margin: medium }} />}
            {imageUri !== "" && <Button disabled={loading} loading={loading} buttonColor='purple' textColor='white' onPress={handleClick} style={{ margin: medium }}>Analyze Receipt</Button>}
        </View>
    );
}

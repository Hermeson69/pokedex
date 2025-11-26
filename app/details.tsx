import { useLocalSearchParams} from "expo-router";
import { useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

export default function Details() {
    const params = useLocalSearchParams();
    console.log(params);

    useEffect(()=>{},[]);
    async function fetchPokemonbyName(name: string) {
        /* try{} catch(){} */
    }
    return (
    <ScrollView>
        <Text>Details Screen</Text>
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
});

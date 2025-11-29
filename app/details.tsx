import PokemonCard from "@/src/components/pokemonCard";
import { Pokemon } from "@/src/types/pokemonTypes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { colorsByType } from "../src/types/types";

export default function Details() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);

  const [loading, setLoading] = useState(false);
  const spinValue = new Animated.Value(0);
  const [lastType, setLastType] = useState<string>("");

  useEffect(() => {
    fetchPokemonDetails();
  }, [params.pokemon]);

  useEffect(() => {
    if (pokemonDetail) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {pokemonDetail.name.charAt(0).toUpperCase() +
                pokemonDetail.name.slice(1)}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              #{String(pokemonDetail.id).padStart(3, "0")}
            </Text>
          </View>
        ),
      });
    }
  }, [pokemonDetail]);

  useEffect(() => {
    if (loading) {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  async function fetchPokemonDetails() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`
      );
      const details = await response.json();

      setPokemonDetail({
        id: details.id,
        name: details.name,
        base_experience: details.base_experience,
        height: details.height,
        is_default: details.is_default,
        order: details.order,
        weight: details.weight,
        abilities: details.abilities,
        forms: details.forms,
        game_indices: details.game_indices,
        held_items: details.held_items,
        location_area_encounters: details.location_area_encounters,
        moves: details.moves,
        image: details.sprites,
        types: details.types,
      });

      setLastType(details.types[0].type.name);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={styles.spinnerContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <View
            style={[
              styles.spinner,
              {
                borderTopColor: `${colorsByType[lastType]}`,
              },
            ]}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {pokemonDetail && (
        <PokemonCard
          style={styles.card}
          type={pokemonDetail.types[0].type.name}
        >
          <Image
            source={{ uri: pokemonDetail.image.front_default }}
            style={styles.image}
          />
        </PokemonCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 120,
  },
  card: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  image: { width: 300, height: 300, margin: 15 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  id: { fontSize: 16, color: "gray", marginTop: 5, fontWeight: "500" },
  info: { fontSize: 16, marginTop: 8 },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#ccc"
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

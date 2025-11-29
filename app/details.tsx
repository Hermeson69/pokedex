import PokemonCard from "@/src/components/pokemonCard";
import { Pokemon } from "@/src/types/pokemonTypes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState(false);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    fetchPokemonDetails();
  }, [params.pokemon]);

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
        `https://pokeapi.co/api/v2/pokemon/?${params.id}`
      );
      const data = await response.json();

      const infoCard = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            id: details.id,
            name: details.name,
            base_experience: details.base_experience,
            height: details.height,
            is_default: details.is_default,
            order: details.order,
            weight: details.weight,
            image: details.sprites,
            types: details.types,
          };
        })
      );

      setPokemonDetail(infoCard);
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
          <View style={styles.spinner} />
        </Animated.View>
      </View>
    );
  }

  const pokemon = pokemonDetail[0];
  return (
    <ScrollView style={styles.container}>
      <PokemonCard style={styles.card} type={pokemon?.types[0].type.name}>
        <Image
          source={{ uri: pokemon?.image.front_default }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
        </Text>
        <Text style={styles.id}>#{String(pokemon?.id).padStart(3, "0")}</Text>
        <Text style={styles.info}>Altura: {pokemon?.height / 10}m</Text>
        <Text style={styles.info}>Peso: {pokemon?.weight / 10}kg</Text>
        <Text style={styles.info}>
          Experiência Base: {pokemon?.base_experience}
        </Text>
      </PokemonCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
  },
  image: { width: 270, height: 270 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 5 },
  id: { fontSize: 16, color: "gray", marginTop: 5, fontWeight: "500" },
  info: { fontSize: 16, marginTop: 8 },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#ccc",
    borderTopColor: "#7ac74c",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

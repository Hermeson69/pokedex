import { Pokemon } from "@/src/types/pokemonTypes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

const colorsByType: Record<string, string> = {
  normal: "#ABA77A",
  fire: "#EE8130",
  water: "#6390f0",
  electric: "#f7d02c",
  grass: "#7ac74c",
  ice: "#96d9d6",
  poison: "#B33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  steel: "#B7B7CE",
  psychic: "#F85888",
  dark: "#705848",
  dragon: "#6F35FC",
  fairy: "#EC8FE6",
  fighting: "#C22E1C",
};

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [params.pokemon]);

  async function fetchPokemonDetails() {
    try {
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
    }
  }

  const pokemon = pokemonDetail[0];
  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.card,
          {
            // @ts-ignore
            backgroundColor:
              colorsByType[pokemon?.types[0].type.name] + 70,
          },
        ]}
      >
        <Image
          source={{ uri: pokemon?.image.front_default }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {pokemon?.name.charAt(0).toUpperCase() +
            pokemon?.name.slice(1)}
        </Text>
        <Text style={styles.id}>
          #{String(pokemon?.id).padStart(3, "0")}
        </Text>
        <Text style={styles.info}>Altura: {pokemon?.height / 10}m</Text>
        <Text style={styles.info}>Peso: {pokemon?.weight / 10}kg</Text>
        <Text style={styles.info}>
          Experiência Base: {pokemon?.base_experience}
        </Text>
      </View> 
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
  name: { fontSize: 24, fontWeight: "bold", marginTop: 5
   },
  id: { fontSize: 16, color: "gray", marginTop: 5, fontWeight: "500" },
  info: { fontSize: 16, marginTop: 8 },
});

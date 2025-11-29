import PokemonCard from "@/src/components/pokemonCard";
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
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetails();
  }, [params.pokemon]);

  async function fetchPokemonDetails() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`
      );
      const details = await response.json();

      const detailPokemon = {
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
      };

      setPokemonDetail(detailPokemon);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Text>Carregando...</Text>;
  if (!pokemonDetail) return <Text>Pokémon não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <PokemonCard style={styles.card} type={pokemonDetail.types[0].type.name}>
        <Image
          source={{ uri: pokemonDetail.image.front_default }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {pokemonDetail.name.charAt(0).toUpperCase() +
            pokemonDetail.name.slice(1)}
        </Text>
        <Text style={styles.id}>
          #{String(pokemonDetail.id).padStart(3, "0")}
        </Text>
        <Text style={styles.info}>Altura: {pokemonDetail.height / 10}m</Text>
        <Text style={styles.info}>Peso: {pokemonDetail.weight / 10}kg</Text>
        <Text style={styles.info}>
          Experiência Base: {pokemonDetail.base_experience}
        </Text>
      </PokemonCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  image: { width: 270, height: 270 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  id: { fontSize: 16, color: "gray", marginTop: 5, fontWeight: "500" },
  info: { fontSize: 16, marginTop: 8 },
});

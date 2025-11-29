import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pokemon } from "../src/types/pokemonTypes";
import PokemonCard from "@/src/components/pokemonCard";

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

export default function Index() {
  const [pokemons, setpokemons] = useState<Pokemon[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  useEffect(() => {
    fechPokemons();
  }, []);

  async function fechPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=50"
      );
      const data = await response.json();

      const datailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            id: details.id,
            name: pokemon.name,
            image: details.sprites,
            types: details.types,
          };
        })
      );

      setpokemons(datailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString().includes(search)
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Pokedéx</Text>
        <Text style={styles.subTitle}>
          Busque por qualquer Pokémon pelo nome ou usando seu número na Pokédex
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Pesquisar Pokémon..."
            onChangeText={setSearch}
            value={search}
            style={styles.searchInput}
          />

          <Pressable style={styles.button}>
            <MaterialCommunityIcons name="tune" size={24} color="#fff" />
          </Pressable>
        </View>
        <FlatList
          data={filteredPokemons}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: 10,
            gap: 10,
          }}
          columnWrapperStyle={{
            gap: 10,
          }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: "/details",
                  params: { pokemon: item.name.toLowerCase() },
                })
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                flex: 1,
              })}
            >
              <PokemonCard
                type={item.types[0].type.name}
                style={{
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Image
                  source={{ uri: item.image.front_default }}
                  style={{
                    width: 120,
                    height: 120,
                  }}
                />
                <Text style={styles.name}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <Text style={styles.id}>
                  {String(item.id).padStart(3, "0")}
                </Text>
              </PokemonCard>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 15,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "normal",
    padding: 13,
  },
  name: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: "bold",
  },
  id: {
    marginTop: 2,
    fontWeight: "medium",
    color: "gray",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    gap: 10,
  },
  searchInput: {
    padding: 10,
    backgroundColor: "#dddddd",
    margin: 10,
    borderRadius: 10,
    width: 280,
  },

  button: {
    backgroundColor: "#534d5e",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
});

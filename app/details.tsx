import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import PokemonCard from "@/src/components/pokemonCard";
import { colorsByType } from "../src/types/types";
import { usePokemon } from "@/src/hooks/usePokemon";

export default function Details() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { pokemon, loading } = usePokemon(params.pokemon as string);
  const tabs = ["Forms", "Details", "Moves", "Stats", "Weaknesses"];

  const [activeTab, setActiveTab] = useState("Forms");

  useEffect(() => {
    if (pokemon) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              #{String(pokemon.id).padStart(3, "0")}
            </Text>
          </View>
        ),
      });
    }
  }, [pokemon]);

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <View
          style={[
            styles.spinner,
            {
              borderTopColor:
                colorsByType[pokemon?.types?.[0]?.type.name || "normal"],
            },
          ]}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {pokemon && (
        <PokemonCard style={styles.card} type={pokemon.types[0].type.name}>
          <Image
            source={{ uri: pokemon.image.front_default }}
            style={styles.image}
          />
        </PokemonCard>
      )}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Text
            key={tab}
            style={[activeTab === tab && styles.tabItemActive]}
            onPress={() => setActiveTab(tab)}
          >
            {tab}
          </Text>
        ))}
      </View>

      {activeTab === "Forms" && pokemon && (
        <View style={styles.tabContainer}>
          <PokemonCard style={styles.card} type={pokemon.types[0].type.name}>
            <Image
              source={{ uri: pokemon.image.front_default }}
              style={{ width: 100, height: 100 }}
            />
            <Text>Normal Form</Text>
          </PokemonCard>

          <PokemonCard style={styles.card} type={pokemon.types[0].type.name}>
            <Image
              source={{ uri: pokemon.image.front_shiny }}
              style={{ width: 100, height: 100 }}
            />
            <Text>Shiny Form</Text>
          </PokemonCard>
        </View>
      )}

      {activeTab === "Details" && pokemon && (
        <View style={styles.tabContainer}>
          <Text>Height: {pokemon?.height / 10} m</Text>
          <Text>Weight: {pokemon?.weight / 10} kg</Text>
          <Text>Base Exp: {pokemon?.base_experience}</Text>
        </View>
      )}

      {activeTab === "Moves" && (
        <View style={styles.tabContainer}>
          <Text>Fazer depois</Text>
        </View>
      )}

      {activeTab === "Stats" && (
        <View style={styles.tabContainer}>
          <Text>Fazer depois</Text>
        </View>
      )}

      {activeTab === "Weakness" && (
        <View style={styles.tabContainer}>
          <Text>Fraquezas baseadas no tipo principal…</Text>
        </View>
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
    borderColor: "#ccc",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderRadius: 20,
    marginVertical: 15,
  },

  tabContainerv2: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderRadius: 20,
    marginVertical: 15,
  },

  tabItemActive: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

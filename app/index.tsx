import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [pokemons, setpokemons] = useState([]);
  useEffect(() => {
    fechPokemons();
  }, []);

  async function fechPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      );
      const data = await response.json();

      setpokemons(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Pokedex.</Text>
    </View>
  );
}

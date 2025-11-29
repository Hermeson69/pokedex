import { View, ViewStyle } from "react-native";
import { Pokemon } from "../types/pokemonTypes";

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

interface CardProps {
    type: keyof typeof colorsByType;
    style?: ViewStyle;
}

export default function PokemonCard({ type, style }: CardProps) {
    return (
        <View
            style={[
                style?.typeBadge,
                style,
                { backgroundColor: `${colorsByType[type]}70` },
            ]}
        />
    );
}

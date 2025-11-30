import { useEffect, useState, useRef } from "react";
import { Pokemon } from "../types/pokemonTypes";

export function usePokemon(name: string | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  async function fetchPokemon() {
    if (!name) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error("Pokémon não encontrado");

      const details = await response.json();

      if (!isMounted.current) return;

      setPokemon({
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
    } catch (e: any) {
      if (!isMounted.current) return;
      setError(e.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }

  useEffect(() => {
    isMounted.current = true;
    fetchPokemon();

    return () => {
      isMounted.current = false;
    };
  }, [name]);

  return { pokemon, loading, error };
}

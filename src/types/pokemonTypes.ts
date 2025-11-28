export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface PokemonType {
    type: NamedAPIResource;
    slot: number;
}

export interface PokemonForm {
    name: string;
    url: string;
}

export interface PokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

export interface PokemonAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: NamedAPIResource;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export interface VersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: VersionDetail[];
}

export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: PokemonForm[];
    game_indices: GameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    /* sprites: PokemonSprites[] */
    types: PokemonType[];
}

export interface PokemonDto {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  abilities: string[]
}

export interface PokemonEntity {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  order: number
  is_default: boolean
  location_area_encounters: string
  abilities: {
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }[]
  cries: {
    latest: string
    legacy: string
  }
  forms: {
    name: string
    url: string
  }[]
  game_indices: {
    game_index: number
    version: {
      name: string
      url: string
    }
  }[]
  held_items: {
    item: {
      name: string
      url: string
    }
    version_details: {
      rarity: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
  moves: {
    move: {
      name: string
      url: string
    }
    version_group_details: {
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order?: number | null
      version_group: {
        name: string
        url: string
      }
    }[]
  }[]
  past_abilities: {
    abilities: {
      ability: {
        name: string
        url: string
      }
      is_hidden: boolean
      slot: number
    }[]
    generation: {
      name: string
      url: string
    }
  }[]
  past_types: any[]
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
    other: {
      dream_world: {
        front_default: string | null
        front_female: string | null
      }
      home: {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
      'official-artwork': {
        front_default: string | null
        front_shiny: string | null
      }
      showdown: {
        back_default: string | null
        back_female: string | null
        back_shiny: string | null
        back_shiny_female: string | null
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
    }
    versions: []
  }

  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]

  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}

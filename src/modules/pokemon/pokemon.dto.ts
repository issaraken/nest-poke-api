export interface PokemonDto {
  id: number
  name: string
  height: number
  weight: number
  types: Array<{
    type: { name: string }
  }>
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  stats: Array<{
    base_stat: number
    stat: { name: string }
  }>
  abilities: Array<{
    ability: { name: string }
  }>
}

import { AppConfigService } from '@common/services/config.service'
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import axios from 'axios'
import { PokemonEntity, PokemonDto } from './pokemon.dto'

@Injectable()
export class PokemonService {
  constructor(private readonly config: AppConfigService) {}

  async getPokemonByName(name: string) {
    try {
      const pokemonName = name.toLowerCase().trim()

      if (!pokemonName) {
        throw new BadRequestException('Pokemon name is required')
      }

      const response = await axios.get<PokemonEntity>(
        `${this.config.pokeApiUrl}/pokemon/${pokemonName}`,
      )

      return this.transformPokemonToDto(response.data)
    } catch (error) {
      console.error('Pokemon API Error:')

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException(`Pokemon '${name}' not found`)
      }
      throw new BadRequestException('Failed to fetch Pokemon data')
    }
  }

  private transformPokemonToDto(data: PokemonEntity): PokemonDto {
    const typeLists = data.types.map((type) => type.type.name)
    const abilityLists = data.abilities.map((ability) => ability.ability.name)
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: typeLists,
      abilities: abilityLists,
    }
  }
}

import { AppConfigService } from '@common/services/config.service'
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import axios from 'axios'
import { PokemonDto } from './pokemon.dto'

@Injectable()
export class PokemonService {
  constructor(private readonly config: AppConfigService) {}

  async getPokemonByName(name: string) {
    return { name: name }

    try {
      const pokemonName = name.toLowerCase().trim()

      if (!pokemonName) {
        throw new BadRequestException('Pokemon name is required')
      }

      console.log(`Fetching Pokemon: ${pokemonName}`)

      const response = await axios.get<PokemonDto>(
        `${this.config.pokeApiUrl}/${pokemonName}`,
      )

      console.log(response)

      return {
        id: 1,
        name: 'Bulbasaur',
      }
    } catch (error) {
      console.error('Pokemon API Error:')

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException(`Pokemon '${name}' not found`)
      }
      throw new BadRequestException('Failed to fetch Pokemon data')
    }
  }
}

import { AppConfigService } from '@common/services/config.service'
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common'
import axios from 'axios'
import { PokemonEntity, PokemonDto } from './pokemon.dto'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@Injectable()
export class PokemonService {
  constructor(
    private readonly config: AppConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPokemonByName(name: string) {
    try {
      const pokemonName = name.toLowerCase().trim()
      if (!pokemonName) {
        throw new BadRequestException('Pokemon name is required')
      }

      const cacheKey = `pokemon:${pokemonName}`
      const cachedPokemon = await this.cacheManager.get<PokemonDto>(cacheKey)
      if (cachedPokemon) {
        console.info(`Cache hit for Pokemon: ${pokemonName}`)
        return cachedPokemon
      }

      const response = await axios.get<PokemonEntity>(
        `${this.config.pokeApiUrl}/pokemon/${pokemonName}`,
      )
      const dataset = this.transformPokemonToDto(response.data)
      await this.cacheManager.set(cacheKey, dataset, this.config.cacheTime)
      return dataset
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

  async getPokemonRandom(): Promise<PokemonDto> {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1
      const cacheKey = `pokemon:id:${randomId}`
      const cachedPokemon = await this.cacheManager.get<PokemonDto>(cacheKey)
      if (cachedPokemon) {
        console.info(`Cache hit for Pokemon ID: ${randomId}`)
        return cachedPokemon
      }

      const response = await axios.get<PokemonEntity>(
        `${this.config.pokeApiUrl}/pokemon/${randomId}`,
      )
      const dataset = this.transformPokemonToDto(response.data)
      await this.cacheManager.set(cacheKey, dataset, this.config.cacheTime)
      return dataset
    } catch (error) {
      console.error('Random Pokemon API Error:', error)

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // If Pokemon not found, try again with a different random ID
        return this.getPokemonRandom()
      }
      throw new BadRequestException('Failed to fetch random Pokemon data')
    }
  }
}

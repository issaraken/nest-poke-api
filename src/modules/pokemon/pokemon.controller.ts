import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard'
import { PokemonDto } from './pokemon.dto'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  getPokemonByName(@Param('name') name: string): Promise<PokemonDto> {
    return name === 'random'
      ? this.pokemonService.getPokemonRandom()
      : this.pokemonService.getPokemonByName(name)
  }

  @Get(':name/ability')
  async getPokemonAbilities(@Param('name') name: string) {
    const data = await this.pokemonService.getPokemonByName(name)
    return data.abilities
  }
}

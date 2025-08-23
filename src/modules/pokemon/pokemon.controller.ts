import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:name')
  getPokemonByName(@Param('name') name: string) {
    return this.pokemonService.getPokemonByName(name)
  }
}

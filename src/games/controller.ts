import { JsonController, Get, Post, HttpCode, Body, Param, Put, NotFoundError, BadRequestError} from 'routing-controllers'
import Game from './entity'
import { validate } from "class-validator";
import { getManager } from "typeorm";

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {
  @Get('/games')
  async allGames() {
    const games = await Game.find()
    return { games }
  }

  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body() game: Partial<Game>,
  ) {
    return Game.merge(new Game, game).save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
  ) {
    if (update.id) throw new BadRequestError('Cannot change id')
 
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    
    if (update.board) {
      const step = moves(update.board, game.board)
      if (step != 1) throw new BadRequestError('Invalid moves')
    } 

    const updatedGame = Game.merge(game, update)

    const errors = await validate(updatedGame)
    if (errors.length > 0) {
      throw new BadRequestError(`Validation failed!`)
    }

    return getManager().save(updatedGame)
  }
}
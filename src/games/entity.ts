import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsIn } from 'class-validator';

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']
const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false, default: colors[Math.floor((Math.random() * 100) % 4)] })
  @IsIn(colors)
  color: string

  @Column('json',{ nullable: false, default: defaultBoard })
  board: JSON
}
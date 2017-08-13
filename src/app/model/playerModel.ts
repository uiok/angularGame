import { Card } from './cardModel'
/**
 * 玩家資料物件
 */
export class Player {
  constructor(
    public name: String,
    public imageUrl: String,
    public cards: Card[],
    public score: number) {
  }
}

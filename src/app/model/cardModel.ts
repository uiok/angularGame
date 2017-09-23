/**
 *卡片資料
 */
export class Card {
  constructor(
    public name: number,
    public imageUrl: string,
    public cardNumber: number  ) {
      this.imageUrl += this.cardNumber
  }
}

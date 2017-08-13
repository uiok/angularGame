/**
 *卡片資料
 */
export class Card {
  constructor(
    public name: String,
    public imageUrl: String,
    public cardNumber: Number  ) {
      this.imageUrl += this.cardNumber.toString()
  }
}

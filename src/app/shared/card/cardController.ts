import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../model/cardModel';

@Component({
  selector: 'card',
  templateUrl: './cardComponent.html'

})

export class CardComponent {
  @Input() myCard: Card
  @Output() onCardSelected: EventEmitter<Card>;
  private currentCard: Card;
  constructor() {
    this.onCardSelected = new EventEmitter();
  }

  clicked(selectedCard: Card): void {
    this.currentCard =selectedCard;
    this.onCardSelected.emit(selectedCard);
  }
  isSelected(card: Card): String {
    if (this.currentCard) {
      if (this.currentCard.cardNumber != card.cardNumber) {
        return 'visible';
      } else {
        return 'hidden';
      }
    } else {
      return 'visible';
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'
@Component({
  selector: 'player',
  templateUrl: './playerComponent.html'

})

export class PlayerComponent {
  @Input() player: Player;
  @Output() onCardSelected: EventEmitter<Player>;
  private currentCard: Card;

  selectedProcess(chooseCard: Card): void {
    if (this.player.name == "1") {
      this.currentCard = chooseCard;
      let targetIndex = this.player.cards.map(function (item) { return item.cardNumber }).indexOf(chooseCard.cardNumber)
      this.player.cards.splice(targetIndex, 1)

    }

    console.log('Product clicked: ', chooseCard.name + chooseCard.cardNumber.toString());
  }
  isSelected(): String {
    if (this.currentCard) {

      this.player.cards.forEach(item => {
        if (item.cardNumber != this.currentCard.cardNumber) {
          return 'block';
        } else {
          return 'none';
        }
      })
      return 'block';
    } else {
      return 'block';
    }
  }
}



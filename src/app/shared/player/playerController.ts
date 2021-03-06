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
  @Output() onCardPush: EventEmitter<{ card: Card, player: Player }>;
  private currentCard: Card;
  private timer: any;

  constructor() {
    this.onCardPush = new EventEmitter();

  }



  selectedProcess(chooseCard: Card): void {
    //改由css控制不能選(此處羅基需修改)
    if (true) {
      this.currentCard = chooseCard;
      //若是最後一張就不用切
      if (this.player.cards.length > 0) {

        let targetIndex = this.player.cards.map(function (item) { return item.cardNumber }).indexOf(chooseCard.cardNumber)
        this.player.cards.splice(targetIndex, 1)
      }
      this.onCardPush.emit({ card: chooseCard, player: this.player });
    }

    console.log('Product clicked: ', chooseCard.name + chooseCard.cardNumber.toString());
  }

  timeOutProcess(): void {
    let tempNumber = Math.floor(Math.random() * (this.player.cards.length - 1));
    this.selectedProcess(this.player.cards[tempNumber]);
  }

  isSelected(): String {
    if (this.currentCard) {
      this.player.cards.forEach(item => {
        if (item.cardNumber != this.currentCard.cardNumber) {
          return 'block';
        } else {
          return 'none';
        }
      });
      return 'block';
    } else {
      return 'block';
    }
  }

}



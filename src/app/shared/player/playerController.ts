import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'
@Component({
  selector: 'player',
  templateUrl: './playerComponent.html'

})

export class PlayerComponent{
  @Input() player: Player;
  @Output() onCardSelected: EventEmitter<Player>;

  selectedProcess(chooseCard: Card): void {
    console.log('Product clicked: ', chooseCard.name + chooseCard.cardNumber.toString() );
  }
}



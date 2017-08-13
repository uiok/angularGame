import { Component, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'

@Component({
  selector: 'app-root',
  templateUrl: './homeComponent.html'
})

export class HomeComponent {
  @Input() playerList: Player[];
  _alerdyUsed: any[] = [];
  constructor() {
    this.playerList = [
      new Player(
        '1',
        ' ',
        this.RandomCard(),
        0
      ),
      new Player(
        '2',
        ' ',
        this.RandomCard(),
        0
      ),
      new Player(
        '3',
        ' ',
        this.RandomCard(),
        0
      ),
      new Player(
        '4',
        ' ',
        this.RandomCard(),
        0
      )
    ]
  }
  RandomCard(): Card[] {
    let cardList = [];
    let min = Math.ceil(1);
    let max = Math.floor(52);
    while (cardList.length < 5) {
      let tempNumber = Math.floor(Math.random() * (max - min)) + min
      if (this._alerdyUsed.find( a => a == tempNumber )) {
        continue;
      } else {
        this._alerdyUsed.push(tempNumber)
        cardList.push(new Card('花色', 'horizontal_cards card_',tempNumber))
      }
    }
    return cardList;
  }

}

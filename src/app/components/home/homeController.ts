import { Component, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'
import { PlayerComponent } from '../../shared/player/playerController'

@Component({
  selector: 'app-root',
  templateUrl: './homeComponent.html'
})

export class HomeComponent {
  @Input() playerList: Player[];
  @Output() onCardPush: EventEmitter<{ card: Card, player: Player }>;
  @ViewChildren(PlayerComponent) playerObj: QueryList<PlayerComponent>
  _alerdyUsed: any[] = [];
  isFlip: boolean;
  chooseCardList: any[];
  winner: any;
  constructor() {
    this.isFlip = false;
    this.chooseCardList = Array<any>();
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
  ngAfterViewInit() {
    setTimeout(this.timerStart.bind(this), 7000)
  }
  RandomCard(): Card[] {
    let cardList = [];
    let min = Math.ceil(1);
    let max = Math.floor(52);
    while (cardList.length < 5) {
      let tempNumber = Math.floor(Math.random() * (max - min)) + min
      if (this._alerdyUsed.find(a => a == tempNumber)) {
        continue;
      } else {
        this._alerdyUsed.push(tempNumber)
        cardList.push(new Card('花色', 'card_', tempNumber))
      }
    }
    return cardList;
  }
  CardPush(obj: { card: Card, player: Player }): void {
    // this.chooseCardList.push("card_" + obj.card.cardNumber);
    this.chooseCardList.push(obj);


    if (this.chooseCardList.length == 4) {
      this.winner = this.chooseCardList.reduce((a, b) => {
        return (a.card.cardNumber > b.card.cardNumber) ? a : b
      })
      //新增開獎效果,預計CSS處理特效
      setTimeout((() => {
        this.isFlip = true;
      }).bind(this), 3000);

    }
  }

  timerStart(): void {
    this.playerObj.forEach(item => {
      item.timeOutProcess()
    });
  }
  showWinner(): void {

  }

}

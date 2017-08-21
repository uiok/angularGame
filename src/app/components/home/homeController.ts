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
  cardList: number[];
  isFlip: boolean;
  isWinner: boolean;
  chooseCardList: any[];
  winner: any;
  round: number;
  constructor() {
    this.isFlip = false;
    this.isWinner = false;
    this.round = 5;
    this.chooseCardList = Array<any>();
    this.cardList = Array<number>(
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
    );
    let i = this.cardList.length;
    while (i) {
      let j = Math.floor(Math.random() * i)
      let k = this.cardList[--i];
      this.cardList[i] = this.cardList[j];
      this.cardList[j] = k;
    }
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
    let i = 0;
    let tempList = [];
    while (i < 5) {
      tempList.push(new Card('花色', 'card_', this.cardList[i]))
      i++;
    }
    this.cardList.splice(0, 5)

    return tempList;
  }
  CardPush(obj: { card: Card, player: Player }): void {
    // this.chooseCardList.push("card_" + obj.card.cardNumber);
    this.chooseCardList.push(obj);


    if (this.chooseCardList.length == 4) {
      this.winner = this.chooseCardList.reduce((a, b) => {
        return (a.card.cardNumber > b.card.cardNumber) ? a : b
      })
      //新增開獎效果,預計CSS處理特效
      //可以正常啟動
      //winner過場動畫顯示時間需調整
      this.timer(3000, (() => {
        this.isFlip = true;
        this.isWinner = true;
        this.timer(2000, this.timerStart.bind(this));
      }).bind(this));
    }

  }

  timerStart(): void {
    this.isFlip = false;
    this.isWinner = false;
    //功能可行,之後改成變數
    if (this.round-- > 0) {
      this.chooseCardList = Array<any>();
      this.playerObj.forEach(item => {
        item.timeOutProcess()
      });
    }

  }


  timer(sec: number, callBack: any): void {
    if (typeof (callBack) === 'function') {
      setTimeout(callBack, sec);
    }
  }
  //不能再啟動計數器
  lastRound(): void {

  }

}

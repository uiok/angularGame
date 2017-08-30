import { Component, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'
import { PlayerComponent } from '../../shared/player/playerController'

@Component({
  selector: 'app-root',
  templateUrl: './homeComponent.html'
})

export class HomeComponent implements AfterViewInit{
  @Input() playerList: Player[];
  @Output() onCardPush: EventEmitter<{ card: Card, player: Player }>;
  @ViewChildren(PlayerComponent) playerObj: QueryList<PlayerComponent>
  cardList: number[];
  isFlip: boolean;
  isWinner: boolean;
  chooseCardList: any[];
  round: number;
  coundDownSecond: number;
  countTimer: any;
  winnerImg:string;
  constructor() {
    this.isFlip = false;
    this.isWinner = false;
    this.round = 5;
    this.coundDownSecond = 7;
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
    this.timerStart();
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
    let winner:any;
    this.chooseCardList.push(obj);

    if (this.chooseCardList.length == 4) {
      winner = this.chooseCardList.reduce((a, b) => {
        return (a.card.cardNumber > b.card.cardNumber) ? a : b
      })

      this.winnerImg ="../assets/images/winner_" +winner.player.name+".svg";
  debugger;
      this.isFlip = true;
      this.isWinner = true;

        //新增開獎效果,預計CSS處理特效

    }

  }

  //倒數結束通知玩家出牌
  timeUP() {
    if (this.round-- > 0) {
      debugger;
      if (this.chooseCardList.length == 0) {
        this.playerObj.forEach(item => {
          item.timeOutProcess()
        });
      } else {
        let tempList = this.playerObj.filter(a => this.chooseCardList.find(b => a.player.name != b.player.name))
        tempList.forEach(item => {
          item.timeOutProcess()
        });
      }

    }
  }

  timerStart(): void {

    if (this.round > 0) {
      if (this.coundDownSecond == 0) {
        this.timeUP();

      } else {
        this.coundDownSecond--;
        this.countTimer = setTimeout(this.timerStart.bind(this), 1000);
      }

    }
  }


  //讓使用者按的新一局(重新啟動計數)
  newRound(even) {
 this.coundDownSecond = 7;
    this.isFlip = false;
    this.isWinner = false;
    this.chooseCardList = Array(0);

    this.timerStart();
  }







  timer(sec: number, callBack: any): void {
    if (typeof (callBack) === 'function') {
      setTimeout(callBack, sec);
    }
  }

}

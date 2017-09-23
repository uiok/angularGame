import { Component, EventEmitter, ViewChildren, QueryList, ElementRef, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { Player } from '../../model/playerModel'
import { Card } from '../../model/cardModel'
import { PlayerComponent } from '../../shared/player/playerController'

@Component({
  selector: 'app-root',
  templateUrl: './homeComponent.html'
})

export class HomeComponent implements AfterViewInit {
  @Input() playerList: Player[];
  @Output() onCardPush: EventEmitter<{ card: Card, player: Player }>;
  @ViewChildren(PlayerComponent) playerObj: QueryList<PlayerComponent>
  cardList: string[];
  isFlip: boolean;
  isWinner: boolean;
  chooseCardList: any[];
  round: number;
  coundDownSecond: number;
  countTimer: any;
  winnerImg: string;

  constructor(private ChangeDetector: ChangeDetectorRef) {
    this.isFlip = false;
    this.isWinner = false;
    this.round = 5;
    this.coundDownSecond = 8;
    this.chooseCardList = Array<any>();
    this.cardList = Array<string>(
      "400_1", "400_2", "400_3", "400_4", "400_5", "400_6", "400_7", "400_8", "400_9", "400_10", "400_11", "400_12", "400_13",
      "300_1", "300_2", "300_3", "300_4", "300_5", "300_6", "300_7", "300_8", "300_9", "300_10", "300_11", "300_12", "300_13",
      "200_1", "200_2", "200_3", "200_4", "200_5", "200_6", "200_7", "200_8", "200_9", "200_10", "200_11", "200_12", "200_13",
      "100_1", "100_2", "100_3", "100_4", "100_5", "100_6", "100_7", "100_8", "100_9", "100_10", "100_11", "100_12", "100_13"
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

      let tempObj = this.cardList[i].split('_');
 debugger;
      tempList.push(new Card(parseInt(tempObj[0]), "_" + tempObj[0] +"_", parseInt(tempObj[1])))
      i++;
    }
    this.cardList.splice(0, 5)

    return tempList;
  }
  CardPush(obj: { card: Card, player: Player }): void {
    let winner: any;
    this.chooseCardList.push(obj);

    if (this.chooseCardList.length == 4) {
      winner = this.chooseCardList.reduce((a, b) => {
        debugger;
        if (a.card.cardNumber == b.card.cardNumber) {
          if (a.card.name > b.card.name) {
            return a;
          } else {
            return b;
          }
        }
        if (a.card.cardNumber > b.card.cardNumber) {
          return a;
        } else {
          return b;
        }
      })

      this.winnerImg = "../assets/images/winner_" + winner.player.name + ".svg";

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
        this.ChangeDetector.detectChanges();
        this.countTimer = setTimeout(this.timerStart.bind(this), 1000);
      }

    }
  }


  //讓使用者按的新一局(重新啟動計數)
  newRound(even) {
    this.coundDownSecond = 8;
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

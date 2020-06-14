import { Injectable } from '@angular/core';
import { Card } from 'src/app/card/models/card';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Card[] = [];
  private firstCard: Card;
  private secondCard: Card;
  private matchedCardCount: number;

  private cardSubject$ = new BehaviorSubject<Card[]>([]);
  private isGameWonSubject$ = new BehaviorSubject<Boolean>(false);

  constructor() { 
    this.newGame();
  }

  /*Generate 16 cards*/
  private generateCards() {
    this.cards = [
      new Card('1'),
      new Card('2'),
      new Card('3'),
      new Card('4'),
      new Card('5'),
      new Card('6'),
      new Card('7'),
      new Card('8'),
      new Card('1'),
      new Card('2'),
      new Card('3'),
      new Card('4'),
      new Card('5'),
      new Card('6'),
      new Card('7'),
      new Card('8')
    ];
  }

  /*getCard Observerable*/
  getCards$():Observable<Card[]>{
    return this.cardSubject$.asObservable();
  }

  /*Shuffle cards*/
  private shuffleCards():void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  /*NewGame function*/
  newGame() {
    this.generateCards();
    this.shuffleCards();
    this.cardSubject$.next(this.cards);
  }

  /*Pick Card Logic*/
  pickCard() {
    /*If first card is not picked, pick a first card then*/

  }

}

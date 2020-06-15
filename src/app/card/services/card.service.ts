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
  private matchedCardCount = 0;

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

  getWonGame$():Observable<Boolean> {
    return this.isGameWonSubject$.asObservable();
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
  pickCard(pickedCard: Card) {
    const pickedCardDifferentThanFirstCard = pickedCard !== this.firstCard;
    if(pickedCard.hasMatch) {
      return;
    }

    /*If first card is not picked, pick a first card then*/
    if (!this.firstCard) {
      this.firstCard = pickedCard;
      this.firstCard.isFaceUp = true;
    }

    /* If there is no second card and make sure the first card is not picked again*/
    else if (!this.secondCard && pickedCardDifferentThanFirstCard) {
      this.secondCard = pickedCard;
      this.secondCard.isFaceUp = true;
      this.compareCards();
    }
  }

  /*Compare cards*/
  compareCards() {
    if (this.firstCard.symbolCard === this.secondCard.symbolCard) {
      this.firstCard.isFaceUp = true;
      this.firstCard.hasMatch = true;
      this.secondCard.isFaceUp = true;
      this.secondCard.hasMatch = true;
      this.matchedCardCount += 2;
      this.didWeWin();
      this.clearCards();

    } else {
      setTimeout(() => {
        this.firstCard.isFaceUp = false;
        this.firstCard.hasMatch = false;
        this.secondCard.isFaceUp = false;
        this.secondCard.isFaceUp = false;
        this.clearCards();
      } , 500)   
    }
  }

  /*Clear cards*/
  clearCards() {
    this.firstCard = null;
    this.secondCard = null;
  }

  didWeWin() {
    if (this.matchedCardCount === this.cards.length) {
      this.isGameWonSubject$.next(true);
    }
  }

}

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
  private isGameWonSubject$ = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.newGame();
  }

  private generateCards() {
    this.cards = [
      new Card('assets/images/airplane.png'),
      new Card('assets/images/camera.png'),
      new Card('assets/images/car.png'),
      new Card('assets/images/dog.png'),
      new Card('assets/images/glass.png'),
      new Card('assets/images/heart.png'),
      new Card('assets/images/leaf.png'),
      new Card('assets/images/music.png'),
      new Card('assets/images/airplane.png'),
      new Card('assets/images/camera.png'),
      new Card('assets/images/car.png'),
      new Card('assets/images/dog.png'),
      new Card('assets/images/glass.png'),
      new Card('assets/images/heart.png'),
      new Card('assets/images/leaf.png'),
      new Card('assets/images/music.png')
    ];
  }

  
  getCards$():Observable<Card[]>{
    return this.cardSubject$.asObservable();
  }

  getWonGame$():Observable<boolean> {
    return this.isGameWonSubject$.asObservable();
  }


  private shuffleCards():void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  newGame() {
    this.generateCards();
    this.shuffleCards();
    this.cardSubject$.next(this.cards);
    this.isGameWonSubject$.next(false);
    this.matchedCardCount = 0;
  }

  pickCard(pickedCard: Card) {
    const pickedCardDifferentThanFirstCard = pickedCard !== this.firstCard;
    if(pickedCard.hasMatch) {
      return;
    }

    if (!this.firstCard) {
      this.firstCard = pickedCard;
      this.firstCard.isFaceUp = true;
    }

    else if (!this.secondCard && pickedCardDifferentThanFirstCard) {
      this.secondCard = pickedCard;
      this.secondCard.isFaceUp = true;
      this.compareCards();
    }
  }

  compareCards() {
    if (this.firstCard.symbolCard === this.secondCard.symbolCard) {
      this.firstCard.isFaceUp = true;
      this.firstCard.hasMatch = true;
      this.secondCard.isFaceUp = true;
      this.secondCard.hasMatch = true;
      this.matchedCardCount += 2;
      this.clearCards();
      this.didWeWin();
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

  clearCards(): void {
    this.firstCard = null;
    this.secondCard = null;
  }

  didWeWin(): void {
    if (this.matchedCardCount === this.cards.length) {
      this.isGameWonSubject$.next(true);
    }
  }

}

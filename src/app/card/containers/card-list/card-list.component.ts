import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Observable } from 'rxjs';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards$: Observable<Card[]>;
  won$: Observable<boolean>

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cards$ = this.cardService.getCards$();
    this.won$ = this.cardService.getWonGame$();
  }

  pickCard(card: Card) {
    return this.cardService.pickCard(card)
  }

  playNewGame():void {
    return this.cardService.newGame();
  }

}

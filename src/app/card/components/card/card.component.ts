import { Component, Input, Output } from '@angular/core';
import { Card } from 'src/app/card/models/card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: Card;
  @Output() onClickCardEvent = new EventEmitter<Card>();

  handleClickedCard() {
    this.onClickCardEvent.emit(this.card);
  }
}

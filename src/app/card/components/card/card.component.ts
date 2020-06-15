import { Component, OnInit, Input, Output } from '@angular/core';
import { Card } from 'src/app/card/models/card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  /*@Output() for sending data to the parent*/
  @Output() onClickCardEvent = new EventEmitter<Card>();

  constructor() { }

  ngOnInit(): void {
  }

  /* method for raising an event */
  handleClickedCard() {
    this.onClickCardEvent.emit(this.card);
  }
}

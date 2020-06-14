import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './containers/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardListComponent, CardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardListComponent
  ]
})
export class CardModule { }

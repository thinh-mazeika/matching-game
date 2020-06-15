export class Card {
    symbolCard: string;
    isFaceUp = false;
    hasMatch = false;

    constructor(symbolCard: string) {
        this.symbolCard = symbolCard;
    }
}

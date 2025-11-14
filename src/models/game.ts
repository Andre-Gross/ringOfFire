import { signal } from "@angular/core";

export class Game {
    public players = signal<string[]>([]);
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public drawCardAnimation= signal<boolean>(false);
    public currentCard: string = '';


    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i)
        }

        shuffle(this.stack)
    }


    toJSON() {
        return {
            players: this.players(),
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            drawCardAnimation: this.drawCardAnimation(),
            currentCard: this.currentCard
        }
    }
}


function shuffle(array:any) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
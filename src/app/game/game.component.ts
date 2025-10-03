import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";

@Component({
    selector: 'app-game',
    imports: [CommonModule, PlayerComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    drawCardAnimation = false;
    currentCard: string | undefined = '';
    game: Game = new Game();


    ngOnInit(): void {
        this.newGame();
    }


    newGame() {
        this.game = new Game();
        console.log(this.game);
    }

    drawCard() {
        if (!this.drawCardAnimation) {
            this.currentCard = this.game.stack.pop();
            console.log(this.currentCard);
            this.drawCardAnimation = true;
            
            setTimeout(() => {
                this.drawCardAnimation = false;
            }, 1500)
        }

    }
}
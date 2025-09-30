import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    drawCardAnimation = false;
    game: Game = new Game();


    ngOnInit(): void {
        this.newGame();
    }


    newGame(){
        this.game = new Game();
        console.log(this.game);
    }

    drawCard() {
        this.drawCardAnimation = true;
    }

}
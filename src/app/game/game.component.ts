import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
    selector: 'app-game',
    imports: [CommonModule, 
        PlayerComponent, 
        MatButtonModule, 
        MatIconModule],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    drawCardAnimation = false;
    currentCard: string | undefined = '';
    game: Game = new Game();


    constructor(public dialog: MatDialog) {}


    ngOnInit(): void {
        this.newGame();
    }


    newGame() {
        this.game = new Game();
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

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);

        dialogRef.afterClosed().subscribe((result: string) => {
            console.log('The dialog was closed', result);
            if (result !== undefined && result !== '') {
                this.game.players.push(result);
            }
        });
    }
}
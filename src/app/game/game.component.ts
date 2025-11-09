import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";


@Component({
    selector: 'app-game',
    imports: [
        CommonModule,
        PlayerComponent,
        MatButtonModule,
        MatIconModule,
        GameInfoComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    drawCardAnimation: WritableSignal<boolean> = signal<boolean>(false);
    currentCard!: string;
    game: Game = new Game();


    constructor(public dialog: MatDialog) { }


    ngOnInit(): void {
        this.newGame();
    }


    newGame() {
        this.game = new Game();
    }


    drawCard() {
        if (!this.drawCardAnimation()) {
            this.currentCard = this.game.stack.pop()!;
            this.drawCardAnimation.set(true);

            this.game.currentPlayer++
            this.game.currentPlayer = this.game.currentPlayer % this.game.players().length
            setTimeout(() => {
                this.game.playedCards.push(this.currentCard)
                this.drawCardAnimation.set(false);
            }, 1500)
        }
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);

        dialogRef.afterClosed().subscribe((result: string) => {
            console.log('The dialog was closed', result);
            if (result !== undefined && result !== '') {
                this.game.players.update(players => [...players, result]);
            }
        });
    }
}
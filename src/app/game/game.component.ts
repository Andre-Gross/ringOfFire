import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute } from '@angular/router';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { doc, onSnapshot } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { GameService } from '../firebase-services/game.service';


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
    game!: Game;
    firestore: Firestore;

    unsubGame!: object;


    constructor(private gameService: GameService, private route: ActivatedRoute, public dialog: MatDialog) {
        this.firestore = this.gameService.firestore;
    }


    async ngOnInit(): Promise<void> {
        await this.newGame();
        this.route.params.subscribe((params) => {
            this.gameService.gameId = params['id'];

            if (params['id']) {
                this.unsubGame = onSnapshot(doc(this.firestore, 'games', params['id']), (game: any) => {
                    this.game.players.set(game.data().players);
                    this.game.stack = game.data().stack;
                    this.game.playedCards = game.data().playedCards;
                    this.game.currentPlayer = game.data().currentPlayer;
                    this.game.drawCardAnimation.set(game.data().drawCardAnimation);
                });
            } else {
                console.error("Failed to create game");
            }
        });
    }


    async newGame() {
        this.game = new Game();
    }


    drawCard() {
        if (!this.game.drawCardAnimation()) {
            this.game.currentCard = this.game.stack.pop()!;
            this.game.drawCardAnimation.set(true);

            this.gameService.saveGame(this.game);

            setTimeout(() => {

                this.game.currentPlayer++
                this.game.currentPlayer = this.game.currentPlayer % this.game.players().length

                this.game.playedCards.push(this.game.currentCard)
                this.game.drawCardAnimation.set(false);
                this.gameService.saveGame(this.game);
            }, 1500)
        }
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result !== undefined && result !== '') {
                this.game.players.update(players => [...players, result]);
                this.gameService.saveGame(this.game);
            }
        });
    }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute } from '@angular/router';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { collection, collectionData, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { GameService } from '../firebase-services/game.service.ts';


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
    game!: Game;
    firestore: Firestore;

    unsubGame!: object;


    constructor(private gameService: GameService,  private route: ActivatedRoute, public dialog: MatDialog) {
        this.firestore = this.gameService.firestore;
    }


    async ngOnInit(): Promise<void> {
        await this.newGame();
        this.route.params.subscribe((params) => {
            console.log("Game ID is ", params['id']);

            if (params['id']) {
                this.unsubGame = onSnapshot(doc(this.firestore, 'games', params['id']), (game: any) => {
                    console.log("Game update: ", game.data());
                    this.game.players.set(game.data().players);
                    this.game.stack = game.data().stack;
                    this.game.playedCards = game.data().playedCards;
                    this.game.currentPlayer = game.data().currentPlayer;
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
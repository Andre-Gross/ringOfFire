import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';


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

    games$: Observable<any[]>;


    firestore: Firestore = inject(Firestore);


    constructor(public dialog: MatDialog) {
        const gamesCol = collection(this.firestore, 'games');
        this.games$ = collectionData(gamesCol);
    }


    ngOnInit(): void {
        this.newGame();
        this.games$
            .subscribe((game) => {
                console.log("Game update", game);
            });
    }


    async newGame() {
        this.game = new Game();
        await this.addGame();
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


    async addGame() {
        await addDoc(this.getColRef('games'), this.game.toJSON()).catch(
            (err) => { console.error(err) }
        ).then(
            (docRef) => { console.log("Document written with ID: ", docRef?.id) }
        );
    }


    getColRef(colId: string) {
        return collection(this.firestore, colId)
    }
}
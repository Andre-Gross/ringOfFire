import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { collection } from '@angular/fire/firestore';
import { GameService } from '../firebase-services/game.service';
import { Game } from '../../models/game';

@Component({
    selector: 'app-start-screen.component',
    imports: [],
    templateUrl: './start-screen.component.html',
    styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
    game!: Game;

    constructor(private gameService: GameService, private router: Router) {
    };

    async newGame() {
        const game = new Game();
        const gameId = await this.gameService.addGame(game);
        this.router.navigateByUrl('/game/' + gameId);
    }

}

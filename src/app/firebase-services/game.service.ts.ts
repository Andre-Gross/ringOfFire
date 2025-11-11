import { Injectable,inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    
    firestore: Firestore = inject(Firestore);


    constructor() {}

    async addGame(game: Game = new Game): Promise<string | undefined> {
        return await addDoc(this.getColRef('games'), game.toJSON())
            .then((docRef) => docRef.id)
            .catch((err) => {
                console.error(err);
                return undefined;
            });
    }


    getColRef(colId: string) {
        return collection(this.firestore, colId)
    }

}

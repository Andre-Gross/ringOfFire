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


    async saveGame(game: Game) {
        if (!game) {
            console.error('Game ist nicht initialisiert!');
            return;
        }

        const docRef = this.getSingleDocRef('games', this.gameId)
        await updateDoc(docRef, game.toJSON()).catch(
            (err) => { console.error(err) })
            .then();
    };


    getColRef(colId: string) {
        return collection(this.firestore, colId)
    }


    getSingleDocRef(colId: string, docId: string) {
        return doc(collection(this.firestore, colId), docId);
    }

}

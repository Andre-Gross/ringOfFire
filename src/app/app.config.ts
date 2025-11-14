import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes), provideFirebaseApp(() => initializeApp({
            projectId: "ringoffire-98d45",
            appId: "1:687813522023:web:d50f735bbbacda2b8f9ac2",
            storageBucket: "ringoffire-98d45.firebasestorage.app",
            apiKey: "AIzaSyB0o2m-bfrXRXWdihpxeoentNUs-dgXOBE",
            authDomain: "ringoffire-98d45.firebaseapp.com",
            messagingSenderId: "687813522023",
        })),
        provideFirestore(() => getFirestore())
    ]
};

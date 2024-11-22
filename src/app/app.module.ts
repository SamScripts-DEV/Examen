import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importa AngularFirestoreModule
import { LibroPage } from './pages/libro/libro.page';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, LibroPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFirestoreModule, // Incluye AngularFirestoreModule en los imports
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Dog {
  imageUrl: string;
  status: string;
  title: string;
}

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})
export class LibroPage implements OnInit {

  dogs: { [key: string]: Dog } = {};

  constructor(private apiService: ApiService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    forkJoin({
      affenpinscher: this.apiService.getAffenpinscher(),
      african: this.apiService.getAfrican(),
      airedale: this.apiService.getAiredale(),
      akita: this.apiService.getAkita(),
      beagle: this.apiService.getBeagle(),
      bluetick: this.apiService.getBluetick(),
      borzoi: this.apiService.getBorzoi(),
      bouvier: this.apiService.getBouvier(),
      boxer: this.apiService.getBoxer(),
      brabancon: this.apiService.getBrabancon(),
      books: this.apiService.getRandomBooks()
    }).subscribe((results: any) => {
      console.log(results); // Verifica la estructura de los datos aquí

      // Asegúrate de que results.books.results sea un array
      if (Array.isArray(results.books.results)) {
        const bookTitles = results.books.results.map((book: any) => book.title);

        this.dogs = {
          affenpinscher: { imageUrl: results.affenpinscher.message, status: results.affenpinscher.status, title: bookTitles[0] },
          african: { imageUrl: results.african.message, status: results.african.status, title: bookTitles[1] },
          airedale: { imageUrl: results.airedale.message, status: results.airedale.status, title: bookTitles[2] },
          akita: { imageUrl: results.akita.message, status: results.akita.status, title: bookTitles[3] },
          beagle: { imageUrl: results.beagle.message, status: results.beagle.status, title: bookTitles[4] },
          bluetick: { imageUrl: results.bluetick.message, status: results.bluetick.status, title: bookTitles[5] },
          borzoi: { imageUrl: results.borzoi.message, status: results.borzoi.status, title: bookTitles[6] },
          bouvier: { imageUrl: results.bouvier.message, status: results.bouvier.status, title: bookTitles[7] },
          boxer: { imageUrl: results.boxer.message, status: results.boxer.status, title: bookTitles[8] },
          brabancon: { imageUrl: results.brabancon.message, status: results.brabancon.status, title: bookTitles[9] }
        };
      } else {
        console.error('Unexpected data format for books:', results.books);
      }
      console.log(this.dogs);
    }, error => {
      console.error('Error fetching data from API', error);
    });
  }

  saveAllToFirebase(): void {
    const booksCollection = this.firestore.collection('books');
    const batch = this.firestore.firestore.batch();

    Object.values(this.dogs).forEach(dog => {
      const docRef = booksCollection.doc().ref;
      batch.set(docRef, { title: dog.title, imageUrl: dog.imageUrl });
    });

    batch.commit()
      .then(() => {
        console.log('All books saved successfully!');
      })
      .catch(error => {
        console.error('Error saving books: ', error);
      });
  }
}

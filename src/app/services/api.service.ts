import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlDog1 = 'https://dog.ceo/api/breed/affenpinscher/images/random'
  private urlDog2 = 'https://dog.ceo/api/breed/african/images/random'
  private urlDog3 = 'https://dog.ceo/api/breed/airedale/images/random'
  private urlDog4 = 'https://dog.ceo/api/breed/akita/images/random'
  private urlDog5 = 'https://dog.ceo/api/breed/beagle/images/random'
  private urlDog6 = 'https://dog.ceo/api/breed/bluetick/images/random'
  private urlDog7 = 'https://dog.ceo/api/breed/borzoi/images/random'
  private urlDog8 = 'https://dog.ceo/api/breed/bouvier/images/random'
  private urlDog9 = 'https://dog.ceo/api/breed/boxer/images/random'
  private urlDog10 = 'https://dog.ceo/api/breed/brabancon/images/random'

  constructor(private http: HttpClient) { }

  getBeagle(): Observable<any> {
    return this.http.get(this.urlDog5);
  }

  getAffenpinscher(): Observable<any> {
    return this.http.get(this.urlDog1);
  }

  getAfrican(): Observable<any> {
    return this.http.get(this.urlDog2);
  }

  getAiredale(): Observable<any> {
    return this.http.get(this.urlDog3);
  }

  getAkita(): Observable<any> {
    return this.http.get(this.urlDog4);
  }

  getBluetick(): Observable<any> {
    return this.http.get(this.urlDog6);
  }

  getBorzoi(): Observable<any> {
    return this.http.get(this.urlDog7);
  }

  getBouvier(): Observable<any> {
    return this.http.get(this.urlDog8);
  }

  getBoxer(): Observable<any> {
    return this.http.get(this.urlDog9);
  }

  getBrabancon(): Observable<any> {
    return this.http.get(this.urlDog10);
  }



  private urlBooks = 'https://gutendex.com/books/?ids='
    getRandomBooks(): Observable<any> {
      const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1).join(',');
      return this.http.get(`${this.urlBooks}${randomIds}`);
    }
}

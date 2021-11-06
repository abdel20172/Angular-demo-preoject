import { Subject } from 'rxjs/Subject';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
  appareilSubject = new Subject<any[]>();
  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint',
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé',
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'allumé',
    },
  ];

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    return this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number): any {
    const appareil = this.appareils.find(
      (appreilObject) => appreilObject.id === id
    );
    return appareil;
  }

  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };

    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[this.appareils.length - 1].id++;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilToServer() {
    this.httpClient
      .put(
        'https://http-client-demo-ece2c-default-rtdb.europe-west1.firebasedatabase.app/appareils.json',
        this.appareils
      )
      .subscribe(
        (data) => {
          console.log('Enregistrement terminé !');
          console.log(data);
        },
        (err) => {
          console.error(err);
          console.log('Erreur de sauvegarde !');
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>(
        'https://http-client-demo-ece2c-default-rtdb.europe-west1.firebasedatabase.app/appareils.json'
      )
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (err) => {
          console.error('Erreur de chargement ! '+err);
        }
      );
  }
}

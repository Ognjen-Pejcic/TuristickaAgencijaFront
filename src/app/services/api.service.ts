import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { Loginuser } from '../loginuser';
import { Potvrda } from '../model/potvrda';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  izmeniPotvrdu(potvrda: Potvrda) : Observable<any> {
    return this.http.put<any>('https://localhost:44306/api/Potvrda/',potvrda);
  }

  pretraziPotvrde(usluga: string): Observable<any> {
    let params = new HttpHeaders();
    params.append('Content-Type', 'application/json');
    params.append('usluga', usluga);

    return this.http.get<any>(`https://localhost:44306/api/Potvrda/?potvrda=${usluga}`);
  }

  otvoriPotvrdu(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Potvrda/'+ id);
  }
  napraviPotvrdu(novaPotvrda: Potvrda): Observable<any>  {
    return this.http.post<any>('https://localhost:44306/api/Potvrda/', novaPotvrda);
  }
  vratiPoslednju() : Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Potvrda/poslednji');
  }
  vratiDestinacije() : Observable<any>{
    return this.http.get<any>('https://localhost:44306/api/Destinacija');
  }
  vratiSmestaje(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Smestaj');
  }
  public update(noviZahtev: ZahtevZaRezervisanjeHotela): Observable<any> {
    return this.http.put<any>('https://localhost:44306/api/zahtevZaRez/',noviZahtev);
  }
  obrisiZahtev(idZahteva: number) {
    return this.http.delete<any>('https://localhost:44306/api/zahtevZaRez/'+ idZahteva);
  }
  vratiZahtevID(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/ZahteviKorisnika/poslednji');
  }

  constructor(private http: HttpClient) {}

  public vratiZahteve(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/zahtevZaRez');
  }

  public vratiZahtev(id:number): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/zahtevZaRez/' + id);
  }

  
  public unesiZahtev(zahtev:ZahtevZaRezervisanjeHotela): Observable<any> {
    return this.http.post<any>('https://localhost:44306/api/zahtevZaRez/', zahtev);
  }

  public napraviZahtev(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/zahtevZaRez/create');
  }
  public vratiHotele(token:string): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Hotel/' );
  }

  public vratiKategorije(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Kategorija');
  }
  
  public vratiKorisnike(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Korisnik');
  }

  public vratiRadnik(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/Radnik');
  }

  public vratiTipSobe(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/TipSobe');
  }

  public vratiTipSmestaja(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/TipSmestaja');
  }

  public vratiZahteveKorsnika(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/ZahteviKorisnika');
  }

  public vratiPoslednji(): Observable<any> {
    return this.http.get<any>('https://localhost:44306/api/zahtevZaRez/poslednji');
  }

  public login(body:URLSearchParams): Observable<any> {
    return this.http.post<any>('https://localhost:5443/connect/token', body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
 
}

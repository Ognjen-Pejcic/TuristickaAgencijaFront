import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lista-zahteva',
  templateUrl: './lista-zahteva.component.html',
  styleUrls: ['./lista-zahteva.component.scss']
})
export class ListaZahtevaComponent implements OnInit {

  zahtevi: ZahtevZaRezervisanjeHotela[] = [];
  temp: ZahtevZaRezervisanjeHotela[] = [];
  searchword: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.service.vratiZahteve().subscribe((response) => {
      this.zahtevi = response;
    });
  }
  first:boolean = false;
  searchThis() {
    if(!this.first){
      this.temp = this.zahtevi;
      this.first = true;
    }else{
      this.zahtevi =  this.temp;
    }
   
   
      this.zahtevi.forEach(element => {
        console.log(element.Datum.toLocaleString().substring(0, 10), this.searchword)
        if (element.Datum.toLocaleString().substring(0, 10) != this.searchword.toLocaleString().substring(0, 10)) {
          this.zahtevi = this.zahtevi.filter(item => item !== element);
        }
      });
    this.searchword="";
    
  }

  prikaziZahtev(idZahteva: number) {
    console.log(idZahteva);
    this.router.navigate(([`/pregled/${idZahteva}`]))
  }

  izmeniZahtev(idZahteva: number) {
    console.log(idZahteva);
    this.router.navigate(([`/izmena/${idZahteva}`]))
  }

  obrisiZahtev(idZahteva: number) {
    console.log(idZahteva);
    this.service.obrisiZahtev(idZahteva).subscribe((response) => {

      this.service.vratiZahteve().subscribe((response) => {
        this.zahtevi = response;
      });
    },
      (error) => {

        console.log("neuspesno");
      }
    );
  }
}

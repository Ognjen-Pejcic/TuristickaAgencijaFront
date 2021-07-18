import { Component, OnInit } from '@angular/core';
import { Destinacija } from '../model/destinacija';
import { Potvrda } from '../model/potvrda';
import { Smestaj } from '../model/smestaj';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pregled-potvrda',
  templateUrl: './pregled-potvrda.component.html',
  styleUrls: ['./pregled-potvrda.component.scss']
})
export class PregledPotvrdaComponent implements OnInit {
  zahtev: ZahtevZaRezervisanjeHotela;
  potvrde: Potvrda[] = [];
  uslugaa: string = "";
  potvrda: Potvrda = {
    BrojPotvrde: 0, Usluga: "", Napomena: "",
    Smestaj: { NazivSmestaja: "", SmestajId: 0 },
    Destinacija: { DestinacijaId: 0, NazivDestinacije: "" },
    Zahtev: {
      BrNocenja: 0, BrSoba: 0, Datum: new Date(), SifraZahteva: 0, HotelId: 0, ZahtevKorisnikaID: 0, RadnikId: 0, Napomena: "",
      StavkaRezervacijeHotela: [],
      Hotel: { HotelId: 0, NazivHotela: "", BrojTekucegRacuna: "", BrojTelefona: "", },
      Radnik: { SifraRadnika: 0, ImeRadnika: "" },
      ZahtevKorisnika: { SifraZahteva: 0, VremeBoravka: 0, ZahtevZaRezervisanjeHotelaId: 0 }
    }
  }
  destinacije: Destinacija[] = []; destID: number;
  smestaji: Smestaj[] = [];
  brojPotvrde: number = 0; usluga: string = ""; napomena: string = "";
  smestaj: Smestaj = { NazivSmestaja: "", SmestajId: 0 };
  destinacija: Destinacija = { DestinacijaId: 0, NazivDestinacije: "" };
  sifraZahteva: number; datum: Date; napomenaZahtev: string = "";
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.vratiSmestaje().subscribe((response) => {
      this.smestaji = response;
      console.log(this.smestaji)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiDestinacije().subscribe((response) => {
      this.destinacije = response;
      console.log(this.destinacije)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
  pretrazi() {
    this.service.pretraziPotvrde(this.usluga).subscribe((response) => {
      this.potvrde = response;
      console.log(this.potvrda)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
  izmeniZahtev(brojPotvrde: number) {
    this.service.otvoriPotvrdu(brojPotvrde).subscribe((response) => {
      this.potvrda = response;
      this.sifraZahteva = this.potvrda.Zahtev.SifraZahteva;
      this.datum = this.potvrda.Zahtev.Datum;
      this.napomenaZahtev = this.potvrda.Zahtev.Napomena;
      this.brojPotvrde = this.potvrda.BrojPotvrde;
      this.uslugaa = this.potvrda.Usluga;
      this.napomena = this.potvrda.Napomena;

      this.destinacije.forEach(element => {
        if (element.DestinacijaId == this.potvrda.Destinacija.DestinacijaId) {
          this.destinacija = element;
        }
      });

      this.smestaji.forEach(element => {
        if (element.SmestajId == this.potvrda.Smestaj.SmestajId) {
          this.smestaj = element;
        }
      });
      console.log(this.potvrda)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
  Izmeni() {
    this.potvrda.Zahtev.SifraZahteva = this.sifraZahteva;
    this.potvrda.BrojPotvrde = this.brojPotvrde;
    this.potvrda.Usluga = this.uslugaa;
    this.potvrda.Napomena = this.napomena;
    this.potvrda.Smestaj.SmestajId = this.smestaj.SmestajId;
    this.potvrda.Destinacija.DestinacijaId = this.destinacija.DestinacijaId;

    this.service.izmeniPotvrdu(this.potvrda).subscribe((response) => {
      console.log("uspesna izmena");
      this.service.pretraziPotvrde(this.usluga).subscribe((response) => {
        this.potvrde = response;
        this.brojPotvrde = 0; this.uslugaa= ""; this.napomena = "";
        this.smestaj = {NazivSmestaja:"",SmestajId:0 };
        this.destinacija = {NazivDestinacije:"",DestinacijaId:0 };
        this.sifraZahteva=0; this.datum= new Date; this.napomenaZahtev= "";
        console.log(this.potvrda)
      },
        (error) => {
          console.log("neuspesno");
        }
      );
    }), (error) => {
      console.log("neuspesno");
    };
  }
  odustani() {
    console.log("s");
    location.reload();
  }

  onChangeDest($event) {

  }
  onChangeHotel($event) {

  }
  Pretrazi(id: number) {
    console.log(id)
    this.service.vratiZahtev(id).subscribe((response) => {
      this.zahtev = response;
      this.datum = this.zahtev.Datum;
      this.napomenaZahtev = this.zahtev.Napomena;
      console.log(this.destinacije)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Destinacija } from '../model/destinacija';
import { Potvrda } from '../model/potvrda';
import { Smestaj } from '../model/smestaj';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-unos-potvrde',
  templateUrl: './unos-potvrde.component.html',
  styleUrls: ['./unos-potvrde.component.scss']
})
export class UnosPotvrdeComponent implements OnInit {

  brojPotvrde: number = 0; usluga: string = ""; napomena: string = "";
  sifraZahteva: number; datum: Date; napomenaZahtev: string = "";
  destinacije: Destinacija[] = []; destID: number;
  smestaji: Smestaj[] = [];

  smestaj: Smestaj = { NazivSmestaja: "", SmestajId: 0 };
  destinacija: Destinacija = { DestinacijaId: 0, NazivDestinacije: "" };
  novaPotvrda: Potvrda = {
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
  };
  potvrda: Potvrda;
  zahtev: ZahtevZaRezervisanjeHotela
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
    this.service.vratiPoslednju().subscribe((response) => {
      this.potvrda = response;
      if (this.potvrda.BrojPotvrde == 0) {
        this.brojPotvrde = 1;
      } else {
        this.brojPotvrde = this.potvrda.BrojPotvrde + 1;
      }
      console.log(this.potvrda)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }

  unesi() {
    this.novaPotvrda.Usluga = this.usluga;
    this.novaPotvrda.Napomena = this.napomena;
    this.novaPotvrda.Zahtev.SifraZahteva = this.sifraZahteva;
    this.novaPotvrda.Smestaj.SmestajId = this.smestaj.SmestajId;
    this.novaPotvrda.Destinacija.DestinacijaId = this.destinacija.DestinacijaId;
    console.log(this.novaPotvrda);
    this.service.napraviPotvrdu(this.novaPotvrda).subscribe((response) => {
     
      console.log("uspesno")
    },
      (error) => {
        console.log("neuspesno");
      });
  }

  onChangeDest($event) {
    // this.korisnici.forEach(element => {
    //   console.log("elemnet sifra zahteva", element.JMBG, " this.sifra ", this.korisnikID)
    //   if (element.JMBG == this.korisnikID) {
    //     this.imePrezime = element.ImePrezime,
    //       this.datumRodjenja = element.DatumRodjenja,
    //       this.brojPasosa = element.BrPasosa,
    //       this.brojTelefona = element.BrTelefona
    //   }
    // });
  }
  onChangeHotel($event) {
    // console.log(this.hotel)


    // this.noviZahtev.Hotel.HotelId = this.hotelId;
    // this.noviZahtev.HotelId = this.hotelId;
    // console.log(this.noviZahtev)
  }

  odustani() {
    console.log("s");
    location.reload();
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

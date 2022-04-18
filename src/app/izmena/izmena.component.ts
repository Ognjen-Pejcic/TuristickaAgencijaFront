import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from '../model/hotel/hotel.model';
import { Kategorija } from '../model/kategorija/kategorija.model';
import { Korisnik } from '../model/korisnik/korisnik.model';
import { Radnik } from '../model/radnik/radnik.model';
import { StavkeRez } from '../model/stavkeRez/stavke-rez.model';
import { TipSmestaja } from '../model/TipSmestaja/tip-smestaja.model';
import { TipSobe } from '../model/tipSobe/tip-sobe.model';
import { ZahtevKorisnika } from '../model/zahtevKorsinika/zahtev-korisnika.model';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-izmena',
  templateUrl: './izmena.component.html',
  styleUrls: ['./izmena.component.scss']
})
export class IzmenaComponent implements OnInit {

  zahtev: ZahtevZaRezervisanjeHotela;
  public noviZahtev: ZahtevZaRezervisanjeHotela = {
    BrNocenja: 0, BrSoba: 0, Datum: new Date(), SifraZahteva: 0, HotelId: 0, ZahtevKorisnikaID: 0, RadnikId: 0,
    Napomena: "", StavkaRezervacijeHotela: [],
    Hotel: { HotelId: 0, NazivHotela: "", BrojTekucegRacuna: "", BrojTelefona: "", },
    Radnik: { SifraRadnika: 0, ImeRadnika: "" },
    ZahtevKorisnika: { SifraZahteva: 0, VremeBoravka: 0, ZahtevZaRezervisanjeHotelaId: 0 }
  };
  sifraZahteva: number = 0; datum: string; napomena: string; brojSoba: number; brojNocenja: number;
  vremeBoravka: number;
  idStavkeRezervacijeHotela: number;
  korisnikID: number; imePrezime: string; datumRodjenja: Date; brojTelefona: string; brojPasosa: string;
  tipSmestaja: number; tipSobe: number; kategorija: number;
  stavke: StavkeRez[] = [];
  hotelId: number; radnikId: number;

  hoteli: Hotel[] = [];
  kategorije: Kategorija[] = [];
  korisnici: Korisnik[] = [];
  korisnik: Korisnik;
  radnici: Radnik[] = [];
  tipoviSmestaja: TipSmestaja[];
  tipoviSoba: TipSobe[];
  zahteviKorisnia: ZahtevKorisnika[];
  zahtevKor: ZahtevKorisnika = { SifraZahteva: 0, VremeBoravka: 0, ZahtevZaRezervisanjeHotelaId: 0 }
  hotell: Hotel = { HotelId: 0, NazivHotela: "", BrojTekucegRacuna: "", BrojTelefona: "" };
  radnik: Radnik = { SifraRadnika: 0, ImeRadnika: "" };

  JMBG: number;
  zahtevKorisnika: number;
  sifraZahtevaKorisnika: number;
  zahtevKorisnikaId: number;
  korisnikk: string;

  stavka: StavkeRez = {
    StavkaRezervacijeHotelaId: 0, KategorijaId: 0, Kategorija: { KategorijaId: 0, NazivKategroije: "" },
    TipSmestajaId: 0, TipSmestaja: { TipSmestajaId: 0, NazivTipaSmestaja: "" },
    TipSobeId: 0, KorisnikId: 0, Korisnik: { JMBG: 0, ImePrezime: "", DatumRodjenja: new Date(), BrPasosa: "", BrTelefona: "" },
    ZahtevZaRezervisanjeHotelaId: 0, TipSobe: { TipSobeId: 0, NazivTipaSobe: "" }
  };
  hotel: number
  zahtevPoslao: number;
  private readonly notifier: NotifierService;

  hotelForm: FormGroup;

  hotelll:string;

  constructor(private service: ApiService, private router: Router, private toastr: ToastrService, notifierService: NotifierService, private route: ActivatedRoute, public datepipe: DatePipe) {
    this.notifier = notifierService;
  }

  token:string
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.vratiZahtev(Number(id)).subscribe((response) => {
      this.zahtev = response;
      console.log(this.zahtev)
      console.log(this.zahtev.SifraZahteva)
      this.sifraZahteva = this.zahtev.SifraZahteva;


      let latest_date = this.datepipe.transform(this.zahtev.Datum, 'yyyy-MM-dd');
      this.datum = latest_date || "";
      this.napomena = this.zahtev.Napomena;
      this.brojSoba = this.zahtev.BrSoba;
      this.brojNocenja = this.zahtev.BrNocenja;
      this.zahtevKorisnika = this.zahtev.ZahtevKorisnika.SifraZahteva;
      this.vremeBoravka = this.zahtev.ZahtevKorisnika.VremeBoravka;
      this.stavke = this.zahtev.StavkaRezervacijeHotela;
      this.stavke.forEach(element => {
        element.ZahtevZaRezervisanjeHotelaId = this.sifraZahteva;
      });
      this.hotelId = this.zahtev.HotelId;
      this.radnikId = this.zahtev.RadnikId;
      this.hotelll = this.zahtev.Hotel.NazivHotela;
    },
      (error) => {
        console.log("neuspesno");
      }
    );

    let body = new URLSearchParams();
    body.set('client_id', "m2m.client");
    body.set('grant_type', "client_credentials");
    body.set('password', "Pass123$");
    body.set('username', "angella");
    body.set('client_secret', "ClientSecret1");        

        this.service.login(body).subscribe((response) => {
          this.router.initialNavigation();
          console.log(response);
          this.token = response.access_token;
          console.log(this.token)

          this.service.vratiHotele(this.token).subscribe((response) => {
            this.hoteli = response;
            console.log(this.hoteli)
          },
            (error) => {
              console.log("neuspesno");
            }
          );
        })

        
       
   
    this.service.vratiRadnik().subscribe((response) => {
      this.radnici = response;
      console.log(this.radnici)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiZahteveKorsnika().subscribe((response) => {
      this.zahteviKorisnia = response;
      console.log(this.zahteviKorisnia)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiKorisnike().subscribe((response) => {
      this.korisnici = response;
      console.log(this.korisnici)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiTipSmestaja().subscribe((response) => {
      this.tipoviSmestaja = response;
      console.log(this.tipoviSmestaja)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiTipSobe().subscribe((response) => {
      this.tipoviSoba = response;
      console.log(this.tipoviSoba)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiKategorije().subscribe((response) => {
      this.kategorije = response;
      console.log(this.kategorije)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
    this.service.vratiZahtevID().subscribe((response) => {
      this.zahtevKor = response;
      console.log(this.zahtevKor)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
  showSuccess() {
    this.toastr.success('Uneto uspesno');
    // this.notifier.notify('success', 'You are awesome! I mean it!');
  }
  unesi() {
    console.log(this.noviZahtev);
    this.noviZahtev.SifraZahteva = this.sifraZahteva;
    this.noviZahtev.Datum = new Date(this.datum);
    this.noviZahtev.Napomena = this.napomena;
    this.noviZahtev.BrSoba = this.brojSoba;
    this.noviZahtev.BrNocenja = this.brojNocenja;
    this.noviZahtev.ZahtevKorisnikaID = this.sifraZahtevaKorisnika;
    this.noviZahtev.ZahtevKorisnika.SifraZahteva = this.sifraZahtevaKorisnika;
    this.noviZahtev.ZahtevKorisnika.VremeBoravka = this.vremeBoravka;
    this.noviZahtev.StavkaRezervacijeHotela = this.stavke;

    this.noviZahtev.RadnikId = this.zahtevPoslao;
    this.noviZahtev.HotelId = this.hotelId;
    console.log(this.noviZahtev);
    this.service.update(this.noviZahtev).subscribe((response) => {

    },
      (error) => {
        console.log("neuspesno");
      }
    );
  }
  onChangeHotel($event) {
    console.log(this.hotel)


    this.noviZahtev.Hotel.HotelId = this.hotelId;
    this.noviZahtev.HotelId = this.hotelId;
    console.log(this.noviZahtev)
  }
  onChangeRadnik($event) {
    console.log(this.radnik)
    //   this.radnik.SifraRadnika = this.radnikId;
    this.noviZahtev.Radnik.SifraRadnika = this.radnikId;
    this.noviZahtev.RadnikId = this.radnikId;
    console.log(this.noviZahtev)
  }

  onChangeZahtevKorisnika($event) {
    this.zahteviKorisnia.forEach(element => {
      console.log("elemnet sifra zahteva", element.SifraZahteva, " this.sifra ", this.zahtevKorisnika)
      if (element.SifraZahteva == this.zahtevKorisnika) {
        this.vremeBoravka = element.VremeBoravka;
      }
    });
    this.noviZahtev.ZahtevKorisnika.SifraZahteva = this.zahtevKorisnika;
    this.noviZahtev.ZahtevKorisnikaID = this.zahtevKorisnika;
  }
  onChangeKorisnik($event) {
    this.korisnici.forEach(element => {
      console.log("elemnet sifra zahteva", element.JMBG, " this.sifra ", this.korisnikID)
      if (element.JMBG == this.korisnikID) {
        this.imePrezime = element.ImePrezime,
          this.datumRodjenja = element.DatumRodjenja,
          this.brojPasosa = element.BrPasosa,
          this.brojTelefona = element.BrTelefona
      }
    });
  }
  dodajStavku() {
    let stavkaa: StavkeRez = {
      StavkaRezervacijeHotelaId: 0,
      KategorijaId: 0,
      Kategorija: {
        KategorijaId: 0,
        NazivKategroije: ""
      },
      TipSmestajaId: 0,
      TipSmestaja: {
        TipSmestajaId: 0,
        NazivTipaSmestaja: ""
      },
      TipSobeId: 0,
      KorisnikId: 0,
      Korisnik: {
        JMBG: 0,
        ImePrezime: "",
        DatumRodjenja: new Date(),
        BrPasosa: "",
        BrTelefona: ""
      },
      ZahtevZaRezervisanjeHotelaId: 0,
      TipSobe: {
        TipSobeId: 0,
        NazivTipaSobe: ""
      }
    }
    stavkaa.ZahtevZaRezervisanjeHotelaId = this.sifraZahteva;
    stavkaa.KategorijaId = this.kategorija;
    stavkaa.StavkaRezervacijeHotelaId = this.idStavkeRezervacijeHotela;
    stavkaa.KorisnikId = this.korisnikID;
    stavkaa.ZahtevZaRezervisanjeHotelaId = this.sifraZahteva;
    stavkaa.TipSmestajaId = this.tipSmestaja;
    stavkaa.TipSobeId = this.tipSobe;
    this.stavke.push(stavkaa);
    this.noviZahtev.StavkaRezervacijeHotela.push(stavkaa);
    console.log(this.stavke)
  }
  odustani() {
    console.log("s");
    location.reload();
  }

  onChangeKategorija($event) {
    console.log(this.kategorija);
  }
  onChangeTipSmestaja($event) {

  }
  obrisiStavku(idStavke: number) {
    console.log(idStavke);
    this.stavke = this.stavke.filter(item => item.StavkaRezervacijeHotelaId !== idStavke);
  }
}

import { Component, Host, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from '../model/hotel/hotel.model';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
import { ApiService } from '../services/api.service';
import { StavkeRez } from '../model/stavkeRez/stavke-rez.model';
import { Radnik } from '../model/radnik/radnik.model';
import { ZahtevKorisnika } from '../model/zahtevKorsinika/zahtev-korisnika.model';
import { Kategorija } from '../model/kategorija/kategorija.model';
import { Korisnik } from '../model/korisnik/korisnik.model';
import { TipSmestaja } from '../model/TipSmestaja/tip-smestaja.model';
import { TipSobe } from '../model/tipSobe/tip-sobe.model';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-unos',
  templateUrl: './unos.component.html',
  styleUrls: ['./unos.component.scss']
})
export class UnosComponent implements OnInit {

  zahtev: ZahtevZaRezervisanjeHotela;
  public noviZahtev: ZahtevZaRezervisanjeHotela
    = {
      BrNocenja: 0,
      BrSoba: 0,
      Datum: new Date(),
      SifraZahteva: 0,
      HotelId: 0,
      ZahtevKorisnikaID: 0,
      RadnikId: 0,
      Napomena: "",
      StavkaRezervacijeHotela: [],
      Hotel: {
        HotelId: 0,
        NazivHotela: "",
        BrojTekucegRacuna: "",
        BrojTelefona: "",

      },

      Radnik: {
        SifraRadnika: 0, ImeRadnika: ""
      },

      ZahtevKorisnika: { SifraZahteva: 0, VremeBoravka: 0, ZahtevZaRezervisanjeHotelaId: 0 }


    };
  hoteli: Hotel[] = [];
  kategorije: Kategorija[] = [];
  korisnici: Korisnik[] = [];
  korisnik: Korisnik;
  stavke: StavkeRez[] = [];
  radnici: Radnik[] = [];
  tipoviSmestaja: TipSmestaja[];
  tipoviSoba: TipSobe[];
  zahteviKorisnia: ZahtevKorisnika[];
  zahtevKor:ZahtevKorisnika={
    SifraZahteva:0,
    VremeBoravka:0,ZahtevZaRezervisanjeHotelaId:0
  }
  hotell: Hotel = {
    HotelId: 0,
    NazivHotela: "",
    BrojTekucegRacuna: "",
    BrojTelefona: "",
  };
  sifraZahteva: number = 0;
  datum: Date;
  brojSoba: number;
  brojNocenja: number;
  napomena: string;
  radnik: Radnik = {
    SifraRadnika: 0, ImeRadnika: ""
  };
  JMBG: number;
  zahtevKorisnika: number;
  sifraZahtevaKorisnika: number;
  vremeBoravka: number;
  zahtevKorisnikaId: number;
  idStavkeRezervacijeHotela: number;
  korisnikk: string;
  imePrezime: string;
  datumRodjenja: Date;
  brojPasosa: string;
  brojTelefona: string;
  tipSmestaja: number;
  tipSobe: number;
  kategorija: number;
  stavka: StavkeRez = {
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
  };
  hotelId: number;
  radnikId: number;
  hotel: string
  zahtevPoslao: string;
  korisnikID: number;
  private readonly notifier: NotifierService;
  showSuccess() {
    this.toastr.success('Uneto uspesno');
   // this.notifier.notify('success', 'You are awesome! I mean it!');
  }
  constructor(private service: ApiService, private router: Router, private toastr: ToastrService,notifierService: NotifierService) {
    this.notifier = notifierService;
    this.service.vratiPoslednji().subscribe((response) => {
      this.zahtev = response;
      console.log(this.zahtev)
      console.log(this.zahtev.SifraZahteva)
      this.sifraZahteva = this.zahtev.SifraZahteva + 1;
      this.zahtevKorisnika =this.sifraZahteva;
    },
      (error) => {
        console.log("neuspesno");
      }
    );

    this.service.vratiHotele().subscribe((response) => {
      this.hoteli = response;
      console.log(this.hoteli)
    },
      (error) => {
        console.log("neuspesno");
      }
    );
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

  ngOnInit(): void {

  }
  prikazi() {
    console.log("radi")
    console.log(this.sifraZahteva)


  }
  unesi() {

    this.noviZahtev.Datum = this.datum;
    this.noviZahtev.SifraZahteva = this.sifraZahteva;
    this.noviZahtev.Napomena = this.napomena;
    this.noviZahtev.BrNocenja = this.brojNocenja;
    this.noviZahtev.BrSoba = this.brojSoba;
    this.noviZahtev.ZahtevKorisnika.VremeBoravka = this.vremeBoravka;
   // this.noviZahtev.StavkaRezervacijeHotela = this.stavke;
    console.log(this.noviZahtev);

     this.service.unesiZahtev(this.noviZahtev).subscribe(async (response) => {
      this.a= response;
      console.log(this.a);
      this.toastr.success('Uneto uspesno');
     // this.router.navigate(([`/pregled/${this.noviZahtev.SifraZahteva}`]))

    },
      (error) => {
        this.toastr.success('Neuspesan unos');
        console.log("neuspesno");
      }
    );
  }

a:boolean=true;
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
  onChangeTipSmestaja($event) {

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
  odustani(){
    console.log("s");
    location.reload();
  }

  onChangeKategorija($event){
    console.log(this.kategorija);
  }
}

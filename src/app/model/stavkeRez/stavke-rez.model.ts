import { Kategorija } from "../kategorija/kategorija.model";
import { Korisnik } from "../korisnik/korisnik.model";
import { TipSmestaja } from "../TipSmestaja/tip-smestaja.model";
import { TipSobe } from "../tipSobe/tip-sobe.model";

export interface StavkeRez {
    StavkaRezervacijeHotelaId :number,
    KategorijaId :number,
    Kategorija:Kategorija
    TipSmestajaId:number,
    TipSmestaja:TipSmestaja,
    TipSobeId:number,
    TipSobe:TipSobe,
    KorisnikId:number,
    Korisnik:Korisnik,
    ZahtevZaRezervisanjeHotelaId:number,
    
}

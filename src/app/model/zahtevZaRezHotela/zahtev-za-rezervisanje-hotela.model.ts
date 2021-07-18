import { Hotel } from "../hotel/hotel.model";
import { StavkeRez } from "../stavkeRez/stavke-rez.model";
import { ZahtevKorisnika } from "../zahtevKorsinika/zahtev-korisnika.model";
import { Radnik } from "../radnik/radnik.model";
export interface ZahtevZaRezervisanjeHotela {
    SifraZahteva:number,
    Datum:Date,
    Napomena:string,
    BrSoba:number,
    BrNocenja:number,
    HotelId:number,
    Hotel:Hotel,
    RadnikId:number,
    Radnik:Radnik,
    StavkaRezervacijeHotela:StavkeRez[],
    ZahtevKorisnika:ZahtevKorisnika,
    ZahtevKorisnikaID:number
}

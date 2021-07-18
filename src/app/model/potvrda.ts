import { Destinacija } from "./destinacija";
import { Smestaj } from "./smestaj";
import { ZahtevZaRezervisanjeHotela } from "./zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model";

export interface Potvrda {
    BrojPotvrde: number
    Usluga: string
    Napomena: string
    Smestaj: Smestaj
    Destinacija: Destinacija
    Zahtev: ZahtevZaRezervisanjeHotela
}

import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ZahtevZaRezervisanjeHotela } from '../model/zahtevZaRezHotela/zahtev-za-rezervisanje-hotela.model';
@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.scss']
})
export class PregledComponent implements OnInit {
  zahtev:ZahtevZaRezervisanjeHotela

  constructor(private apiservice:ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    console.log(Number(id));
    this.apiservice.vratiZahtev(Number(id)).subscribe((response) => {
            this.zahtev = response;
          },
          (error) => {
            console.log("neuspesno");
          }
        );
  }
}

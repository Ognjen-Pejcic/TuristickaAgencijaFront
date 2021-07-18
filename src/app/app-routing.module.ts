import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzmenaComponent } from './izmena/izmena.component';
import { ListaZahtevaComponent } from './lista-zahteva/lista-zahteva.component';
import { PregledPotvrdaComponent } from './pregled-potvrda/pregled-potvrda.component';
import { PregledComponent } from './pregled/pregled.component';
import { UnosPotvrdeComponent } from './unos-potvrde/unos-potvrde.component';
import { UnosComponent } from './unos/unos.component';

const routes: Routes = [
  { path: '', redirectTo: '/unos', pathMatch: 'full' },
  { path: 'pregled', component: PregledComponent },
  { path: 'potvrde', component: PregledPotvrdaComponent },
  { path: 'unos', component: UnosComponent },
  {path:'listaZahteva', component:ListaZahtevaComponent},
  {path:'unosPotvrde', component:UnosPotvrdeComponent},
  {path:'izmena/:id', component:IzmenaComponent},
  {
    path: 'pregled/:id',
    component: PregledComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

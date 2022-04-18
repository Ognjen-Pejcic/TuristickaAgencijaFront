import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PregledComponent } from './pregled/pregled.component';
import { UnosComponent } from './unos/unos.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListaZahtevaComponent } from './lista-zahteva/lista-zahteva.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import { IzmenaComponent } from './izmena/izmena.component';
import { DatePipe } from '@angular/common';
import { UnosPotvrdeComponent } from './unos-potvrde/unos-potvrde.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PregledPotvrdaComponent } from './pregled-potvrda/pregled-potvrda.component';
import { LoginComponent } from './login/login.component';
import { AuthModule, LogLevel, OidcSecurityService } from 'angular-auth-oidc-client';
import { TokenInterceptorService } from "./interceptor/token-interceptor.service"

@NgModule({
  declarations: [
    AppComponent,
    PregledComponent,
    UnosComponent,
    ListaZahtevaComponent,
    IzmenaComponent,
    UnosPotvrdeComponent,
    PregledPotvrdaComponent,
    LoginComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut:10000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }
    ),
    NotifierModule,
    NgbModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5443',
        redirectUrl: 'https://localhost:5443/signin-oidc',
        postLogoutRedirectUri: 'https://localhost:5443/signout-callback-oidc',
        clientId: 'm2m.client',
        scope: 'TuristickaAgencija.read',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }], 
  
  bootstrap: [AppComponent]
})
export class AppModule { }

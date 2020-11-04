// CORE
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

// CONFIG
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

// APP
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SecHelper } from 'src/helpers/security.helper';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SettingsComponent } from './settings/settings.component';
import { EqualizationComponent } from './equalization/equalization.component';
import { SubrogationComponent } from './subrogation/subrogation.component';
import { IncrementalSimpleListComponent } from './incremental-simple-list/incremental-simple-list.component';
import { EqualizationSummaryComponent } from './equalization-summary/equalization-summary.component';
import { GridDialogComponent } from './grid-dialog/grid-dialog.component';
import { getPtPaginatorIntl } from 'src/infrastructure/pt-paginator-intl';
import { AccessHistoryDialogComponent } from './access-history-dialog/access-history-dialog.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SettingsComponent,
    EqualizationComponent,
    SubrogationComponent,
    IncrementalSimpleListComponent,
    EqualizationSummaryComponent,
    GridDialogComponent,
    AccessHistoryDialogComponent
  ],
  imports: [
    // CORE
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // MATERIAL
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [
    SecHelper,
    LoginService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

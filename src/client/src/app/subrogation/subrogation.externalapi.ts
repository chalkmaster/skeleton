import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExternalApi } from 'src/infrastructure/external-api';

@Injectable({
  providedIn: 'root'
})
export class SubrogationExternalApi extends ExternalApi {
  async get(): Promise<any> {
    return this.getWithRetry(`${environment.api_url}/subrogation/`);
  }
}

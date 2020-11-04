import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExternalApi } from 'src/infrastructure/external-api';

@Injectable({
  providedIn: 'root'
})
export class EqualizationExternalApi extends ExternalApi {
  async getSummary(): Promise<any> {
    return this.getWithRetry(`${environment.api_url}/equalization/`);
  }

  async getPayments(equalizationId: string, page: number): Promise<any> {
    return this.getWithRetry(`${environment.api_url}/equalization/${equalizationId}/payments${page ? '?page=' + page : ''}`);
  }
}

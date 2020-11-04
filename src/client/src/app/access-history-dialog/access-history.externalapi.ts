import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExternalApi } from 'src/infrastructure/external-api';

@Injectable({
  providedIn: 'root'
})
export class AccessHistoryExternalApi extends ExternalApi {
  async getAccessHistory(resource: string, page: number): Promise<any> {
    return await this.getWithRetry(`${environment.api_url}/accesshistory?resource=${resource}${page ? '&page=' + page : ''}`);
  }
}

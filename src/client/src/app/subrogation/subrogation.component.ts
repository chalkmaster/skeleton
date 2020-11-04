import { Component, OnInit } from '@angular/core';
import { SubrogationExternalApi } from './subrogation.externalapi';
import { SessionHelper } from 'src/helpers/session.helper';

@Component({
  selector: 'app-subrogation',
  templateUrl: './subrogation.component.html',
  styleUrls: ['./subrogation.component.scss']
})
export class SubrogationComponent implements OnInit {

  teste: { sessionId: string };
  constructor(private api: SubrogationExternalApi) { }

  async ngOnInit(): Promise<void> {
    this.teste = await this.api.get() as { sessionId: string };
  }

}

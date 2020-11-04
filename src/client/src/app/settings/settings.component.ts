import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  activeSession = 'company';
  allowedIP = [];
  allowedDns = [];
  blockedIP = [];
  users = [];

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.debug(this.allowedDns);
  }

}

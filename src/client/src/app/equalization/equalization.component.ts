import { Component, OnInit } from '@angular/core';
import { EqualizationSummary } from '../../domain/entity/equalization-summary';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AccessHistoryDialogComponent } from '../access-history-dialog/access-history-dialog.component';
import { EqualizationExternalApi } from './equalization.externalapi';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-equalization',
  templateUrl: './equalization.component.html',
  styleUrls: ['./equalization.component.scss']
})
export class EqualizationComponent implements OnInit {

  isLoading = true;
  equalizations: EqualizationSummary[];
  constructor(private dialog: MatDialog, private externalApi: EqualizationExternalApi) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.equalizations = await this.externalApi.getSummary();
    this.isLoading = false;
  }

  print() {
    window.print();
  }

  openHistory() {
    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      data: '/equalization',
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      width: '90%',
      height: '90%',
      hasBackdrop: false,
    };

    this.dialog.open(AccessHistoryDialogComponent, dialogConfig);
  }
}

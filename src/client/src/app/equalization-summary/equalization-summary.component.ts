import { Component, OnInit, Input } from '@angular/core';
import { EqualizationSummary } from '../../domain/entity/equalization-summary';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';

@Component({
  selector: 'app-equalization-summary',
  templateUrl: './equalization-summary.component.html',
  styleUrls: ['./equalization-summary.component.scss']
})
export class EqualizationSummaryComponent implements OnInit {

  @Input() summaryModel: EqualizationSummary;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDetails(medialink: string) {
    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      data: medialink,
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      width: '90%',
      height: '90%',
      hasBackdrop: false,
    };

    this.dialog.open(GridDialogComponent, dialogConfig);
  }
}

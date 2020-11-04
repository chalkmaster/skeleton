import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { R } from 'src/infrastructure/resources';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataFormatterHelper } from 'src/helpers/data-formatter.helper';
import { EqualizationExternalApi } from '../equalization/equalization.externalapi';
import { SessionHelper } from 'src/helpers/session.helper';
import { Payment } from 'src/domain/entity/payment';
import { PagedResponse } from 'src/domain/entity/paged-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AccessHistoryDialogComponent } from '../access-history-dialog/access-history-dialog.component';

@Component({
  selector: 'app-grid-dialog',
  templateUrl: './grid-dialog.component.html',
  styleUrls: ['./grid-dialog.component.scss']
})
export class GridDialogComponent implements OnInit {

  dataSource: MatTableDataSource<Payment>;
  response: PagedResponse<Payment>;
  columns: string[];
  columnsName = R.DATA.TRANSLATION;
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<GridDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataUri: string,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private equalizationExternalApi: EqualizationExternalApi) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.loadContent(0);
    this.columns = this.getColumns();
    this.dataSource.paginator = this.paginator;
  }

  async loadContent(page: number = 0) {
    this.isLoading = true;
    this.response = await this.equalizationExternalApi
        .getPayments('f9b31c23de2e2dbb69c18156', page + 1) as PagedResponse<Payment>;
    this.dataSource = new MatTableDataSource(this.response.data);
    this.isLoading = false;
  }

  getColumns(): string[] {
    return DataFormatterHelper.extractColumnNames(this.dataSource.data);
  }

  applyMask(dataName: string, dataValue: any): string {
    return DataFormatterHelper.format(dataName, dataValue);
  }

  getTotalEqualization() {
    return this.dataSource.data.map(t => t.equalization).reduce((acc, value) => acc + value, 0);
  }

  navigate(event: PageEvent) {
    this.isLoading = true;
    this.loadContent(event.pageIndex);
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

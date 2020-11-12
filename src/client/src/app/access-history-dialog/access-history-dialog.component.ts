import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { R } from 'src/infrastructure/resources';
import { MatTableDataSource } from '@angular/material/table';
import { DataFormatterHelper } from 'src/helpers/data-formatter.helper';
import { Payment } from 'src/domain/entity/payment';
import { PagedResponse } from 'src/domain/entity/paged-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AccessHistoryExternalApi } from './access-history.externalapi';

@Component({
  selector: 'app-access-history-dialog',
  templateUrl: './access-history-dialog.component.html',
  styleUrls: ['./access-history-dialog.component.scss']
})
export class AccessHistoryDialogComponent implements OnInit {

  dataSource: MatTableDataSource<Payment>;
  response: PagedResponse<Payment>;
  columns: string[];
  columnsName = R.DATA.TRANSLATION;
  isLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<AccessHistoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataUri: string,
              private externalApi: AccessHistoryExternalApi) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.loadContent(0);
    this.columns = this.getColumns();
    this.dataSource.paginator = this.paginator;
  }

  async loadContent(page: number = 0) {
    this.isLoading = true;
    this.response = await this.externalApi
      .getAccessHistory(this.dataUri, page + 1) as PagedResponse<Payment>;
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

  print() {
    const table = document.getElementById('access_history_table');
    const printWindow = window.open('', '_blank', 'top=0,left=0,height=700,width=1000');
    printWindow.document.write(`
    <html>
      <head>
        <title>Sample</title>
      </head>
      <style>
        @media print {
          .bs-no-print {
            display: none;
          }
        }
        table {
          border-collapse: collapse;
        }
        table, th, td {
          padding-top: 8px;
          padding-right: 8px;
          padding-bottom: 8px;
          padding-left: 8px;
          border: 1px solid black;
          font-family: sans-serif;
          font-size: 15px;
        }
      </style>
      <body>
        <table>
          ${table.innerHTML}
        </table>
      </body>
    </html>`);
    printWindow.print();
    printWindow.close();
  }
}

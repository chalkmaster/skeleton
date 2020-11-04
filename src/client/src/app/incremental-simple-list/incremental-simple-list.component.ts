import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { R } from 'src/infrastructure/resources';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incremental-simple-list',
  templateUrl: './incremental-simple-list.component.html',
  styleUrls: ['./incremental-simple-list.component.scss']
})
export class IncrementalSimpleListComponent implements OnInit {

  listItem = '';
  itensValue = [];
  animateShake = false;

  @Output() itensChange = new EventEmitter();
  @Input() placeholder = R.FIELDS.INCREMENTAL_SIMPLE_LIST.ADD_FILED;
  @Input() filedName: 'incremental_simple_list_add_field';
  @Input() regexValidation: string;

  @Input()
  get itens(): string[]{
    return this.itensValue;
  }

  set itens(value: string[]) {
    this.itensValue = value;
    this.itensChange.emit(this.itensValue);
  }

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
  }

  add(value: string) {
    if (!value) { return; }
    console.debug(value, this.regexValidation);
    if (this.regexValidation && !value.match(new RegExp(this.regexValidation))) {
      this.shake();
      this.snackbar.open('Valor Inválido', 'OK', {duration: environment.SNACK_ERROR_MESSAGE_DURATION});
      return;
    }
    this.itens.push(value);
    this.listItem = '';
  }

  remove(position: number) {
    this.itens.splice(position, 1);
  }

  shake() {
    setTimeout(() => {
      this.animateShake = true;
    });
    setTimeout(() => {
      this.animateShake = false;
    }, 500);
  }
}

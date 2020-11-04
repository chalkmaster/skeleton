import { R } from 'src/infrastructure/resources';
import { formatDate, formatCurrency, formatPercent, formatNumber } from '@angular/common';

export class DataFormatterHelper {
  static extractColumnNames(dataArray: {}[]) {
    return dataArray.map(element => Object.keys(element))
      .reduce((prev: string[], cur: string[]) => [...prev, ...cur], [])
      .reduce((prev: string[], cur: string) => prev.indexOf(cur) === -1 ? [...prev, cur] : prev, []);
  }

  static format(dataName: string, dataValue: any): string {
    if (dataValue === undefined) {
      return '';
    }

    const maskType = R.DATA.MASK[dataName.toUpperCase()];

    switch (maskType) {
      case R.DATA.MASK.TYPES.DATE:
        return formatDate(dataValue, 'dd/MM/yyyy', 'pt-BR');

      case R.DATA.MASK.TYPES.CURRENCY:
        return formatCurrency(dataValue, 'pt-BR', 'R$', 'BRL');

      case R.DATA.MASK.TYPES.CPF:
        return dataValue.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

      case R.DATA.MASK.TYPES.CNPJ:
        return dataValue.replace(/[^\d]/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

      case R.DATA.MASK.TYPES.PERCENT:
        return formatPercent(dataValue, 'pt-BR', '1.2-2');

      case R.DATA.MASK.TYPES.DATE_TIME:
        return formatDate(dataValue, 'dd/MM/yyyy HH:mm', 'pt-BR');

      case R.DATA.MASK.TYPES.DECIMAL:
        return formatNumber(dataValue, 'pt-BR', '1.2-2');

      case R.DATA.MASK.TYPES.MASK:
        return '*'.repeat((dataValue as string).length);

      case R.DATA.MASK.TYPES.PARTIAL_MASK:
        const stringValue = dataValue as string;
        const length = stringValue.length - 4;
        if (length <= 0) {
          return dataValue;
        }
        return '*'.repeat(length) + stringValue.slice(length);

      case R.DATA.MASK.TYPES.OBJECT:
        return JSON.stringify(dataValue);

      case R.DATA.MASK.TYPES.LOCATION:
        if (!dataValue) {
          return dataValue;
        }

        const latlong = dataValue.replace('"', '').split('@')[0].split(',');
        const lat = Math.round(latlong[0] * 10000000) / 10000000;
        const long = Math.round(latlong[1] * 10000000) / 10000000;

        return `<a href="https://www.google.com/maps/place/${lat},${long}" target="_blank" class="bs-no-print">ABRIR LINK</a>
                <span class="bs-print-info bs-print">lat:${lat}, long:${long}</span>`;

      case R.DATA.MASK.TYPES.TEXT:
      case R.DATA.MASK.TYPES.NUMBER:
      default:
        return dataValue;
    }
  }
}

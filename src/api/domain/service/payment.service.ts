import fs from 'fs';
import { Payment } from '../entity/payment';

export class PaymentService {
  
  get(equalizationId: string, start: number, max: number) {
    if (!equalizationId) return;

    const file = fs.readFileSync(__dirname + '/../../mock/refluxo.csv', 'utf8');
    const lines =  file.split('\n');
    const data = [];

    for (let l = 1 + start; l < Math.min(start + max, lines.length); l++) {
      const cells = lines[l].split(';');
      data.push(new Payment(
        cells[0],
        cells[1],
        cells[2] && cells[2] !== 'NULL' ? new Date(cells[2]) : undefined,
        cells[3] && cells[3] !== 'NULL' ? new Date(cells[3]) : undefined,
        cells[4],
        cells[5],
        cells[6],
        cells[7],
        parseInt(cells[8] || '0'),
        parseInt(cells[9] || '0'),
        parseInt(cells[10] || '0'),
        parseInt(cells[11] || '0'),
        cells[12] && cells[12] !== 'NULL' ? new Date(cells[12]) : undefined,
        cells[13] && cells[13] !== 'NULL' ? new Date(cells[13]) : undefined,
        cells[14],
        cells[16],
        parseInt(cells[17] || '0'),
        parseInt(cells[18] || '0'),
        parseInt(cells[19] || '0'),
        parseInt(cells[20] || '0'),
        parseInt(cells[21] || '0'),
        parseInt(cells[22] || '0'),
        parseInt(cells[23] || '0'),
        parseInt(cells[24] || '0')
      ));
    }

    return { data, count: lines.length };
  }
}
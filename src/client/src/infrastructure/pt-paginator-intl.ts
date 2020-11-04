import { MatPaginatorIntl } from '@angular/material/paginator';
import { R } from './resources';

const getPtRangeLabel = (page: number, pageSize: number, length: number) => {
  if (!length || !pageSize) { return `0 ${R.FIELDS.PT_PAGINATOR_INTL.FROM_LABEL} ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} ${R.FIELDS.PT_PAGINATOR_INTL.FROM_LABEL} ${length}`;
};

export function getPtPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.nextPageLabel = R.FIELDS.PT_PAGINATOR_INTL.NEXTPAGE_LABEL;
  paginatorIntl.previousPageLabel = R.FIELDS.PT_PAGINATOR_INTL.PREVIOUSPAGE_LABEL;
  paginatorIntl.itemsPerPageLabel = R.FIELDS.PT_PAGINATOR_INTL.ITEMSPERPAGE_LABEL;
  paginatorIntl.getRangeLabel = getPtRangeLabel;

  return paginatorIntl;
}

export interface EqualizationSummary {
  feeRevenue: number;
  creditRateRevenue: number;
  interestAndArrearsRevenue: number;
  operatingExpensesReimbursement: number;
  taxRefunds: number;
  netEqualization: number;

  feeRevenueDetailLink: string;
  creditRateRevenueDetailLink: string;
  interestAndArrearsRevenueDetailLink: string;
  operatingExpensesReimbursementDetailLink: string;
  taxRefundsDetailLink: string;

  productName: string;
  reference: string;
}

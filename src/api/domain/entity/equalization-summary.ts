
export class EqualizationSummary {
  constructor(public feeRevenue: number,
              public creditRateRevenue: number,
              public interestAndArrearsRevenue: number,
              public operatingExpensesReimbursement: number,
              public taxRefunds: number,
              public netEqualization: number,

              public feeRevenueDetailLink: string,
              public creditRateRevenueDetailLink: string,
              public interestAndArrearsRevenueDetailLink: string,
              public operatingExpensesReimbursementDetailLink: string,
              public taxRefundsDetailLink: string,

              public productName: string,
              public reference: string,
              public id: string
    ) { }
}
